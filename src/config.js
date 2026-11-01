/**
 * Application Configuration & Data Store
 * Miranda-Inspired Paper Portfolio for Shreeram S Hegde
 */
export const CONFIG = {
  API_BASE_URL: "https://uvj76g7enc.execute-api.ap-southeast-2.amazonaws.com",
  
  AUTHOR: {
    name: "Shreeram S Hegde",
    displayName: "SHREERAM S HEGDE",
    tagline: "Arch Guy with knowledge of Fullstack & Spring Boot",
    headlineTagline: "Arch Guy & Full-Stack Artisan",
    rolePills: [
      "Cloud & Systems Architect",
      "Full-Stack Engineer",
      "Spring Boot Craftsman",
      "Serverless Artisan"
    ],
    dob: "14/10/2006",
    location: "Mysuru, Karnataka, India",
    locationShort: "Mysuru, IN",
    email: "shreeramshegde05@gmail.com",
    githubUrl: "https://github.com/shreeramshegde",
    githubUsername: "shreeramshegde",
    linkedinUrl: "https://linkedin.com/in/shreeram-suchetan-hegde",
    resumeUrl: "https://drive.google.com/file/d/1ekkVvXkhttdrLmnjJJT1ZzO_VJ9Sn_tk/view?usp=sharing",
    
    // Heartbroken / Romantic Tech Philosophy Quote
    philosophyQuote: "We spent sleepless nights engineering fault-tolerant distributed systems with 99.999% uptime, yet failed to handle the unhandled exception of growing apart. Like an open socket waiting for an ACK that never came, I still listen on the port where you once whispered.",
    philosophyAuthor: "Shreeram S Hegde — Invariant Log",

    bio: "As a systems-first engineer based in Mysuru, I bridge the divide between resilient low-latency backend architectures and high-fidelity interactive digital experiences. Whether engineering event-driven serverless cloud primitives on AWS, structuring distributed Spring Boot microservices, or sculpting tactile web interfaces, every system is crafted with obsessive artisan precision."
  },

  METRICS: [
    { label: "Cloud Deployments", value: "50+", note: "Zero-Downtime Releases" },
    { label: "API Gateway Latency", value: "< 35ms", note: "p95 Warm Invocations" },
    { label: "System Availability", value: "99.99%", note: "Multi-AZ Resilience" },
    { label: "Git Commits & Builds", value: "450+", note: "Continuous Delivery" },
  ],

  PROJECTS: [
    {
      id: "01",
      number: "No. 01",
      title: "NISB Make My CV",
      category: "Full-Stack & ATS Intelligence",
      tagline: "Official Resume & Document Intelligence Platform for IEEE",
      description: "A tailored CV generation suite engineered for the NIE IEEE Student Branch (NISB). Features real-time dynamic PDF compilation, custom ATS compliance scoring algorithms, modular section styling, and instantaneous client-side rendering.",
      tags: ["React 19", "Node.js", "Express", "Tailwind CSS", "PDF Engine", "ATS Parser"],
      githubUrl: "https://github.com/shreeramshegde",
      featured: true,
      year: "2026",
      status: "PRODUCTION RELEASE"
    },
    {
      id: "02",
      number: "No. 02",
      title: "Project Ithaca",
      category: "Event Platform & High Concurrency",
      tagline: "The Tech Odyssey — Flagship Event Platform for NISB IEEE",
      description: "The official technical symposium and investigation competition platform. Handles real-time participant authentication, concurrent challenge dispatches, team management, and live dynamic leaderboards with sub-50ms sync latencies.",
      tags: ["React", "Node.js", "Express", "MongoDB", "WebSockets", "High Concurrency"],
      githubUrl: "https://github.com/shreeramshegde/Project_Ithaca",
      featured: true,
      year: "2026",
      status: "AWARD WINNER"
    },
    {
      id: "03",
      number: "No. 03",
      title: "Customer Review Intelligence",
      category: "AI & NLP Pipeline",
      tagline: "Multilingual Sentiment, Sarcasm & Fake Review Engine",
      description: "Full-stack analytics intelligence engine analyzing noisy multilingual reviews. Implements Gemini LLM pipelines for sarcasm detection, fake-review classification, and feature-level sentiment extraction backed by multi-entity MongoDB trust scoring.",
      tags: ["Python", "Gemini LLM", "MongoDB", "FastAPI", "React", "Sentiment Analysis"],
      githubUrl: "https://github.com/shreeramshegde/ReviewAnalysis",
      featured: true,
      year: "2026",
      status: "AI PIPELINE"
    },
    {
      id: "04",
      number: "No. 04",
      title: "CHRONOS: The 33rd Cycle",
      category: "Enterprise Systems & Spring Boot",
      tagline: "Distributed Technical Investigation Competition Portal",
      description: "Enterprise portal powering 'The 33rd Cycle' technical competition at Sir M V Hall. Engineered with a distributed monorepo architecture, Java 21, Spring Boot microservices, event streaming, and automated evaluation pipelines.",
      tags: ["Java 21", "Spring Boot", "REST APIs", "Microservices", "PostgreSQL", "Docker"],
      githubUrl: "https://github.com/shreeramshegde/The33rdCycle",
      featured: true,
      year: "2026",
      status: "ENTERPRISE PORTAL"
    },
    {
      id: "05",
      number: "No. 05",
      title: "Serverless AWS Cloud Platform",
      category: "Cloud Architecture & DevOps",
      tagline: "Zero-Downtime Event-Driven Serverless Infrastructure",
      description: "Enterprise cloud hosting architecture operating without standing virtual machines. Features Amazon S3 static web hosting, API Gateway HTTP API v2, AWS Lambda (Python 3.12), DynamoDB atomic counters (ADD #v :incr), SNS real-time email fan-out, and automated GitHub Actions CI/CD.",
      tags: ["AWS Lambda", "Amazon S3", "Amazon DynamoDB", "API Gateway v2", "Amazon SNS", "GitHub Actions"],
      githubUrl: "https://github.com/shreeramshegde/Cloud-Computing",
      featured: true,
      year: "2026",
      status: "CLOUD INFRASTRUCTURE"
    },
    {
      id: "06",
      number: "No. 06",
      title: "OSINT Reconnaissance Suite",
      category: "Security & Information Recon",
      tagline: "Automated Digital Footprint & Surface Recon Framework",
      description: "Specialized open-source intelligence suite designed for automated digital footprint reconnaissance. Performs DNS enumeration, domain footprinting, metadata extraction, and network topology visualization across public endpoints.",
      tags: ["Python", "Network Graphing", "OSINT", "Automation", "DNS Analysis", "Security Telemetry"],
      githubUrl: "https://github.com/shreeramshegde",
      featured: false,
      year: "2026",
      status: "SECURITY TOOL"
    }
  ],

  ARSENAL: [
    {
      category: "Cloud Architecture & Infrastructure",
      lead: "Resilient, zero-idle cloud primitives engineered for durability and velocity.",
      skills: [
        { name: "Amazon S3", level: "Static Hosting & Multi-AZ Durability" },
        { name: "AWS Lambda", level: "Python 3.12 Serverless Micro-VMs" },
        { name: "Amazon API Gateway", level: "HTTP API v2 & CORS Offloading" },
        { name: "Amazon DynamoDB", level: "NoSQL & Storage-Level Atomic Expressions" },
        { name: "Amazon SNS", level: "Decoupled Event Fan-Out & Email Messaging" },
        { name: "GitHub Actions", level: "Declarative Automated CI/CD Pipelines" },
        { name: "Docker & Linux", level: "Containerization & POSIX Environments" }
      ]
    },
    {
      category: "Backend & Systems Engineering",
      lead: "High-throughput APIs and enterprise distributed services.",
      skills: [
        { name: "Java & Spring Boot", level: "Enterprise Microservices & REST APIs" },
        { name: "Python 3.12", level: "boto3 SDK, Asynchronous I/O, NLP Scripts" },
        { name: "Node.js & Express", level: "Event-Driven Backends & Realtime Sockets" },
        { name: "PostgreSQL & MongoDB", level: "ACID Relational & Document Data Models" },
        { name: "Distributed Systems", level: "Fault Tolerance, Concurrency & Idempotency" }
      ]
    },
    {
      category: "Frontend Craft & Interactive UX",
      lead: "Artisanal tactile interfaces marrying retro editorial typography with reactive performance.",
      skills: [
        { name: "React 19", level: "Concurrent Mode, Virtual DOM Reconciliation" },
        { name: "TypeScript & ESNext", level: "Type-Safe Modular Architecture" },
        { name: "Vite 6.0", level: "Ultra-Fast ESM Bundling & Tree-Shaking" },
        { name: "Tailwind CSS & CSS Grid", level: "Custom Variable Themes & Fluid Grids" },
        { name: "Web Audio API", level: "Procedural Sound Synthesis & Micro-FX" }
      ]
    }
  ],

  EDITORIAL_TESTIMONIALS: [
    {
      quote: "Blending deep cloud architecture with full-stack craftsmanship, Shreeram has an unmatched instinct for systems-level reliability and tactile design that elevates digital engineering.",
      author: "NISB IEEE Technical Review Board",
      title: "Symposium Evaluation"
    },
    {
      quote: "Like a true digital artisan, his ability to start from bare cloud primitives and construct fault-tolerant, atomic serverless systems is exemplary.",
      author: "Dept. of Information Science & Engineering",
      title: "NIE Mysuru"
    }
  ]
};
