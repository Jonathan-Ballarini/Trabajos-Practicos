document
    .getElementById("Ejercicio_Nro_3")
    .addEventListener("click", function (event) {
        if (event.target === this) {
        var cantidadDeGatos = prompt(
            "Ingrese la cantidad de gatos que desea ver: "
        );
        var cantidadDePasos = prompt(
            "Ingrese la cantidad de pasos que desea ver: "
        );

        for (var n = 1; n <= cantidadDeGatos; n++) {
            if (n % 2 == 1) {
            console.log("Gato #" + n + ": 🐈" + " 🐾".repeat(cantidadDePasos));
            } else {
            console.log("Gato #" + n + ": 🐈‍⬛" + " 🐾".repeat(cantidadDePasos));
            }
        }
        }
    });
