//variables globales
var datos = []; //array que contiene todos los datos del ABM

var formularioDatos; //elemento html formulario Datos
var formularioABM; //elemento html formulario ABM

var proximoOrdenamientoDescendente = true; //indica si el proximo ordenamiento de columna es descendente o ascendente

window.onload = OnLoadHandler; //al cargar la pagina llamar la funcion

//funcion llamada al cargarse la pagina
function OnLoadHandler(){

    //cargo los datos del string recibido
    CargarDatosDesdeString();

    //asigno a la variable los elementos del html
    VincularFormDatosEnVariables();
    VincularFormAbmEnVariables();

    //mostrar datos originales en form datos
    GenerarTablaDatos();
}

//carga los datos del string JSON y los almacena en el vector datos
//esta funcion aplica map()
function CargarDatosDesdeString()
{
    const textoBase = '[{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterego":"Superman", "ciudad":"Metropolis","publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterego":"Batman", "ciudad":"Gotica","publicado":20012},{"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterego":"Flash", "ciudad":"Central","publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500,"asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750,"asesinatos":2},{"id":666, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25,"asesinatos":1}]';

    mapeador = (objeto) => {
        if(objeto.hasOwnProperty("id") && objeto.hasOwnProperty("nombre") && objeto.hasOwnProperty("apellido") && objeto.hasOwnProperty("edad"))
        {
            if (objeto.hasOwnProperty("alterego"))
            {
                let futbolista = new Heroe(objeto.id, objeto.nombre, objeto.apellido, objeto.edad, objeto.alterego, objeto.ciudad, objeto.publicado);
                return futbolista;
            }
            else if(objeto.hasOwnProperty("enemigo"))
            {
                let profesional = new Villano(objeto.id, objeto.nombre, objeto.apellido, objeto.edad, objeto.enemigo, objeto.robos, objeto.asesinatos);
                return profesional;
            }
        }
    };
    datos = JSON.parse(textoBase);
    datos = datos.map(mapeador);
}

//Vincula una referencia a los elementos HTML del formulario ABM para poder acceder mas facilmente luego
function VincularFormAbmEnVariables()
{
    //asigno a la variable el formulario ABM
    formularioABM = document.getElementById("formularioABM");

    //añado los sub elementos del formulario ABM
    formularioABM.tipoDePersona = document.getElementById("formularioABM-tipoDePersona");
    formularioABM.idDato = document.getElementById("formularioABM-id");
    formularioABM.nombre = document.getElementById("formularioABM-nombre");
    formularioABM.apellido = document.getElementById("formularioABM-apellido");
    formularioABM.edad = document.getElementById("formularioABM-edad");
    formularioABM.alterEgo = document.getElementById("formularioABM-alterEgo");
    formularioABM.ciudad = document.getElementById("formularioABM-ciudad");
    formularioABM.publicado = document.getElementById("formularioABM-publicado");
    formularioABM.enemigo = document.getElementById("formularioABM-enemigo");
    formularioABM.robos = document.getElementById("formularioABM-robos");
    formularioABM.asesinatos = document.getElementById("formularioABM-asesinatos");

    //añado los botones del ABM
    formularioABM.botonAlta = document.getElementById("formularioABM-botonAlta");
    formularioABM.botonEliminar = document.getElementById("formularioABM-botonEliminar");
    formularioABM.botonModificar = document.getElementById("formularioABM-botonModificar");
}

//Vincula una referencia al formulario de Datos en vista y sus subcomponentes
function VincularFormDatosEnVariables()
{
    //asigno a la variable los elementos del html
    formularioDatos = document.getElementById("formularioDatos");

    //añado los sub elementos del formulario Datos
    //checkbox
    formularioDatos.tipoSelecto = document.getElementById("formularioDatos-tipoSelecto");
    formularioDatos.edadPromedio = document.getElementById("formularioDatos-edadPromedio");
    formularioDatos.idCheckbox = document.getElementById("formularioDatos-id");
    formularioDatos.nombre = document.getElementById("formularioDatos-nombre");
    formularioDatos.apellido = document.getElementById("formularioDatos-apellido");
    formularioDatos.edad = document.getElementById("formularioDatos-edad");
    formularioDatos.alterEgo = document.getElementById("formularioDatos-alterEgo");
    formularioDatos.ciudad = document.getElementById("formularioDatos-ciudad");
    formularioDatos.publicado = document.getElementById("formularioDatos-publicado");
    formularioDatos.enemigo = document.getElementById("formularioDatos-enemigo");
    formularioDatos.robos = document.getElementById("formularioDatos-robos");
    formularioDatos.asesinatos = document.getElementById("formularioDatos-asesinatos");
    //tabla
    formularioDatos.tabla = document.getElementById("formularioDatos-tabla");
}

