document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");
  const errorDiv = document.getElementById("error");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorDiv.textContent = "";

    const nombre = form.nombre.value.trim();
    const edad = form.edad.value.trim();

    if (!nombre) {
      errorDiv.textContent = "El nombre no puede estar vacío.";
      return;
    }

    if (!edad || isNaN(edad) || Number(edad) < 1 || Number(edad) > 99) {
      errorDiv.textContent = "La edad debe ser un número entre 1 y 99.";
      return;
    }

    try {
      const response = await fetch("/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, edad }),
      });

      const data = await response.json();

      if (!response.ok) {
        errorDiv.textContent = data.error || "Error al enviar el formulario.";
        return;
      }

      alert("Usuario creado con éxito");
      window.location.href = `/info?nombre=${encodeURIComponent(
        nombre
      )}&edad=${encodeURIComponent(edad)}`;
    } catch (error) {
      errorDiv.textContent = "Error de conexión con el servidor.";
      console.error(error);
    }
  });
});
