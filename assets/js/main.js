// ======================
// MAIN.JS COMPLETO CON JQUERY
// ======================
$(document).ready(function () {
  const ruta = window.location.pathname;

  // ======================
  // PROTECCIÓN DE RUTAS
  // ======================
  if (
    ruta.includes("menu.html") ||
    ruta.includes("sendmoney.html") ||
    ruta.includes("deposit.html") ||
    ruta.includes("transactions.html")
  ) {
    if (localStorage.getItem("saldo") === null) {
      window.location.href = "./login.html";
    }
  }

  // ======================
  // LOGIN
  // ======================
  const $loginForm = $("#loginForm");
  if ($loginForm.length) {
    $loginForm.on("submit", function (e) {
      e.preventDefault();

      const email = $("#email").val().trim();
      const password = $("#password").val().trim();
      const $mensaje = $("#mensaje");

      if (!email || !password) {
        $mensaje.text("Por favor, completa todos los campos")
          .removeClass("text-success")
          .addClass("text-danger");
        return;
      }

      // Inicializar saldo si no existe
      if (localStorage.getItem("saldo") === null) {
        localStorage.setItem("saldo", 0);
      }

      $mensaje.text("Login exitoso")
        .removeClass("text-danger")
        .addClass("text-success");

      setTimeout(() => {
        window.location.href = "./menu.html";
      }, 1000);
    });
  }

  // ======================
  // SALDO - MENÚ
  // ======================
  const $saldoElemento = $("#saldo");
  if ($saldoElemento.length) {
    let saldo = localStorage.getItem("saldo") || 0;
    $saldoElemento.text(`$${saldo}`);
  }

  // ======================
  // DEPÓSITO
  // ======================
  const $depositForm = $("#depositForm");
  if ($depositForm.length) {
    $depositForm.on("submit", function (e) {
      e.preventDefault();

      const monto = parseInt($("#monto").val());
      const $mensaje = $("#mensajeDeposito");

      if (isNaN(monto) || monto <= 0) {
        $mensaje.text("Ingrese un monto válido").addClass("text-danger");
        return;
      }

      let saldo = parseInt(localStorage.getItem("saldo")) || 0;
      saldo += monto;
      localStorage.setItem("saldo", saldo);

      let transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
      transacciones.push(`Depósito: +$${monto}`);
      localStorage.setItem("transacciones", JSON.stringify(transacciones));

      $mensaje.text("Depósito realizado con éxito")
        .removeClass("text-danger")
        .addClass("text-success");

      $("#monto").val("");

      setTimeout(() => {
        window.location.href = "./menu.html";
      }, 1000);
    });
  }

  // ======================
  // CONTACTOS - Autocompletar
  // ======================
  const $contactosList = $("#contactosList");
  let contactos = JSON.parse(localStorage.getItem("contactos")) || ["Juan", "María", "Pedro", "Ana"];
  localStorage.setItem("contactos", JSON.stringify(contactos));

  function actualizarDatalist() {
    if (!$contactosList.length) return;
    $contactosList.empty();
    contactos.forEach(c => {
      $contactosList.append(`<option value="${c}">`);
    });
  }
  actualizarDatalist();

  // ======================
  // ENVIAR DINERO
  // ======================
  const $sendForm = $("#sendForm");
  if ($sendForm.length) {
    $sendForm.on("submit", function (e) {
      e.preventDefault();

      const contacto = $("#contacto").val().trim();
      const montoEnviar = parseInt($("#montoEnviar").val());
      const $mensaje = $("#mensajeEnvio");

      let saldo = parseInt(localStorage.getItem("saldo")) || 0;

      if (!contacto || isNaN(montoEnviar) || montoEnviar <= 0) {
        $mensaje.text("Completa los datos correctamente")
          .removeClass("text-success")
          .addClass("text-danger");
        return;
      }

      if (montoEnviar > saldo) {
        $mensaje.text("Saldo insuficiente")
          .removeClass("text-success")
          .addClass("text-danger");
        return;
      }

      saldo -= montoEnviar;
      localStorage.setItem("saldo", saldo);

      let transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
      transacciones.push(`Envío a ${contacto}: -$${montoEnviar}`);
      localStorage.setItem("transacciones", JSON.stringify(transacciones));

      if (!contactos.includes(contacto)) {
        contactos.push(contacto);
        localStorage.setItem("contactos", JSON.stringify(contactos));
        actualizarDatalist();
      }

      $mensaje.text(`Envío exitoso a ${contacto}`)
        .removeClass("text-danger")
        .addClass("text-success");

      $sendForm[0].reset();

      setTimeout(() => {
        window.location.href = "./menu.html";
      }, 1200);
    });
  }

  // ======================
  // HISTORIAL
  // ======================
  const $lista = $("#listaTransacciones");
  const $sinTransacciones = $("#sinTransacciones");
  if ($lista.length) {
    const transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
    if (transacciones.length === 0) {
      $sinTransacciones.removeClass("d-none");
    } else {
      transacciones.forEach(item => {
        $lista.append(`<li class="list-group-item">${item}</li>`);
      });
    }
  }

  // ======================
  // CERRAR SESIÓN
  // ======================
  const $logoutBtn = $("#logoutBtn");
  if ($logoutBtn.length) {
    $logoutBtn.on("click", function () {
      localStorage.clear();
     window.location.href = "./index.html";
    });
  }
});
