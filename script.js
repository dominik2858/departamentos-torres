document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ usuario, password })
    });

    const data = await res.json();

    document.getElementById("mensaje").textContent = data.mensaje;

    if (data.success) {
      setCookie("token",data.token,10 );
      window.location.href = "home/index.html";
    }
});

function setCookie(nombre, valor, minutos) {
  const fecha = new Date();
  fecha.setTime(fecha.getTime() + (minutos * 60 * 1000));
  document.cookie = nombre + "=" + valor + ";expires=" + fecha.toUTCString() + ";path=/";
  document.cookie = "expires" + nombre + "=" + fecha.getTime() + ";expires=" + fecha.toUTCString() + ";path=/";
}