//genera la tabla de la vista segundos los datos almacenados en el vector datos
function GenerarTablaDatos()
{
    for (elemento of datos)
    {
        AgregarElementoATabla(elemento);
    }
}

//recibe un elemento de tipo Persona o descendientes de Persona para agregarlos a la vista del formulario Datos
function AgregarElementoATabla(elemento)
{
    let estado;
    let celdaTabla;

    //genera la fila de la tabla
    let tableRow = document.createElement("tr");
    tableRow.setAttribute("id", elemento.id);
    tableRow.classList.add(elemento.constructor.name);

    //verifico si tiene que estar en vista o no
    let tipoSelecionado = formularioDatos.tipoSelecto.options[formularioDatos.tipoSelecto.selectedIndex].value;
    
    if(tipoSelecionado != "todos" && elemento.constructor.name != tipoSelecionado)
    {
        tableRow.hidden = true;
    }

    //añade cada columna a la fila segun los datos del elemento
    //verifica si la columna se encuentra oculta para asignar la clase de forma normal u oculta
    //se repite por cada atributo de elemento
    celdaTabla = document.createElement("td");
    estado = "id" + (formularioDatos.idCheckbox.checked ? "" : "-oculta");
    celdaTabla.setAttribute("class", estado);
    celdaTabla.textContent = elemento.id;
    tableRow.appendChild(celdaTabla);

    celdaTabla = document.createElement("td");
    estado = "nombre" + (formularioDatos.nombre.checked ? "" : "-oculta");
    celdaTabla.setAttribute("class", estado);
    celdaTabla.textContent = elemento.nombre;
    tableRow.appendChild(celdaTabla);

    celdaTabla = document.createElement("td");
    estado = "apellido" + (formularioDatos.apellido.checked ? "" : "-oculta");
    celdaTabla.setAttribute("class", estado);
    celdaTabla.textContent = elemento.apellido;
    tableRow.appendChild(celdaTabla);

    celdaTabla = document.createElement("td");
    estado = "edad" + (formularioDatos.edad.checked ? "" : "-oculta");
    celdaTabla.setAttribute("class", estado);
    celdaTabla.textContent = elemento.edad;
    tableRow.appendChild(celdaTabla);

    celdaTabla = document.createElement("td");
    estado = "alterEgo" + (formularioDatos.alterEgo.checked ? "" : "-oculta");
    celdaTabla.setAttribute("class", estado);
    celdaTabla.textContent = elemento.alterEgo || "";
    tableRow.appendChild(celdaTabla);

    celdaTabla = document.createElement("td");
    estado = "ciudad" + (formularioDatos.ciudad.checked ? "" : "-oculta");
    celdaTabla.setAttribute("class", estado);
    celdaTabla.textContent = elemento.ciudad || "";
    tableRow.appendChild(celdaTabla);

    celdaTabla = document.createElement("td");
    estado = "publicado" + (formularioDatos.publicado.checked ? "" : "-oculta");
    celdaTabla.setAttribute("class", estado);
    celdaTabla.textContent = elemento.publicado || "";
    tableRow.appendChild(celdaTabla);

    celdaTabla = document.createElement("td");
    estado = "enemigo" + (formularioDatos.enemigo.checked ? "" : "-oculta");
    celdaTabla.setAttribute("class", estado);
    celdaTabla.textContent = elemento.enemigo || "";
    tableRow.appendChild(celdaTabla);

    celdaTabla = document.createElement("td");
    estado = "robos" + (formularioDatos.robos.checked ? "" : "-oculta");
    celdaTabla.setAttribute("class", estado);
    celdaTabla.textContent = elemento.robos || "";
    tableRow.appendChild(celdaTabla);

    celdaTabla = document.createElement("td");
    estado = "asesinatos" + (formularioDatos.asesinatos.checked ? "" : "-oculta");
    celdaTabla.setAttribute("class", estado);
    celdaTabla.textContent = elemento.asesinatos || "";
    tableRow.appendChild(celdaTabla);
    
    //añade el evento doble click con su respectivo manejador, el cual recibe el elemento como parametro
    tableRow.ondblclick = () => {MostrarAbmComoEliminarModificar(elemento)};

    //añade el elemento a la tabla de la vista
    formularioDatos.tabla.appendChild(tableRow);
}

