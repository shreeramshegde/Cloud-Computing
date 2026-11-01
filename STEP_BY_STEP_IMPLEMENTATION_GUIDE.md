# Step-by-Step Implementation Guide

**Project**: Serverless Portfolio Hosting on AWS  
**Author**: Shreeram S Hegde (USN: 4NI24IS187)  
**Target Platform**: Amazon Web Services (AWS)  

---

## 📋 Implementation Roadmap Overview

The deployment is executed in 8 logical phases:
1. **Phase 1**: Local React Portfolio Application Preparation & Build (`npm run build`).
2. **Phase 2**: Amazon S3 Private Bucket Provisioning & Configuration.
3. **Phase 3**: Amazon CloudFront CDN Distribution with Origin Access Control (OAC).
4. **Phase 4**: Amazon DynamoDB Tables Creation (Visitor Counter & Contact Messages).
5. **Phase 5**: Amazon SNS Topic Setup for Instant Email Alerts.
6. **Phase 6**: AWS Lambda Functions & IAM Roles Deployment.
7. **Phase 7**: Amazon API Gateway Setup & CORS Configuration.
8. **Phase 8**: CloudWatch Monitoring & AWS Free Tier Budget Alert.

---

## Phase 1: Local Portfolio Asset Preparation

Your portfolio frontend is a modern **React 19 + Vite** Single Page Application (SPA):
- `src/components/`: Modular React components (`Hero`, `ArchitectureExplorer`, `GitHubProjects`, `Skills`, `ContactForm`, `Navbar`, `Footer`).
- `src/config.js`: Central configuration holding your API Gateway URL, USN, and student info.
- `vite.config.js`: Generates the production bundle in `dist/`.

### Directory Structure
```
PortFolio/
├── src/
│   ├── components/
│   ├── config.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js
├── buildspec.yml
├── README.md
├── ARCHITECTURE_AND_SERVICES.md
├── STEP_BY_STEP_IMPLEMENTATION_GUIDE.md
├── CICD_PIPELINE_GUIDE.md
└── BACKEND_SERVERLESS_CODE.md
```

### Build Command
Compile your React application locally before manual upload (or let CodePipeline do it automatically):
```bash
npm run build
```
This outputs production-ready, minified static files into the `dist/` directory:
- `dist/index.html`
- `dist/assets/*.js`
- `dist/assets/*.css`

---

## Phase 2: Amazon S3 Private Bucket Setup

Amazon S3 acts as the secure origin for your static web files.

