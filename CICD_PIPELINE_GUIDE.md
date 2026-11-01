# CI/CD Pipeline Automation Guide

**Project**: Serverless Portfolio Hosting on AWS  
**Author**: Shreeram S Hegde (USN: 4NI24IS187)  
**Tools**: AWS CodePipeline, AWS CodeBuild, AWS CodeCommit / GitHub, Amazon S3, Amazon CloudFront  

---

## 🎯 Purpose of CI/CD in this Serverless Architecture

In traditional workflows, developers manually log into the AWS Management Console to re-upload files to S3 whenever a CSS tweak or HTML update is made, and then manually submit a CloudFront invalidation.

This project implements a production-grade **Continuous Integration and Continuous Delivery (CI/CD)** pipeline:
```
[ Developer ] -- git push --> [ Repository ] --> [ AWS CodePipeline ]
                                                        |
                                                        v
                                                 [ AWS CodeBuild ]
                                                 - File Validation
                                                 - Sync to S3
                                                 - Invalidate CloudFront
                                                        |
                                                        v
                                              [ Live Production CDN ]
```

Every single `git push` automatically tests, deploys, and purges the edge cache in under 60 seconds without manual effort!

---

## 💡 Can We Use AWS CodeCommit and AWS CodePipeline?

**Yes! AWS CodePipeline and AWS CodeBuild are central components of this architecture.**

> [!NOTE]
> **Important AWS Industry Context regarding AWS CodeCommit**:  
> In July 2024, AWS announced that **AWS CodeCommit** is restricted for *new* AWS accounts (accounts that had not previously created CodeCommit repositories). AWS now officially encourages using **GitHub**, **GitLab**, or **Bitbucket** as the source provider connected to **AWS CodePipeline** via **AWS CodeStar Connections**.  
>  
> - **If your AWS account was created earlier or already has CodeCommit enabled**: You can use **Option A (Pure AWS with CodeCommit)**.  
> - **If you have a newer AWS account or prefer GitHub**: You can use **Option B (AWS CodePipeline + GitHub + AWS CodeBuild)**.  
>  
> Both options utilize **AWS CodePipeline** and **AWS CodeBuild** for the actual continuous integration, build orchestration, S3 deployment, and CloudFront cache invalidation.

---

## 📄 The Build Specification: `buildspec.yml`

AWS CodeBuild reads a configuration file named `buildspec.yml` at the root of your project repository. This file instructs CodeBuild on the environment, commands, and deployment steps.

Here is the exact `buildspec.yml` used in this project:

```yaml
version: 0.2

phases:
  install:
    runtime-versions:
      python: 3.12
    commands:
      - echo "Installing deployment dependencies..."
      - pip install --upgrade awscli

  pre_build:
    commands:
      - echo "===> Stage: Pre-Build Validation"
      - echo "Checking website structure..."
      - test -f website/index.html || { echo "website/index.html not found!"; exit 1; }
      - test -f website/style.css || { echo "website/style.css not found!"; exit 1; }
      - test -f website/app.js || { echo "website/app.js not found!"; exit 1; }
      - echo "All required assets verified successfully."

  build:
    commands:
      - echo "===> Stage: Build & Asset Synchronization"
      - echo "Target S3 Bucket: $S3_BUCKET_NAME"
      - echo "Uploading static assets to Amazon S3..."
      - aws s3 sync ./website s3://$S3_BUCKET_NAME --delete --cache-control "max-age=31536000,public" --exclude "index.html"
      - aws s3 cp ./website/index.html s3://$S3_BUCKET_NAME/index.html --cache-control "max-age=0,no-cache,no-store,must-revalidate"
      - echo "S3 asset synchronization complete."

  post_build:
    commands:
      - echo "===> Stage: Post-Build Cache Invalidation"
      - echo "CloudFront Distribution ID: $CLOUDFRONT_DIST_ID"
      - echo "Triggering CloudFront edge cache invalidation..."
      - INVALIDATION_ID=$(aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DIST_ID --paths "/*" --query 'Invalidation.Id' --output text)
      - echo "CloudFront invalidation submitted with ID: $INVALIDATION_ID"
      - echo "===> Deployment Completed Successfully!"
```

### Why the custom cache-control headers above matter:
- `index.html` has `no-cache,no-store` headers so browsers always check for the newest version.
- Static assets (`style.css`, `app.js`, images) have high `max-age` caching for fast edge performance, since CloudFront invalidation guarantees fresh delivery upon changes.

---

## Option A: Setting Up with AWS CodeCommit

*(Use this if your AWS account has CodeCommit enabled)*

### Step A.1: Create CodeCommit Repository
1. In the AWS Console, navigate to **CodeCommit** -> Click **Create repository**.
2. **Repository name**: `shreeram-serverless-portfolio`
3. **Description**: `Source repository for Serverless Portfolio Hosting on AWS`
4. Click **Create**.