//filtra los datos en vista del formulario datos para que solo muestre el tipo actualmente seleccionado
function FiltrarTipo(listaSeleccion)
{
    //obtiene el valor seleccionado de tipo
    let selecionado = listaSeleccion.options[listaSeleccion.selectedIndex].value;
    
    //si el tipo seleccionado es todos, muestra todas las filas
    if(selecionado === "todos")
    {
        for (elemento of formularioDatos.tabla.children)
        {
            elemento.hidden = false;
        }
    }
    else 
    {
        //si el tipo no es todos recorre la tabla
        let elemento = formularioDatos.tabla.children;
        for (i in elemento)
        {
            //si la filo es del tipo seleccionado la muestra, si no la oculta
            if(elemento[i].classList.contains(selecionado))
            {
                elemento[i].hidden = false;
            }
            else{
                elemento[i].hidden = true;
            }
        }
    }
}

//recibe por parametro el tipo de la columna (id, nombre, apellido, etc)
//recibe por parametro si debe ser mostrado o no
//modifica la clase de la columna agregando "-oculta" o eliminandolo segun corresponda
function FiltrarClase(tipo, mostrar)
{
    let agregar;
    let eliminar;

    if(mostrar)
    {
        agregar = tipo;
        eliminar = tipo+ "-oculta";
    }
    else
    {
        eliminar = tipo;
        agregar = tipo+ "-oculta";
    }

    //obtiene un array con todos los elementos con la clase que debe ser modificada
    const elementosTipo = document.getElementsByClassName(eliminar);
    for (let i = 0; i < elementosTipo.length;)
    {
        //por cada elemento le añade la clase correspondiente y le elimina la anterior
        elementosTipo[0].classList.add(agregar);
        elementosTipo[0].classList.remove(eliminar);
    }
}

//ordena los datos de la tabla segun el criterio recibido por parametro
//esta funcion aplica sort()
function OrdenarDatos(criterio)
{
    let tabla = formularioDatos.tabla;
    let filasDeTabla = [];

    //por cada elemento de la tabla lo elimina de la vista y lo agrega a un vector temporal
    while(tabla.children.length > 0)
    {
        filasDeTabla.push(tabla.children[0]);
        tabla.removeChild(tabla.children[0]);
    }

    //ordena el vector temporal segun el criterio
    filasDeTabla.sort(criterio);

    //si el tipo de ordenamiento es descendente da vuelta el vector
    if(proximoOrdenamientoDescendente)
    {
        filasDeTabla.reverse();
    }
    
    //actualiza el estado del proximo ordenamiento
    proximoOrdenamientoDescendente = !proximoOrdenamientoDescendente;

    //vuelve a añadir los elementos de la tabla en el orden correcto
    for(fila of filasDeTabla)
    {
        tabla.appendChild(fila);
    }
}

//ordena la tabla segun el id
function OrdenarPorId()
{
    criterio = (a, b) => {
        let textoUno = a.querySelector(".id").textContent;
        let textoDos = b.querySelector(".id").textContent;

        textoUno = parseInt(textoUno) || 0;
        textoDos = parseInt(textoDos) || 0;

        return textoUno - textoDos;
    };

    OrdenarDatos(criterio);
}

//ordena la tabla segun el nombre
function OrdenarPorNombre()
{
    criterio = (a, b) => {
        let textoUno = a.querySelector(".nombre").textContent;
        let textoDos = b.querySelector(".nombre").textContent;

        return textoUno.localeCompare(textoDos);
    };

    OrdenarDatos(criterio);
}

//ordena la tabla segun el apellido
function OrdenarPorApellido()
{
    criterio = (a, b) => {
        let textoUno = a.querySelector(".apellido").textContent;
        let textoDos = b.querySelector(".apellido").textContent;

        return textoUno.localeCompare(textoDos);
    };

    OrdenarDatos(criterio);
}

//ordena la tabla segun la edad
function OrdenarPorEdad()
{
    criterio = (a, b) => {
        let textoUno = a.querySelector(".edad").textContent;
        let textoDos = b.querySelector(".edad").textContent;

        return parseInt(textoUno) - parseInt(textoDos);
    };

    OrdenarDatos(criterio);
}

