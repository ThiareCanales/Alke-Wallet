// LOGIN - VALIDACIÓN BÁSICA
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // evita recargar la página

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const mensaje = document.getElementById("mensaje");

      if (email === "" || password === "") {
        mensaje.textContent = "Por favor, completa todos los campos";
        mensaje.classList.add("text-danger");
        return;
      }

      // Simulación de login correcto
      mensaje.textContent = "Login exitoso";
      mensaje.classList.remove("text-danger");
      mensaje.classList.add("text-success");

      // Redirección al menú
      setTimeout(() => {
        window.location.href = "menu.html";
      }, 1000);
    });
  }
});
