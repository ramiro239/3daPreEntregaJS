// Hacer un menu de productos, que elija un producto, muestre su precio, y que el usuario decida en cuantas cuotas quiera pagarlo


//array con los productos del menu:
const productos = [
    {
        id: 1,
        nombre: "Zapatillas CONVERSE",
        precio: 20000,
        categoria: "Zapatillas"
    },
    {
        id: 2,
        nombre: "Zapatillas ADIDAS",
        precio: 25000,
        categoria: "Zapatillas"
    },
    {
        id: 3,
        nombre: "Zapatillas NIKE",
        precio: 30000,
        categoria: "Zapatillas"
    },
    {
        id: 4,
        nombre: "Pantalon deportivo NIKE",
        precio: 45000,
        categoria: "Pantalon"
    },
    {
        id: 5,
        nombre: "Pantalon Deportivo ADIDAS",
        precio: 40000,
        categoria: "Pantalon"
    },
    {
        id: 6,
        nombre: "Remera NIKE",
        precio: 35000,
        categoria: "Remera"
    },
    {
        id: 7,
        nombre: "Remera ADIDAS",
        precio: 32000,
        categoria: "Remera"
    }
]

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.querySelector("#contenedor-productos")


function crearUnBoton(nombre, texto, funcionQueEjecuta) {
    nombre = document.createElement("button");
    nombre.innerText = texto;
    const botonProducto = document.getElementById("opciones");
    botonProducto.appendChild(nombre);
    nombre.addEventListener("click", funcionQueEjecuta);
}

crearUnBoton("buttonVerProductos", "Ver todos los productos", verProductos);

crearUnBoton("buttonZapatillas", "Ver Zapatillas", () => verPorCategoria("Zapatillas"))

crearUnBoton("buttonPantalon", "Ver Pantalones", () => verPorCategoria("Pantalon"))

crearUnBoton("buttonRemera", "Ver Remeras", () => verPorCategoria("Remera"))


crearUnBoton("buttonVerCarrito", "Ver carrito", verCarrito);


function verPorCategoria(categoria) {
    limpiarHTLM();
    productos.forEach(p => {
        if (p.categoria === categoria) {
            mostrarProductosYAgregarAlCarrito(p);
        }
    })
}


//Para ver los productos
function verProductos() {
    limpiarHTLM();
    productos.forEach(p => {
        mostrarProductosYAgregarAlCarrito(p)
    })

}

function limpiarHTLM() {
    const limpiar = document.getElementById("contenedor-productos");
    limpiar.innerHTML = "";
}

function mostrarProductosYAgregarAlCarrito(p) {
    const div = document.createElement("div");

    div.innerHTML = `
    <h2>${p.nombre}</h2>
    <p>Precio: $${p.precio}</p>
    <div id="producto-${p.id}">
    </div>
    `

    contenedor.appendChild(div);

    const buttonAgregar = document.createElement("button");
    buttonAgregar.innerText = "Agregar";

    const contenedorBoton = document.querySelector("#producto-" + p.id);
    contenedorBoton.appendChild(buttonAgregar);

    buttonAgregar.addEventListener("click", () => {
        carrito.push(p);
        localStorage.setItem("carrito", JSON.stringify(carrito))
    })
}

function verCarrito() {
    let total = 0
    limpiarHTLM()
    carrito.forEach(p => {
        const div = document.createElement("div");

        div.innerHTML = `
        <h2>${p.nombre}</h2>
        <p>Precio: $${p.precio}</p>
        <div id="producto-${p.id}">
        </div>
        `
        contenedor.appendChild(div);

        total += p.precio;

    })

    const mostrarTotal = document.createElement("div");

    if (carrito.length === 0) {
        mostrarTotal.innerHTML = `
        <h2>No hay productos en el carrito</h2>
        `
        contenedor.appendChild(mostrarTotal);
    } else {
        mostrarTotal.innerHTML = `
        <h2>Total...........................$${total}</h2>
        `
        contenedor.appendChild(mostrarTotal);

        const mostarTotalEnCuotas = document.createElement("div");

        contenedor.appendChild(mostarTotalEnCuotas);

        botonSacarEnCuotas("button3Cuotas", "PAGAR EN 3 CUOTAS", total, mostarTotalEnCuotas, 3);

        botonSacarEnCuotas("button6Cuotas", "PAGAR EN 6 CUOTAS", total, mostarTotalEnCuotas, 6);

        botonSacarEnCuotas("button9Cuotas", "PAGAR EN 9 CUOTAS", total, mostarTotalEnCuotas, 9);

        botonSacarEnCuotas("button12Cuotas", "PAGAR EN 12 CUOTAS", total, mostarTotalEnCuotas, 12);

        const buttonLimpiarCarrito = botonesParaElCarrito("buttonLimpiarCarrito", "Limpiar Carrito");

        buttonLimpiarCarrito.addEventListener("click", () => {
            carrito.splice(0);
            localStorage.setItem("carrito", JSON.stringify(carrito))
            verCarrito()
        })
    }


    // contenedor.appendChild(mostrarTotal);

    // const mostarTotalEnCuotas = document.createElement("div");

    // contenedor.appendChild(mostarTotalEnCuotas);

    // botonSacarEnCuotas("button3Cuotas", "PAGAR EN 3 CUOTAS", total, mostarTotalEnCuotas, 3);

    // botonSacarEnCuotas("button6Cuotas", "PAGAR EN 6 CUOTAS", total, mostarTotalEnCuotas, 6);

    // botonSacarEnCuotas("button9Cuotas", "PAGAR EN 9 CUOTAS", total, mostarTotalEnCuotas, 9);

    // botonSacarEnCuotas("button12Cuotas", "PAGAR EN 12 CUOTAS", total, mostarTotalEnCuotas, 12);



    // const buttonLimpiarCarrito = botonesParaElCarrito("buttonLimpiarCarrito", "Limpiar Carrito");

    // buttonLimpiarCarrito.addEventListener("click", () => {
    //     carrito.splice(0);
    //     localStorage.setItem("carrito", JSON.stringify(carrito))
    //     verCarrito()
    // })
}


function botonSacarEnCuotas(nombreBoton, texto, total, mostarTotalEnCuotas, cuotas) {
    const boton = botonesParaElCarrito(nombreBoton, texto)
    let precioAPagar = total;
    total = Math.round(total / cuotas);
    boton.addEventListener("click", () => {
        mostarTotalEnCuotas.innerHTML = `
        <h2>Si quiere pagar $${precioAPagar} en ${cuotas} cuotas, cada cuota va a tener un valor de: $${total}</h2>
        `
    })
}

function botonesParaElCarrito(nombreButton, texto) {
    nombreButton = document.createElement("button");
    nombreButton.innerText = texto;

    const contenedorBoton1 = document.querySelector("#contenedor-productos");
    contenedorBoton1.appendChild(nombreButton);

    return nombreButton
}

