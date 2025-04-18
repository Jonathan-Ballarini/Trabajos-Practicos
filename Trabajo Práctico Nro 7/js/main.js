document.addEventListener("DOMContentLoaded", function () {
    console.log("Contenido del DOM cargado");

    const textarea = document.getElementById("origen");
    textarea.value = `<p>Este contenido <strong>está listo</strong><br>para ser editado y pasarlo abajo.</p>`;

    textarea.addEventListener("click", function () {
        const inputs = document.getElementsByTagName("input");
        for (let input of inputs) {
        input.disabled = false;
        }

        const button = document.querySelector("button");
        if (button) {
        button.disabled = false;
        }
    });

    document.getElementById("btn-reemplazar").addEventListener("click", function () {
        destino.innerHTML = textarea.value;
    });

    document.querySelector(".btn-agregar:nth-of-type(2)").addEventListener("click", function () {
        destino.innerHTML += textarea.value;
    });

    document.querySelector(".btn-agregar:nth-of-type(3)").addEventListener("click", function () {
        let contenido = textarea.value;
        for (let i = 0; i < 5; i++) {
            destino.innerHTML += contenido;
        }
    });

    document.querySelector(".btn-agregar:nth-of-type(4)").addEventListener("click", function () {
        let contenido = textarea.value;
        for (let i = 0; i < 10; i++) {
            destino.innerHTML += contenido;
        }
    });

    document.querySelector(".btn-agregar:nth-of-type(5)").addEventListener("click", function () {
        let contenido = textarea.value;
        let eleccion_repeticion = prompt("¿Cuantas veces deseas repetir el contenido?");
        eleccion_repeticion = parseInt(eleccion_repeticion);
        for (let i = 0; i < eleccion_repeticion; i++) {
            destino.innerHTML += contenido;
        }
    });

    document.querySelector(".btn-vaciar").addEventListener("click", function () {
        destino.innerHTML = '';
    });

    document.querySelector(".btn-convertir-a-mayusculas").addEventListener("click", function () {
        destino.innerHTML = destino.innerHTML.toUpperCase();
    });

    document.querySelector("button").addEventListener("click", function () {
        destino.innerHTML = destino.innerHTML.toLowerCase();
    });

    const lista_ok = document.getElementsByTagName("li");
    for (let items of lista_ok) {
        items.innerHTML = "[Ok] " + items.innerHTML;
    }

    });
