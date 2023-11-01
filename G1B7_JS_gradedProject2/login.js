document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    errorMessage.textContent = "";

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    const validUsername = "userName";
    const validPassword = "passWord";

    if (username === validUsername && password === validPassword) {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "resume.html";
    } else {
      errorMessage.textContent = "Invalid username/password.";
    }
  });
});
