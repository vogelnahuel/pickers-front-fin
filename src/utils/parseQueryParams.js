function parseQueryParams(query) {
  if(query){
    const queryArray = query.split('?')[1].split('&');
    let queryParams = {};
    for (let i = 0; i < queryArray.length; i++) {
      const [key, val] = queryArray[i].split('=');
      queryParams[key] = val ? val : true;
    }
    return queryParams;
  }

}

export default parseQueryParams;