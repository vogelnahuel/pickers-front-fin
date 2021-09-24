function parseQueryParams(query) {
  let queryParams = {};
  if(query){
    const queryArray = query.split('?')[1].split('&');
    for (let i = 0; i < queryArray.length; i++) {
      const [key, val] = queryArray[i].split('=');
      queryParams[key] = val ? val : true;
    }
  }
  return queryParams;
}

export default parseQueryParams;