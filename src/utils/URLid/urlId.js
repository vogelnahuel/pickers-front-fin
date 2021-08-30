function URLid() {
  
    //Se obtiene el valor de la URL desde el navegador
    const actual = window.location+'';
    //Se realiza la división de la URL
    const split = actual.split("/");
    //Se obtiene el ultimo valor de la URL
    const id = split[split.length-1];
    return Number(id);
}
  
  
export default URLid;