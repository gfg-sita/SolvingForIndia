document
  .getElementById("verifyCodeForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const urlParams = new URLSearchParams(window.location.search);
    const tempToken = urlParams.get("tempToken");
    const otpCode = document.getElementById("otp_code").value;

    try {
      const response = await fetch("/auth/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: otpCode, tempToken }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("jwtToken", data.token);
        alert("OTP verified successfully");
        // Redirect to the desired page, e.g., the dashboard or main app page
        window.location.href = "./a.html";
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });