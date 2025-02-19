document
    .getElementById("Ejercicio_Nro_1")
    .addEventListener("click", function (event) {
        if (event.target === this) {
        var cantidadDeGatos = prompt(
            "Ingrese la cantidad de gatos que desea ver: "
        );
        for (var n = 1; n <= cantidadDeGatos; n++) {
            if (n % 3 == 1) {
            console.log("Gato #" + n + ": 😺");
            } else if (n % 3 == 2) {
            console.log("Gato #" + n + ": 😸");
            } else {
            console.log("Gato #" + n + ": 😹");
            }
        }
        }
    });
