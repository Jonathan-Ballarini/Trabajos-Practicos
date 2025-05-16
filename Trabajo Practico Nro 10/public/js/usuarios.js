    document.addEventListener("DOMContentLoaded", () => {
    const botonesBorrar = document.querySelectorAll(".btn-borrar");

    botonesBorrar.forEach((boton) => {
        boton.addEventListener("click", async () => {
        const id = boton.getAttribute("data-id");

        try {
            const respuesta = await fetch(`/usuarios/${id}`, {
            method: "DELETE",
            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {
            alert("Usuario eliminado");
            window.location.reload();
            } else {
            alert(resultado.error || "Error al borrar usuario");
            }
        } catch (error) {
            alert("Error en la conexión con el servidor");
            console.error(error);
        }
        });
    });
    });
