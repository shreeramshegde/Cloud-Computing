/**
 * Serverless Portfolio Frontend Client Logic
 * Author: Shreeram S Hegde (USN: 4NI24IS187)
 * 
 * Instructions:
 * Replace API_BASE_URL with your Amazon API Gateway HTTP API Invoke URL.
 * Example: "https://abc123xyz.execute-api.ap-south-1.amazonaws.com"
 */

const API_BASE_URL = "YOUR_API_GATEWAY_INVOKE_URL";

// DOM Elements
const visitorCountEl = document.getElementById("visitorCount");
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const btnSpinner = document.getElementById("btnSpinner");
const formFeedback = document.getElementById("formFeedback");

/**
 * 1. Fetch & Display Live Visitor Counter
 * Triggered on DOMContentLoaded
 */
async function fetchVisitorCount() {
  // If API URL is not yet configured, show mock/offline status
  if (!API_BASE_URL || API_BASE_URL === "YOUR_API_GATEWAY_INVOKE_URL") {
    console.info("AWS API Gateway Invoke URL not configured yet. Set API_BASE_URL in app.js.");
    if (visitorCountEl) {
      visitorCountEl.textContent = "1 (Local)";
    }
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/visitor-count`, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.count !== undefined) {
      // Animate counter increment
      animateCounter(visitorCountEl, parseInt(data.count, 10));
    } else {
      visitorCountEl.textContent = "1";
    }
  } catch (error) {
    console.error("Failed to fetch visitor count from AWS Lambda:", error);
    if (visitorCountEl) {
      visitorCountEl.textContent = "Active";
    }
  }
}

/**
 * Smooth number count-up animation
 */
function animateCounter(element, target) {
  let current = Math.max(0, target - 20);
  const stepTime = Math.abs(Math.floor(800 / (target - current || 1)));
  
  const timer = setInterval(() => {
    current += 1;
    element.textContent = current.toLocaleString();
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    }
  }, Math.max(stepTime, 20));
}

/**
 * 2. Handle Contact Form Submission to Serverless Backend
 */
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Reset feedback
    formFeedback.style.display = "none";
    formFeedback.className = "form-feedback";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      showFeedback("Please fill out all required fields.", "error");
      return;
    }

    // Toggle loading state
    setLoading(true);

    // If API URL is not set yet, simulate success for local preview
    if (!API_BASE_URL || API_BASE_URL === "YOUR_API_GATEWAY_INVOKE_URL") {
      setTimeout(() => {
        setLoading(false);
        showFeedback("Demo Mode: Configure API_BASE_URL to send messages directly to Amazon SNS & DynamoDB!", "success");
        contactForm.reset();
      }, 1000);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          message: message
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showFeedback("Thank you! Your message has been saved in DynamoDB and sent via Amazon SNS.", "success");
        contactForm.reset();
      } else {
        throw new Error(result.error || "Failed to process message.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      showFeedback(`Submission error: ${error.message}. Please try again later.`, "error");
    } finally {
      setLoading(false);
    }
  });
}

function setLoading(isLoading) {
  if (isLoading) {
    submitBtn.disabled = true;
    btnText.textContent = "Processing on AWS...";
    btnSpinner.style.display = "inline-block";
  } else {
    submitBtn.disabled = false;
    btnText.textContent = "Send Serverless Message";
    btnSpinner.style.display = "none";
  }
}

function showFeedback(text, type) {
  formFeedback.textContent = text;
  formFeedback.className = `form-feedback ${type}`;
  formFeedback.style.display = "block";
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchVisitorCount();
});
