let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionesGastos = [];
let posicionGastoActual = -1; // Para almacenar la posición del gasto a modificar

function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let descripcionGasto = document.getElementById('descripcionGasto').value;

    // Validar si el gasto es mayor a 150
    if (valorGasto > 150) {
        alert("El gasto registrado es mayor a $150");
    }

    // Agregar solo si no estamos modificando un gasto
    if (posicionGastoActual === -1) {
        listaNombresGastos.push(nombreGasto);
        listaValoresGastos.push(valorGasto);
        listaDescripcionesGastos.push(descripcionGasto);
    } else {
        // Modificar el gasto existente
        listaNombresGastos[posicionGastoActual] = nombreGasto;
        listaValoresGastos[posicionGastoActual] = valorGasto;
        listaDescripcionesGastos[posicionGastoActual] = descripcionGasto;
        posicionGastoActual = -1; // Resetear la posición
    }

    actualizarGastos();
}

function actualizarGastos() {
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcionGasto = listaDescripcionesGastos[posicion]; // Obtener la descripción
        htmlLista += `<li>${elemento} - USD ${valorGasto.toFixed(2)} <br> Descripción: ${descripcionGasto}
        <button onclick="modificarGasto(${posicion});">Modificar</button>
        <button onclick="eliminarGasto(${posicion});">Eliminar</button> 
        </li>`;
        totalGastos += valorGasto; 
    });
    listaElementos.innerHTML = htmlLista; 
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';   
    document.getElementById('descripcionGasto').value = ''; // Limpiar descripción

    // Hacer que el textarea sea editable siempre
    document.getElementById('descripcionGasto').removeAttribute('readonly');

    // Restablecer el texto del botón
    document.getElementById('botonFormulario').innerText = 'Agregar Gasto';
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1);
    actualizarGastos();
}

function modificarGasto(posicion) {
    document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGastos[posicion];
    document.getElementById('descripcionGasto').value = listaDescripcionesGastos[posicion];

    // Hacer que el textarea sea editable
    document.getElementById('descripcionGasto').removeAttribute('readonly');

    // Guardar la posición del gasto a modificar
    posicionGastoActual = posicion;

    // Cambiar el texto del botón
    document.getElementById('botonFormulario').innerText = 'Guardar Cambios';
}
