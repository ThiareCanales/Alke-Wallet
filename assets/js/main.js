document.addEventListener("DOMContentLoaded", function () {

  // ======================
  // PROTECCIÓN DE MENÚ
  // ======================
  if (window.location.pathname.includes("menu.html")) {
    const saldo = localStorage.getItem("saldo");
    if (saldo === null) {
      window.location.href = "login.html";
      return;
    }
  }

  // ======================
  // LOGIN
  // ======================
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const mensaje = document.getElementById("mensaje");

      if (email === "" || password === "") {
        mensaje.textContent = "Por favor, completa todos los campos";
        mensaje.classList.remove("text-success");
        mensaje.classList.add("text-danger");
        return;
      }

      mensaje.textContent = "Login exitoso";
      mensaje.classList.remove("text-danger");
      mensaje.classList.add("text-success");

      setTimeout(() => {
        window.location.href = "menu.html";
      }, 1000);
    });
  }

  // ======================
  // SALDO - MENÚ
  // ======================
  const saldoElemento = document.getElementById("saldo");

  if (saldoElemento) {
    let saldo = localStorage.getItem("saldo");

    if (saldo === null) {
      saldo = 0;
      localStorage.setItem("saldo", saldo);
    }

    saldoElemento.textContent = `$${saldo}`;
  }

  // ======================
  // DEPÓSITO
  // ======================
  const depositForm = document.getElementById("depositForm");

  if (depositForm) {
    depositForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const montoInput = document.getElementById("monto");
      const mensaje = document.getElementById("mensajeDeposito");
      let monto = parseInt(montoInput.value);

      if (isNaN(monto) || monto <= 0) {
        mensaje.textContent = "Ingrese un monto válido";
        mensaje.classList.remove("text-success");
        mensaje.classList.add("text-danger");
        return;
      }

      let saldo = parseInt(localStorage.getItem("saldo")) || 0;
      saldo += monto;
      localStorage.setItem("saldo", saldo);

      // Guardar transacción
      let transacciones =
        JSON.parse(localStorage.getItem("transacciones")) || [];
      transacciones.push(`Depósito: +$${monto}`);
      localStorage.setItem("transacciones", JSON.stringify(transacciones));

      mensaje.textContent = "Depósito realizado con éxito";
      mensaje.classList.remove("text-danger");
      mensaje.classList.add("text-success");

      montoInput.value = "";

      setTimeout(() => {
        window.location.href = "menu.html";
      }, 1000);
    });
  }

  // ======================
  // ENVIAR DINERO
  // ======================
  const sendForm = document.getElementById("sendForm");

  if (sendForm) {
    sendForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const contacto = document.getElementById("contacto").value.trim();
      const montoEnviar = parseInt(
        document.getElementById("montoEnviar").value
      );
      const mensaje = document.getElementById("mensajeEnvio");

      let saldo = parseInt(localStorage.getItem("saldo")) || 0;

      if (contacto === "" || isNaN(montoEnviar) || montoEnviar <= 0) {
        mensaje.textContent = "Completa los datos correctamente";
        mensaje.classList.remove("text-success");
        mensaje.classList.add("text-danger");
        return;
      }

      if (montoEnviar > saldo) {
        mensaje.textContent = "Saldo insuficiente";
        mensaje.classList.remove("text-success");
        mensaje.classList.add("text-danger");
        return;
      }

      // Restar saldo
      saldo -= montoEnviar;
      localStorage.setItem("saldo", saldo);

      // Guardar transacción
      let transacciones =
        JSON.parse(localStorage.getItem("transacciones")) || [];
      transacciones.push(`Envío a ${contacto}: -$${montoEnviar}`);
      localStorage.setItem("transacciones", JSON.stringify(transacciones));

      mensaje.textContent = `Envío exitoso a ${contacto}`;
      mensaje.classList.remove("text-danger");
      mensaje.classList.add("text-success");

      sendForm.reset();

      setTimeout(() => {
        window.location.href = "menu.html";
      }, 1200);
    });
  }

  // ======================
  // HISTORIAL
  // ======================
  const lista = document.getElementById("listaTransacciones");
  const sinTransacciones = document.getElementById("sinTransacciones");

  if (lista) {
    const transacciones =
      JSON.parse(localStorage.getItem("transacciones")) || [];

    if (transacciones.length === 0) {
      sinTransacciones.classList.remove("d-none");
    } else {
      transacciones.forEach((item) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = item;
        lista.appendChild(li);
      });
    }
  }

});