//ordena la tabla segun el alter ego
function OrdenarPorAlterEgo()
{
    criterio = (a, b) => {
        let textoUno = a.querySelector(".alterEgo").textContent;
        let textoDos = b.querySelector(".alterEgo").textContent;

        return textoUno.localeCompare(textoDos);
    };

    OrdenarDatos(criterio);
}

//ordena la tabla segun la ciudad
function OrdenarPorCiudad()
{
    criterio = (a, b) => {
        let textoUno = a.querySelector(".ciudad").textContent;
        let textoDos = b.querySelector(".ciudad").textContent;

        return textoUno.localeCompare(textoDos);
    };

    OrdenarDatos(criterio);
}

//ordena la tabla segun la publicado
function OrdenarPorPublicado()
{
    criterio = (a, b) => {
        let textoUno = a.querySelector(".publicado").textContent;
        let textoDos = b.querySelector(".publicado").textContent;

        textoUno = parseInt(textoUno) || -1;
        textoDos = parseInt(textoDos) || -1;

        return textoUno - textoDos;
    };

    OrdenarDatos(criterio);
}

//ordena la tabla segun el enemigo
function OrdenarPorEnemigo()
{
    criterio = (a, b) => {
        let textoUno = a.querySelector(".enemigo").textContent;
        let textoDos = b.querySelector(".enemigo").textContent;

        return textoUno.localeCompare(textoDos);
    };

    OrdenarDatos(criterio);
}

//ordena la tabla segun la cantidad de robos
function OrdenarPorRobos()
{
    criterio = (a, b) => {
        let textoUno = a.querySelector(".robos").textContent;
        let textoDos = b.querySelector(".robos").textContent;

        textoUno = parseInt(textoUno) || -1;
        textoDos = parseInt(textoDos) || -1;

        return textoUno- textoDos;
    };

    OrdenarDatos(criterio);
}

//ordena la tabla segun la cantidad de asesinatos
function OrdenarPorAsesinatos()
{
    criterio = (a, b) => {
        let textoUno = a.querySelector(".asesinatos").textContent;
        let textoDos = b.querySelector(".asesinatos").textContent;

        textoUno = parseInt(textoUno) || -1;
        textoDos = parseInt(textoDos) || -1;

        return textoUno- textoDos;
    };

    OrdenarDatos(criterio);
}


//calcula la edad promedio de los elementos de la tabla actualmente en vista
//esta funcion aplica filter() y reduce()
function CalcularEdadPromedio()
{
    let tipoSelecionado = formularioDatos.tipoSelecto.options[formularioDatos.tipoSelecto.selectedIndex].value;
    let filtro;

    if(tipoSelecionado === "todos")
    {
        //si el tipo seleccionado es todos, el filtro siempre devuelve true
        filtro = (valor) => true;
    }
    else
    {   
        //filtra para que solo se obtengan los elementos cuyo tipo sea igual al seleccionado
        filtro = (valor) => valor.constructor.name == tipoSelecionado;
    }

    let elementrosValidos = datos.filter(filtro);
    
    let sumatoriaEdad = elementrosValidos.reduce((sumatoria, valor) => sumatoria + parseInt(valor.edad), 0);

    formularioDatos.edadPromedio.value = (sumatoriaEdad / elementrosValidos.length).toFixed(2);
}

//inicializa el formulario ABM en el estado Agregar y oculta el formulario de Datos
function IniciarAbmAgregar()
{
    formularioDatos.hidden = true;
    formularioABM.hidden = false;

    formularioABM.botonAlta.hidden = false;
    formularioABM.botonEliminar.hidden = true;
    formularioABM.botonModificar.hidden = true;

    formularioABM.tipoDePersona.disabled = false;

    LimpiarInputsAbm();
    MostrarOpcionesAbmCorrectas();
}

//limpia todos los inputs del ABM excepto el ID
function LimpiarInputsAbm()
{
    formularioABM.idDato.value = "";
    formularioABM.nombre.value = "";
    formularioABM.apellido.value = "";
    formularioABM.edad.value = "";
    formularioABM.alterEgo.value = "";
    formularioABM.ciudad.value = "";
    formularioABM.publicado.value = "";
    formularioABM.enemigo.value = "";
    formularioABM.robos.value = "";
    formularioABM.asesinatos.value = "";
}

