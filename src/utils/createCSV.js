const createCSV=(datosExport) => {//preguntar
    //TODO: tipar

    ///datos.export .data es la informacion en CSV ,  el tipo de salida text/csv
    var blob = new Blob([datosExport], { type: 'text/csv;charset=utf-8;' }); 
    let Navigator = window.navigator
    if (Navigator.msSaveBlob) {  
        Navigator.msSaveBlob(blob, "pickers.csv");

   } else { var link = document.createElement("a"); 
   if (link.download !== undefined) {

        var url = URL.createObjectURL(blob);
         link.setAttribute("href", url); 
         link.setAttribute("download", "pickers.csv"); 
         link.setAttribute('style',"visibility:hidden"); 
         document.body.appendChild(link); 
         link.click();
          document.body.removeChild(link); 

      }
   }
}

export default createCSV;