function parseQueryParams(query) {
  const queryArray = query ? query.split('?')[1].split('&'): [];
  let queryParams = {};
  for (let i = 0; i < queryArray.length; i++) {
    const [key, val] = queryArray[i].split('=');
    queryParams[key] = val ? val : true;
  }
  return queryParams;
}

export default parseQueryParams;