//filtra las casillas del formulario ABM para que solo se muestren las correspondientes al tipo de dato actualmente seleccionado
function MostrarOpcionesAbmCorrectas()
{
    let tipoSelecionado = formularioABM.tipoDePersona.options[formularioABM.tipoDePersona.selectedIndex].value;

    if(tipoSelecionado == "Heroe")
    {
        formularioABM.alterEgo.parentNode.hidden = false;
        formularioABM.ciudad.parentNode.hidden = false;
        formularioABM.publicado.parentNode.hidden = false;

        formularioABM.enemigo.parentNode.hidden = true;
        formularioABM.robos.parentNode.hidden = true;
        formularioABM.asesinatos.parentNode.hidden = true;
    }
    else
    {
        formularioABM.alterEgo.parentNode.hidden = true;
        formularioABM.ciudad.parentNode.hidden = true;
        formularioABM.publicado.parentNode.hidden = true;

        formularioABM.enemigo.parentNode.hidden = false;
        formularioABM.robos.parentNode.hidden = false;
        formularioABM.asesinatos.parentNode.hidden = false;
    }
}

//calcula el nuevo id unico, tomando el valor maximo actual y agregandole 1
//esta funcion aplica reduce()
function CalcularNuevoId()
{
    obtenerNuevoId = (anterior, actual) => {
        if(actual.id >= anterior)
        {
            return actual.id + 1;
        }
        else{
            return anterior;
        }
    };
    return datos.reduce(obtenerNuevoId,0);
}

//verifica si los datos actuales son validos y si lo son añade una persona al formulario
function AltaPersona()
{
    let persona = null;
    let datosObtenidos = VerificarDatosAbm();

    //verifica si tiene que generar un id nuevo, al ser una alta
    if(isNaN(datosObtenidos.id)){
        datosObtenidos.id = CalcularNuevoId();
    } 
    
    if(datosObtenidos !== null)
    {
        if(datosObtenidos.tipoSelecionado == "Heroe")
        {
            persona = new Heroe(
                datosObtenidos.id, 
                datosObtenidos.nombre, 
                datosObtenidos.apellido, 
                datosObtenidos.edad, 
                datosObtenidos.alterEgo, 
                datosObtenidos.ciudad, 
                datosObtenidos.publicado);
        }
        else
        {
            persona = new Villano(
                datosObtenidos.id, 
                datosObtenidos.nombre, 
                datosObtenidos.apellido, 
                datosObtenidos.edad, 
                datosObtenidos.enemigo, 
                datosObtenidos.robos, 
                datosObtenidos.asesinatos);
        }
        AgregarElementoATabla(persona);
        datos.push(persona);
        MostrarFormDatos();
    }
    else
    {
        alert("Ingreso Datos Invalidos! \nNo se puede dar de alta.");
    }
}

//obtiene los datos del ABM, verifica si son validos y de serlo devuelve dichos datos en un objeto, si no devuelve null
function VerificarDatosAbm()
{
    let datosObtenidos = {};
    
    //obtiene todos los datos del ABM
    datosObtenidos.id = parseInt(formularioABM.idDato.value.trim());
    datosObtenidos.nombre = formularioABM.nombre.value.trim();
    datosObtenidos.apellido = formularioABM.apellido.value.trim();
    datosObtenidos.edad = parseInt(formularioABM.edad.value.trim());
    datosObtenidos.alterEgo = formularioABM.alterEgo.value.trim();
    datosObtenidos.ciudad = formularioABM.ciudad.value.trim();
    datosObtenidos.publicado = parseInt(formularioABM.publicado.value.trim());
    datosObtenidos.enemigo = formularioABM.enemigo.value.trim();
    datosObtenidos.robos = parseInt(formularioABM.robos.value.trim());
    datosObtenidos.asesinatos = parseInt(formularioABM.asesinatos.value.trim());

    datosObtenidos.tipoSelecionado = formularioABM.tipoDePersona.options[formularioABM.tipoDePersona.selectedIndex].value;

    //verifica los datos
    if(datosObtenidos.edad > 0 && datosObtenidos.nombre !== "" && datosObtenidos.apellido !== "" )
    {
        if(datosObtenidos.tipoSelecionado == "Heroe")
        {
            if(datosObtenidos.alterEgo !== "" && datosObtenidos.publicado > 1940 && datosObtenidos.ciudad !== "" )
            {
                return datosObtenidos;
            }
        }
        else
        {
            if(datosObtenidos.enemigo !== "" && datosObtenidos.robos > 0 && datosObtenidos.asesinatos > 0)
            {
                return datosObtenidos;
            }
        }
    }
    return null;   
}