### Step A.2: Configure Local Git & Push
1. In the AWS Console, navigate to **IAM** -> Users -> Select your IAM user -> **Security credentials** tab.
2. Scroll to **HTTPS Git credentials for AWS CodeCommit** -> Click **Generate credentials** -> Download the credentials.
3. In your local terminal inside `/home/shreeram/Projects/PortFolio`:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Serverless Portfolio with CI/CD"
   git branch -M main
   git remote add origin https://git-codecommit.ap-south-1.amazonaws.com/v1/repos/shreeram-serverless-portfolio
   git push -u origin main
   ```
*(Enter the downloaded HTTPS Git credentials when prompted).*

---

## Option B: Setting Up with GitHub + AWS CodePipeline

*(Recommended by AWS for modern workflows)*

### Step B.1: Push Local Code to GitHub
1. Create a new GitHub repository (e.g., `github.com/shreeram/portfolio-aws`).
2. In your local terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Serverless Portfolio with CI/CD"
   git branch -M main
   git remote add origin git@github.com:YOUR_GITHUB_USERNAME/portfolio-aws.git
   git push -u origin main
   ```

---

## Step 2: Create AWS CodeBuild Project

Whether using Option A or B, AWS CodeBuild executes the build and deployment.

1. Navigate to the **AWS CodeBuild** console.
2. Click **Create build project**.
3. **Project configuration**:
   - **Project name**: `Portfolio-Deploy-To-S3-CloudFront`
4. **Source**:
   - *If Option A*: Source provider: **AWS CodeCommit**, Repository: `shreeram-serverless-portfolio`, Reference type: `Branch: main`.
   - *If Option B*: Source provider: **GitHub**, connect via GitHub OAuth/Personal Access Token, select your repository and branch `main`.
5. **Environment**:
   - **Environment image**: **Managed image**
   - **Operating system**: **Amazon Linux**
   - **Runtime(s)**: **Standard**
   - **Image**: `aws/codebuild/amazonlinux2-x86_64-standard:5.0` (or latest standard image)
   - **Environment type**: **Linux**
   - **Service role**: **New service role** (e.g., `codebuild-portfolio-service-role`)
6. **Buildspec**:
   - Select **Use a buildspec file** (it will automatically look for `buildspec.yml` in the root).
7. **Environment variables** (Click *Additional configuration* to expand):
   - Add Variable 1:
     - Name: `S3_BUCKET_NAME`
     - Value: `shreeram-portfolio-storage-2026`
   - Add Variable 2:
     - Name: `CLOUDFRONT_DIST_ID`
     - Value: `<YOUR_CLOUDFRONT_DISTRIBUTION_ID>` (e.g., `E1234EXAMPLE`)
8. Click **Create build project**.

### Step 2.1: Grant CodeBuild IAM Permissions
By default, the new CodeBuild role cannot write to S3 or invalidate CloudFront. We must grant these permissions:
1. Navigate to the **IAM** console -> **Roles**.
2. Search for the role created by CodeBuild: `codebuild-portfolio-service-role`.
3. Click **Add permissions** -> **Create inline policy** -> Select **JSON** tab:
4. Paste the following policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "S3DeploymentPermissions",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::shreeram-portfolio-storage-2026",
                "arn:aws:s3:::shreeram-portfolio-storage-2026/*"
            ]
        },
        {
            "Sid": "CloudFrontInvalidationPermissions",
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation",
                "cloudfront:GetInvalidation"
            ],
            "Resource": "*"
        }
    ]
}
```
5. Name the policy `CodeBuild-S3-CloudFront-Deploy` and click **Create policy**.

---

## Step 3: Create AWS CodePipeline

AWS CodePipeline connects the repository source stage to the CodeBuild deployment stage.

1. Navigate to the **AWS CodePipeline** console.
2. Click **Create pipeline**.
3. **Pipeline settings**:
   - **Pipeline name**: `Portfolio-CI-CD-Pipeline`
   - **Service role**: **New service role**
   - Click **Next**.
4. **Source stage**:
   - **Source provider**: Select **AWS CodeCommit** (Option A) or **GitHub (Version 2)** (Option B).
   - Select repository: `shreeram-serverless-portfolio` (or your GitHub repo).
   - Branch: `main`.
   - **Output artifact format**: `CodePipeline default`.
   - Click **Next**.
5. **Build stage**:
   - **Build provider**: **AWS CodeBuild**.
   - **Region**: Same region.
   - **Project name**: Select `Portfolio-Deploy-To-S3-CloudFront`.
   - Click **Next**.
6. **Deploy stage**:
   - Click **Skip deploy stage** *(Note: Our CodeBuild step already performs the S3 sync and CloudFront invalidation directly via the AWS CLI in `buildspec.yml`)*.
7. Click **Create pipeline**.

---

## ⚡ Verifying the Automated CI/CD Workflow

To see your pipeline in action:
1. Make a small text change in `website/index.html` (e.g., updating a project description or subtitle).
2. Commit and push the change:
   ```bash
   git add website/index.html
   git commit -m "Updated hero subtitle"
   git push
   ```
3. Open the **AWS CodePipeline** console:
   - Observe the **Source** stage turn blue (In Progress) and then green (Succeeded).
   - Observe the **Build** stage trigger CodeBuild, sync files to S3, and trigger CloudFront invalidation.
4. Refresh your CloudFront portfolio URL: The change appears live across the global CDN in under 60 seconds!
