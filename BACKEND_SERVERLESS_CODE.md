# Serverless Backend Source Code & Configuration

**Project**: Serverless Portfolio Hosting on AWS  
**Author**: Shreeram S Hegde (USN: 4NI24IS187)  
**Components**: AWS Lambda (Python 3.12), Amazon DynamoDB, Amazon SNS, Amazon API Gateway  

---

## 1. Visitor Counter Microservice

### Visitor Counter Lambda Code
- **Function Name**: `PortfolioVisitorCounter`
- **Runtime**: `Python 3.12`
- **Handler**: `lambda_function.lambda_handler`
- **Mechanism**: Performs an **atomic increment** on the DynamoDB `visitor_count` attribute using `ADD #v :incr`. This eliminates race conditions during concurrent visitor traffic.

```python
import json
import os
import boto3
from botocore.exceptions import ClientError
from decimal import Decimal

# Helper to serialize Decimal objects to int/float for JSON response
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return int(obj)
        return super(DecimalEncoder, self).default(obj)

dynamodb = boto3.resource('dynamodb')
TABLE_NAME = os.environ.get('TABLE_NAME', 'PortfolioVisitorCount')
table = dynamodb.Table(TABLE_NAME)

def lambda_handler(event, context):
    """
    Increments the portfolio visitor counter atomically and returns the updated count.
    Supports HTTP API Gateway v2 payloads with CORS headers.
    """
    cors_headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }

    # Handle pre-flight OPTIONS request if routed
    if event.get("requestContext", {}).get("http", {}).get("method") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": ""
        }

    try:
        # Atomic increment in DynamoDB
        response = table.update_item(
            Key={'id': 'visits'},
            UpdateExpression="SET visitor_count = if_not_exists(visitor_count, :zero) + :incr",
            ExpressionAttributeValues={
                ':incr': 1,
                ':zero': 0
            },
            ReturnValues="UPDATED_NEW"
        )
        
        current_count = response.get('Attributes', {}).get('visitor_count', 1)

        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({
                "success": True,
                "count": current_count,
                "message": "Visitor counter incremented successfully"
            }, cls=DecimalEncoder)
        }

    except ClientError as e:
        print(f"DynamoDB ClientError: {e.response['Error']['Message']}")
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({
                "success": False,
                "error": "Failed to update visitor counter"
            })
        }
    except Exception as e:
        print(f"Unexpected Exception: {str(e)}")
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({
                "success": False,
                "error": "Internal Server Error"
            })
        }
```

### IAM Policy for Visitor Counter Lambda (`Lambda-VisitorCounter-Policy`)
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DynamoDBVisitorCounterAccess",
            "Effect": "Allow",
            "Action": [
                "dynamodb:UpdateItem",
                "dynamodb:GetItem"
            ],
            "Resource": "arn:aws:dynamodb:*:*:table/PortfolioVisitorCount"
        },
        {
            "Sid": "CloudWatchLogging",
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        }
    ]
}
```

---

## 2. Contact Form Microservice

### Contact Form Lambda Code
- **Function Name**: `PortfolioContactHandler`
- **Runtime**: `Python 3.12`
- **Handler**: `lambda_function.lambda_handler`
- **Mechanism**: Parses incoming JSON payload (`name`, `email`, `subject`, `message`), generates a UUIDv4 message key, records the submission in DynamoDB, and dispatches a notification to Amazon SNS.

```python
import json
import os
import uuid
from datetime import datetime, timezone
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
sns = boto3.client('sns')

TABLE_NAME = os.environ.get('TABLE_NAME', 'PortfolioContactMessages')
SNS_TOPIC_ARN = os.environ.get('SNS_TOPIC_ARN', '')

table = dynamodb.Table(TABLE_NAME)