//Muestra el formulario de Datos y oculta el ABM
function MostrarFormDatos()
{
    formularioDatos.hidden = false;
    formularioABM.hidden = true;
}

//Inicializa el ABM en el estado Eliminar/Modificar con los datos recibidor por parametro
function MostrarAbmComoEliminarModificar(elemento)
{
    CargarAbmConDatos(elemento);
    formularioDatos.hidden = true;
    formularioABM.hidden = false;

    formularioABM.botonAlta.hidden = true;
    formularioABM.botonEliminar.hidden = false;
    formularioABM.botonModificar.hidden = false;

    formularioABM.tipoDePersona.disabled  = true;

    MostrarOpcionesAbmCorrectas();
}

//datos los datos recibidos, asigna al ABM dichos datos
function CargarAbmConDatos(elemento)
{
    //asigna el tipo selecto en el ABM segun el tipo del elemento recibido
    for (let i=0; i<formularioABM.tipoDePersona.options.length; i++) 
    {
        let opcion = formularioABM.tipoDePersona.options[i];
      
        if (opcion.value === elemento.constructor.name) {
            opcion.setAttribute('selected', true);
            opcion.selected = true;
        }
        else{
            opcion.setAttribute('selected', false);
            opcion.selected = false;
        }
    }   

    //asigna cada dato a su correspondiente input
    formularioABM.idDato.value = elemento.id;
    formularioABM.nombre.value = elemento.nombre;
    formularioABM.apellido.value = elemento.apellido;
    formularioABM.edad.value = elemento.edad;
    formularioABM.alterEgo.value = elemento.alterEgo || "";
    formularioABM.ciudad.value = elemento.ciudad || "";
    formularioABM.publicado.value = elemento.publicado || "";
    formularioABM.enemigo.value = elemento.enemigo || "";
    formularioABM.robos.value = elemento.robos || "";
    formularioABM.asesinatos.value = elemento.asesinatos || "";
}

//elimina la persona actulamente en el ABM segun su ID y vuelve al formulario de Datos
function EliminarPersona()
{
    let id = parseInt(formularioABM.idDato.value);
    for(i in datos)
    {
        if(datos[i].id == id)
        {
            datos.splice(i, 1);
        }
    }
    let filaTabla = document.getElementById(id);
    filaTabla.parentNode.removeChild(filaTabla);

    MostrarFormDatos();
}

//verifica si los datos ingresados son correctos, de serlos modifica la persona segun su id y vuelve al formulario Datos
function ModificarPersona()
{
    if(VerificarDatosAbm() !== null)
    {
        EliminarPersona();
        AltaPersona();
    }
    else
    {
        alert("No se puede modificar, posee datos invalidos");
    }
}

//declaracion de las clases
class Persona{
    //atributos
    id;
    nombre;
    apellido;
    edad;

    constructor(id, nombre, apellido, edad)
    {
        if (edad !== null && !isNaN(edad))
        {
            this.edad = edad;
        }
        if (id !== null && !isNaN(id))
        {
            this.id = id;
        }

        this.nombre = nombre || "N";
        this.apellido = apellido || "N";
    }
}

class Heroe extends Persona{
    //atributos
    alterEgo;
    ciudad;
    publicado;

    constructor(id, nombre, apellido, edad, alterEgo, ciudad, publicado)
    {
        super(id, nombre, apellido, edad);

        if (publicado !== null && publicado > 1940)
        {
            this.publicado = publicado;
        }
        else{
            this.publicado = 1940;
        }
        
        this.alterEgo = alterEgo || "Sin Alter Ego";
        this.ciudad = ciudad || "Sin Ciudad";
    }
}

class Villano extends Persona{
    //atributos
    enemigo;
    robos;
    asesinatos;

    constructor(id, nombre, apellido, edad, enemigo, robos, asesinatos)
    {
        super(id, nombre, apellido, edad);

        if(robos !== null && robos > 0)
        {
            this.robos = robos;
        } 
        else{
            this.robos = 1;
        }

        if(asesinatos !== null && asesinatos > 0)
        {
            this.asesinatos = asesinatos;
        } 
        else{
            this.asesinatos = 1;
        }

        this.enemigo = enemigo || "Sin Enemigo";
    }
}