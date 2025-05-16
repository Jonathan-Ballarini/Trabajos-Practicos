const apiUrl = 'http://localhost:5000/contactos';

function cargarContactos() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const contactos = JSON.parse(xhr.responseText);
            console.log(contactos);
            mostrarContactos(contactos);
        } else {
            console.error('Error al cargar contactos:', xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Error en la conexión');
    };

    xhr.send();
}


function mostrarContactos(contactos) {
    const listaContactos = document.getElementById('listaContactos');
    listaContactos.innerHTML = '';

    contactos.forEach(contacto => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${contacto.nombre}</strong> ${contacto.email} - ${new Date(contacto.fechaNacimiento).toLocaleDateString()}
            <button onclick="eliminarContacto('${contacto._id}')">Eliminar</button>
            <button onclick="mostrarFormularioEdicion('${contacto._id}', '${contacto.nombre}', '${contacto.email}', '${contacto.fechaNacimiento}')">Editar</button>
        `;
        listaContactos.appendChild(li);
    });
}

function agregarContacto(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;

    if (!nombre || !email || !fechaNacimiento) {
        alert('Por favor completá todos los campos.');
        return;
    }

    const nuevoContacto = { nombre, email, fechaNacimiento };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrl, true);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 201) {
            alert('Contacto agregado con éxito');
            document.getElementById('formularioContactos').reset();
            cargarContactos();
        } else {
            console.error('Error al agregar contacto:', xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Error en la conexión');
    };

    xhr.send(JSON.stringify(nuevoContacto));
}

function eliminarContacto(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${apiUrl}/${id}`, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            alert('Contacto eliminado con éxito');
            cargarContactos();
        } else {
            console.error('Error al eliminar contacto:', xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Error en la conexión');
    };

    xhr.send();
}

function mostrarFormularioEdicion(id, nombre, email, fechaNacimiento) {
    document.getElementById('nombre').value = nombre;
    document.getElementById('email').value = email;
    document.getElementById('fechaNacimiento').value = new Date(fechaNacimiento).toISOString().split('T')[0];
    document.getElementById('formularioContactos').setAttribute('data-id', id);
}

function editarContacto(e) {
    e.preventDefault();

    const id = document.getElementById('formularioContactos').getAttribute('data-id');
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;

    if (!nombre || !email || !fechaNacimiento) {
        alert('Por favor completá todos los campos.');
        return;
    }

    const contactoActualizado = { nombre, email, fechaNacimiento };

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `${apiUrl}/${id}`, true);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            alert('Contacto actualizado con éxito');
            document.getElementById('formularioContactos').reset();
            document.getElementById('formularioContactos').removeAttribute('data-id');
            cargarContactos();
        } else {
            console.error('Error al actualizar contacto:', xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Error en la conexión');
    };

    xhr.send(JSON.stringify(contactoActualizado));
}

document.addEventListener('DOMContentLoaded', () => {
    cargarContactos();
    document.getElementById('formularioContactos').addEventListener('submit', (e) => {
        const id = document.getElementById('formularioContactos').getAttribute('data-id');
        if (id) {
            editarContacto(e);
        } else {
            agregarContacto(e);
        }
    });
});