def lambda_handler(event, context):
    cors_headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }

    # Handle OPTIONS pre-flight
    if event.get("requestContext", {}).get("http", {}).get("method") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": ""
        }

    try:
        # Extract body
        raw_body = event.get('body', '{}')
        if event.get('isBase64Encoded', False):
            import base64
            raw_body = base64.b64decode(raw_body).decode('utf-8')
            
        data = json.loads(raw_body) if isinstance(raw_body, str) else raw_body

        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        subject = data.get('subject', 'Portfolio Contact Inquiry').strip()
        message = data.get('message', '').strip()

        # Input Validation
        if not name or not email or not message:
            return {
                "statusCode": 400,
                "headers": cors_headers,
                "body": json.dumps({"success": False, "error": "Missing required fields: name, email, or message."})
            }

        # Timestamp and Message ID
        message_id = str(uuid.uuid4())
        timestamp = datetime.now(timezone.utc).isoformat()

        # Store in DynamoDB
        table.put_item(
            Item={
                'message_id': message_id,
                'timestamp': timestamp,
                'name': name,
                'email': email,
                'subject': subject,
                'message': message,
                'source_ip': event.get('requestContext', {}).get('http', {}).get('sourceIp', 'unknown')
            }
        )

        # Publish alert to Amazon SNS
        if SNS_TOPIC_ARN:
            notification_body = (
                f"You received a new inquiry from your Serverless Portfolio!\n\n"
                f"From: {name} ({email})\n"
                f"Subject: {subject}\n"
                f"Timestamp: {timestamp}\n\n"
                f"Message Content:\n{message}\n\n"
                f"Message ID: {message_id}"
            )
            sns.publish(
                TopicArn=SNS_TOPIC_ARN,
                Subject=f"Portfolio Inquiry: {name}",
                Message=notification_body
            )

        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({
                "success": True,
                "message": "Thank you! Your message has been sent successfully.",
                "message_id": message_id
            })
        }

    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"success": False, "error": "Invalid JSON payload."})
        }
    except ClientError as e:
        print(f"AWS ClientError: {e.response['Error']['Message']}")
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"success": False, "error": "Failed to process message."})
        }
    except Exception as e:
        print(f"Unexpected Exception: {str(e)}")
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"success": False, "error": "Internal server error."})
        }
```

### IAM Policy for Contact Form Lambda (`Lambda-ContactForm-Policy`)
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DynamoDBWriteAccess",
            "Effect": "Allow",
            "Action": [
                "dynamodb:PutItem"
            ],
            "Resource": "arn:aws:dynamodb:*:*:table/PortfolioContactMessages"
        },
        {
            "Sid": "SNSPublishAccess",
            "Effect": "Allow",
            "Action": [
                "sns:Publish"
            ],
            "Resource": "arn:aws:sns:*:*:PortfolioContactAlerts"
        },
        {
            "Sid": "CloudWatchLogging",
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        }
    ]
}
```

---

## 3. Sample Payloads for AWS Lambda Console Testing

### Test Event for `PortfolioVisitorCounter`
In the Lambda console, click **Test** -> Create new event:
```json
{
  "version": "2.0",
  "routeKey": "GET /visitor-count",
  "rawPath": "/visitor-count",
  "requestContext": {
    "http": {
      "method": "GET",
      "path": "/visitor-count",
      "protocol": "HTTP/1.1",
      "sourceIp": "127.0.0.1"
    }
  }
}
```

### Test Event for `PortfolioContactHandler`
```json
{
  "version": "2.0",
  "routeKey": "POST /contact",
  "rawPath": "/contact",
  "requestContext": {
    "http": {
      "method": "POST",
      "path": "/contact",
      "protocol": "HTTP/1.1",
      "sourceIp": "127.0.0.1"
    }
  },
  "body": "{\"name\":\"Test Recruiter\",\"email\":\"recruiter@example.com\",\"subject\":\"Interview Invitation\",\"message\":\"Hello Shreeram, we reviewed your serverless cloud portfolio and would like to connect!\"}"
}
```
