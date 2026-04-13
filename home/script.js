
let time = new date();

function setCookie(nombre, valor, minutos) {
  const fecha = new Date();
  fecha.setTime(fecha.getTime() + (minutos * 60 * 1000));
  document.cookie = nombre + "=" + valor + ";expires=" + fecha.toUTCString() + ";path=/";
  document.cookie = "expires" + nombre + "=" + fecha.getTime() + ";expires=" + fecha.toUTCString() + ";path=/";
}

function getCookie(nombre) {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const [key, value] = c.split("=");
    if (key === nombre) return value;
  }
  return null;
}

function getCookietime(nombre) {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const [key, value] = c.split("=");
    if (key === nombre) return value;
  }
  return null;
}

function renovarSesion() {//TODO: que comprueve que por lo menos lleva 7 minutos inactivo
  const token = getCookie("token");
  const tokentime = getCookie("expirestoken");
  if (token) {//if time < 7min  setcookie else mesaje de inactividad
    if (new date()-time<7*61*1000){//mesaje de inactividad
      sendMesageToUser();
    } 
    if(time+9*60*1000>tokentime){
      const res = await fetch("http://localhost:3000/renov", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ usuario, token })
      });

      const data = await res.json();
      if (res.success) {
      setCookie("token", token, 10); // reinicia tiempo
        
      }
    }
  }else{//else mensaje de desconeccion
  }
}

// renovar cada 1 minutos
function renovartiempo(){
  time = new date()
}
setInterval(renovarSesion, 1 * 60 * 1000);

document.addEventListener("click", renovartiempo);
document.addEventListener("keydown", renovartiempo);