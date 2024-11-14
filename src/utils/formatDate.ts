const formatoFecha = (fecha: string) => {
    //fecha = "01/01/2024";  // string con la fecha en formato DD/MM/YYYY 
    const parts = fecha.split("/");
    const fechaResultado = parts[2] + "-" + parts[1] + "-" + parts[0]; // formato YYYY-MM-DD
    return fechaResultado;
}

export default formatoFecha;