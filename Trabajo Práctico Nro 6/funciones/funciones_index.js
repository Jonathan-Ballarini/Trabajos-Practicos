
document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll("legend").forEach(function (legend) {
        legend.innerHTML = legend.textContent.replace(/\b(\w{4,})/g, function(match) {
            return "<span class='letra_grande'>" + match.charAt(0) + "</span>" + match.slice(1);
        });
    });

    const linkEstilos = document.getElementById("link_estilos");
    const cambiarEstilos = document.querySelector(".cambio_estilos button");
    const estiloAleatorio = document.querySelector(".aleatorio button");
    const recordarEstilo = document.querySelector(".recordar button");
    const estilosSelector = document.getElementById("estilos_selector");
    const radioEstilos = document.querySelectorAll('input[name="radio_estilos"]');

    const listaEstilos = [
        "estilos/estilos-base.css",
        "estilos/estilos-retro.css",
        "estilos/estilos-futuro.css",
    ];

    const sinEstilos = "estilos/estilos-vacio.css";

    let currentIndex = 0;

    const estiloGuardado = localStorage.getItem("estiloActual");
    const recordarDiv = document.querySelector(".recordar");
    
    if (estiloGuardado) {
        linkEstilos.href = estiloGuardado;
        recordarDiv.classList.replace("recordar", "boton_apretado");
    } else {
        recordarDiv.classList.replace("boton_apretado", "recordar");
    }

    const actualizarBotonRecordar = () => {
        const estiloGuardado = localStorage.getItem("estiloActual");
        if (estiloGuardado) {
            recordarDiv.classList.replace("recordar", "boton_apretado");
        } else {
            recordarDiv.classList.replace("boton_apretado", "recordar");
        }
    };
        

    const reseteoSelecciones = () => {
        estilosSelector.selectedIndex = 0;
        radioEstilos.forEach((radio) => (radio.checked = false));
    };

    cambiarEstilos.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % listaEstilos.length;
        linkEstilos.href = listaEstilos[currentIndex];
    });

    estiloAleatorio.addEventListener("click", function () {
        const randomIndex = Math.floor(Math.random() * (listaEstilos.length + 1));
        if (randomIndex === listaEstilos.length) {
            linkEstilos.removeAttribute("href");
        } else {
            linkEstilos.href = listaEstilos[randomIndex];
        }
    });

    if (recordarEstilo) {
        recordarEstilo.addEventListener("click", function () {
            const estiloActual = linkEstilos.getAttribute("href");
            if (localStorage.getItem("estiloActual")) {
                localStorage.removeItem("estiloActual");
                if (recordarDiv) {
                    recordarDiv.classList.remove("boton_apretado");
                    recordarDiv.classList.add("recordar");
                }
            } else {
                localStorage.setItem("estiloActual", estiloActual);
                if (recordarDiv) {
                    recordarDiv.classList.add("boton_apretado");
                    recordarDiv.classList.remove("recordar");
                }
            }
        });
    };

    estilosSelector.addEventListener("change", function () {
        let estiloSeleccionado;
        switch (estilosSelector.value) {
            case "sin_estilos":
                estiloSeleccionado = sinEstilos;
                linkEstilos.href = estiloSeleccionado;
                break;
            case "estilo_base":
                estiloSeleccionado = listaEstilos[0];
                linkEstilos.href = estiloSeleccionado;
                break;
            case "estilo_retro":
                estiloSeleccionado = listaEstilos[1];
                linkEstilos.href = estiloSeleccionado;
                break;
            case "estilo_futuro":
                estiloSeleccionado = listaEstilos[2];
                linkEstilos.href = estiloSeleccionado;
                break;
        }
        localStorage.setItem("estiloActual", estiloSeleccionado);
        reseteoSelecciones();
        actualizarBotonRecordar();
    });

    radioEstilos.forEach((radio) => {
        radio.addEventListener("change", function () {
            let estiloSeleccionado;
            switch (radio.value) {
                case "sin_estilo":
                    estiloSeleccionado = sinEstilos;
                    linkEstilos.href = estiloSeleccionado;
                    break;
                case "estilo_base":
                    estiloSeleccionado = listaEstilos[0];
                    linkEstilos.href = estiloSeleccionado;
                    break;
                case "estilo_retro":
                    estiloSeleccionado = listaEstilos[1];
                    linkEstilos.href = estiloSeleccionado;
                    break;
                case "estilo_futuro":
                    estiloSeleccionado = listaEstilos[2];
                    linkEstilos.href = estiloSeleccionado;
                    break;
            }
            localStorage.setItem("estiloActual", estiloSeleccionado);
            reseteoSelecciones();
            actualizarBotonRecordar();
        });
    });
});

