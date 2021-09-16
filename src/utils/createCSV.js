const createCSV=(datosExport) => {

    ///datos.export .data es la informacion en CSV ,  el tipo de salida text/csv
    var blob = new Blob([datosExport.data], { type: 'text/csv;charset=utf-8;' }); 
    if (navigator.msSaveBlob) {  
        navigator.msSaveBlob(blob, "pickers.csv");

   } else { var link = document.createElement("a"); 
   if (link.download !== undefined) {

        var url = URL.createObjectURL(blob);
         link.setAttribute("href", url); 
         link.setAttribute("download", "pickers.csv"); 
         link.style = "visibility:hidden"; 
         document.body.appendChild(link); 
         link.click();
          document.body.removeChild(link); 

      }
   }
}

export default createCSV;