### Step 2.1: Create S3 Bucket
1. Open the [AWS Management Console](https://console.aws.amazon.com/) and navigate to **S3**.
2. Click **Create bucket**.
3. Fill in the parameters:
   - **Bucket name**: `shreeram-portfolio-storage-2026` *(Note: S3 bucket names must be globally unique across all AWS accounts).*
   - **AWS Region**: Select `ap-south-1` (Mumbai) or your preferred region.
   - **Object Ownership**: Leave as **ACLs disabled (recommended)**.
   - **Block Public Access settings for this bucket**:
     - ✅ **Check "Block *all* public access"** (Keep this enabled for enterprise security).
   - **Bucket Versioning**: Enable (recommended for rollback safety) or leave disabled.
   - **Default encryption**: **Server-side encryption with Amazon S3 managed keys (SSE-S3)**.
4. Click **Create bucket**.

> [!IMPORTANT]
> **Do NOT enable "Static website hosting" in S3 properties.**  
> Enabling standard S3 static website hosting requires disabling "Block Public Access", making your bucket vulnerable to direct public requests. Instead, we keep the bucket completely private and route all traffic securely through Amazon CloudFront via **Origin Access Control (OAC)**.

### Step 2.2: Initial Upload of Website Files
1. Run `npm run build` locally in your terminal to generate the `dist/` directory.
2. Open your newly created bucket `shreeram-portfolio-storage-2026`.
3. Click **Upload**.
4. Upload all files and folders from inside the `dist/` directory (`index.html`, and the `assets/` folder).
5. Click **Upload**.
*(Note: Once CI/CD is configured in Phase 8, AWS CodePipeline & CodeBuild will automatically build and sync this for you!)*

---

## Phase 3: Amazon CloudFront CDN Distribution with OAC

Amazon CloudFront acts as the global edge caching layer and handles HTTPS encryption.

### Step 3.1: Create CloudFront Distribution
1. Navigate to the **CloudFront** console.
2. Click **Create distribution**.
3. Configure **Origin settings**:
   - **Origin domain**: Click the field and select your S3 bucket:  
     `shreeram-portfolio-storage-2026.s3.ap-south-1.amazonaws.com`.
   - **Origin access**: Select **Origin access control settings (recommended)**.
   - Click **Create new OAC**:
     - Name: `shreeram-portfolio-oac`
     - Signing behavior: `Sign requests (recommended)`
     - Origin type: `S3`
     - Click **Create**.
4. Configure **Default cache behavior**:
   - **Viewer protocol policy**: Select **Redirect HTTP to HTTPS**.
   - **Allowed HTTP methods**: Select **GET, HEAD**.
   - **Cache key and origin requests**: Select **Cache policy: CachingOptimized**.
5. Configure **Web Application Firewall (WAF)**:
   - Choose *Do not enable security protections* (if staying strictly on the zero-cost free tier) OR *Enable security protections* (if WAF trial is available).
6. Configure **Settings**:
   - **Price class**: `Use all edge locations (best performance)` or `Use only North America and Europe` (for lower cost).
   - **Default root object**: Type `index.html` *(Crucial: This directs root domain requests to your main HTML file).*
7. Click **Create distribution**.

### Step 3.2: Update S3 Bucket Policy for CloudFront OAC
Once the distribution is created, CloudFront displays a banner stating: *"The S3 bucket policy needs to be updated"*.

1. Click **Copy policy** from the CloudFront banner.
2. Open your S3 bucket in a new tab -> Navigate to the **Permissions** tab.
3. Scroll to **Bucket policy** and click **Edit**.
4. Paste the generated JSON policy (similar to the template below):

```json
{
    "Version": "2012-10-17",
    "Statement": {
        "Sid": "AllowCloudFrontServicePrincipalReadOnly",
        "Effect": "Allow",
        "Principal": {
            "Service": "cloudfront.amazonaws.com"
        },
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::shreeram-portfolio-storage-2026/*",
        "Condition": {
            "StringEquals": {
                "AWS:SourceArn": "arn:aws:cloudfront::<YOUR_AWS_ACCOUNT_ID>:distribution/<YOUR_CLOUDFRONT_DISTRIBUTION_ID>"
            }
        }
    }
}
```
5. Click **Save changes**.

> [!NOTE]
> Test your distribution domain (e.g., `https://d111111abcdef8.cloudfront.net`). Within 2-3 minutes of deployment, your portfolio website will load securely over HTTPS with a valid Amazon SSL certificate!

---

## Phase 4: Amazon DynamoDB Setup

DynamoDB stores the real-time visitor counter data and contact form submissions.

### Step 4.1: Create Visitor Counter Table
1. Navigate to **DynamoDB** console -> Click **Create table**.
2. **Table name**: `PortfolioVisitorCount`
3. **Partition key**: `id` (Type: **String**)
4. **Table settings**: Select **Customize settings** -> Choose **On-demand** capacity mode (ensures zero idle cost).
5. Click **Create table**.
6. Once active, click **Explore items** -> Click **Create item**:
   - Attribute `id` (String): `visits`
   - Click **Add new attribute** -> Number -> Name: `visitor_count`, Value: `0`
7. Click **Create item**.

### Step 4.2: Create Contact Form Messages Table
1. In DynamoDB, click **Create table**.
2. **Table name**: `PortfolioContactMessages`
3. **Partition key**: `message_id` (Type: **String**)
4. **Sort key**: `timestamp` (Type: **String**)
5. **Table settings**: Select **On-demand** mode.
6. Click **Create table**.

---

## Phase 5: Amazon SNS Topic for Email Alerts

Amazon SNS sends an instantaneous email whenever a visitor submits the contact form.

1. Navigate to **Amazon SNS** console -> Click **Topics** -> **Create topic**.
2. **Type**: Select **Standard**.
3. **Name**: `PortfolioContactAlerts`
4. Click **Create topic**.
5. Inside the created topic, click **Create subscription**:
   - **Protocol**: Select **Email**.
   - **Endpoint**: Enter your personal email (e.g., `shreeram@example.com` or your institutional email).
6. Click **Create subscription**.
7. **Check your email inbox**: Open the confirmation email from AWS Notifications and click **Confirm subscription**.
8. Note down the **Topic ARN** (e.g., `arn:aws:sns:ap-south-1:123456789012:PortfolioContactAlerts`).

---

## Phase 6: AWS Lambda Functions & IAM Roles

We deploy two serverless microservices:
1. `PortfolioVisitorCounter`: Increments and retrieves the live visitor count.
2. `PortfolioContactHandler`: Saves messages in DynamoDB and triggers an SNS email.

### Step 6.1: Deploy Visitor Counter Function
1. Navigate to **AWS Lambda** console -> Click **Create function**.
2. Select **Author from scratch**:
   - **Function name**: `PortfolioVisitorCounter`
   - **Runtime**: **Python 3.12**
   - **Architecture**: `x86_64`
3. Click **Create function**.
4. In the **Code source** tab, paste the code from [BACKEND_SERVERLESS_CODE.md](file:///home/shreeram/Projects/PortFolio/BACKEND_SERVERLESS_CODE.md#visitor-counter-lambda-code).
5. Click **Deploy**.
6. **Configure IAM Permissions**:
   - Go to **Configuration** tab -> **Permissions** -> Click on the **Role name**.
   - In the IAM console, click **Add permissions** -> **Attach policies** (or **Create inline policy**).
   - Add permission for `dynamodb:UpdateItem` and `dynamodb:GetItem` on `PortfolioVisitorCount`.

### Step 6.2: Deploy Contact Form Function
1. In Lambda, click **Create function**.
   - **Function name**: `PortfolioContactHandler`
   - **Runtime**: **Python 3.12**
2. Click **Create function**.
3. Paste the code from [BACKEND_SERVERLESS_CODE.md](file:///home/shreeram/Projects/PortFolio/BACKEND_SERVERLESS_CODE.md#contact-form-lambda-code).
4. In the code, set `SNS_TOPIC_ARN` to your topic ARN from Phase 5.
5. Click **Deploy**.
6. **Configure IAM Permissions**:
   - Go to **Configuration** -> **Permissions** -> Role name.
   - Attach policies allowing:
     - `dynamodb:PutItem` on `PortfolioContactMessages`.
     - `sns:Publish` on your `PortfolioContactAlerts` topic.

---

## Phase 7: Amazon API Gateway & CORS Configuration

Amazon API Gateway provides the HTTPS REST endpoints that your frontend JavaScript calls.

### Step 7.1: Create HTTP API
1. Navigate to **API Gateway** console.
2. Under **HTTP API**, click **Build**.
3. **API name**: `PortfolioApi`
4. Click **Next** -> Click **Next** -> Click **Create**.

### Step 7.2: Configure CORS (Cross-Origin Resource Sharing)
1. On the left sidebar of your API, click **CORS** -> Click **Configure**.
2. **Access-Control-Allow-Origin**: Enter `*` (or your CloudFront distribution domain `https://d111111abcdef8.cloudfront.net`).
3. **Access-Control-Allow-Headers**: Enter `Content-Type,Authorization`.
4. **Access-Control-Allow-Methods**: Select `GET`, `POST`, `OPTIONS`.
5. Click **Save**.

### Step 7.3: Create Routes & Integrations
1. On the left sidebar, click **Routes** -> Click **Create**:
   - Method: `GET`, Path: `/visitor-count`
   - Click **Create**.
2. Click on `GET /visitor-count` -> Click **Attach integration**:
   - Integration type: **Lambda function**
   - Lambda function: Select `PortfolioVisitorCounter`
   - Click **Create**.
3. Create the second route:
   - Click **Create**: Method: `POST`, Path: `/contact`
   - Click **Create**.
4. Attach integration to `POST /contact`:
   - Integration type: **Lambda function**
   - Lambda function: Select `PortfolioContactHandler`
   - Click **Create**.

### Step 7.4: Note Your Invoke URL
Go to **API Details** -> Copy your **Invoke URL** (e.g., `https://abc123xyz.execute-api.ap-south-1.amazonaws.com`).

---

## Phase 8: Connect Frontend & Test End-to-End

1. Open `src/config.js` on your local system.
2. Update the `CONFIG.API_BASE_URL` constant with your actual API Gateway Invoke URL:
   ```javascript
   export const CONFIG = {
     API_BASE_URL: "https://abc123xyz.execute-api.ap-south-1.amazonaws.com",
     // ...
   };
   ```
3. Commit and push the change to your Git repository (CodeCommit / GitHub).
4. CodePipeline will automatically trigger CodeBuild to compile (`npm run build`), sync `dist/` to S3, and invalidate CloudFront!
5. **Live Verification**:
   - Open your CloudFront URL in an Incognito window.
   - Observe the Visitor Counter badge incrementing dynamically!
   - Fill out the Contact Form and submit. Check your DynamoDB table and your email inbox for the instant SNS notification.

---

## Phase 9: Amazon CloudWatch & Cost Budget Alerts

### Step 9.1: Set Zero-Spend AWS Budget Alert
1. In the top search bar, type **Billing and Cost Management** -> Click **Budgets**.
2. Click **Create budget** -> Select **Cost budget (Recommended)**.
3. Budget name: `Portfolio-Zero-Cost-Guardrail`.
4. Budgeted amount: `$1.00` per month.
5. Set alert threshold: Alert when actual or forecasted spend reaches `80%` ($0.80).
6. Enter your notification email -> Click **Create budget**.

### Step 9.2: Inspect CloudWatch Logs & Metrics
1. Navigate to **CloudWatch** console.
2. Go to **Log groups**:
   - Inspect `/aws/lambda/PortfolioVisitorCounter` and `/aws/lambda/PortfolioContactHandler` to view live execution logs and response timestamps.
3. Go to **Metrics** -> **CloudFront** to observe global edge request counts and cache hit ratios.
