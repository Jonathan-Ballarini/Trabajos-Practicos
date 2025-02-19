document
    .getElementById("Ejercicio_Nro_2")
    .addEventListener("click", function (event) {
        if (event.target === this) {
        var cantidadDeGatos = prompt(
            "Ingrese la cantidad de gatos que desea ver: "
        );
        var cantidadDePasos = prompt(
            "Ingrese la cantidad de pasos que desea ver: "
        );

        for (var n = 1; n <= cantidadDeGatos; n++) {
            console.log("Gato #" + n + ": 🐈" + " 🐾".repeat(cantidadDePasos));
        }
        }
    });
