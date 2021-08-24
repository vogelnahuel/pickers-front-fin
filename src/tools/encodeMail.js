
const codificarEmailURIFunction =    (mail) => {
    //busco la primera parte del email a codificar ejemplo  máth.+picker641 
  const  emailCodificar =  (mail).substring(0,mail.indexOf("@"));
  //guardo despues del arroba sin codificar
  const  AliasDelMail =  (mail).substring(mail.indexOf("@"),(mail).length);
  //codifico  para hacer la consulta a la api
  const mailCodificado= encodeURIComponent(emailCodificar);
  //uno ambas cadenas
  mail = mailCodificado.concat(AliasDelMail);

  return mail;
}

export default codificarEmailURIFunction;
    