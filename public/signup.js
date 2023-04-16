document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");

  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const mobile_number = document.getElementById("mobile_number").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      mobile_number: mobile_number,
      password: password,
    };

    // Get the required information
    const ip_address = await fetch("https://api.ipify.org?format=json").then((response) =>
      response.json().then((data) => data.ip)
    );
    const browser = navigator.userAgent;
    const device_type = /Mobi/.test(navigator.userAgent) ? "mobile" : "desktop";

    try {
      const response = await fetch("/database/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const userData = await response.json();
        const user_id = userData.user.user_id;

        const otpResponse = await fetch("/auth/send-code", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id,
            email,
            mobile_number,
            ip_address,
            browser,
            device_type,
          }),
        });

        if (otpResponse.ok) {
          const { tempToken } = await otpResponse.json();
          window.location.href = `./otp_verification.html?tempToken=${tempToken}`;
        } else {
          const otpErrorData = await otpResponse.json();
          alert(`Error: ${otpErrorData.message}`);
        }
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    return false;
  });
});
