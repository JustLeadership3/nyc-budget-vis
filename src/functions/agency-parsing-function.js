function parseAgencyApi(apiData) {
  // will be the final data structure
  let returnArray = [];
  let data = [];
  let dept = {};
  // loop through the data retrieved from the API
  for (let i = 0; i < apiData.length; i++) {
    let elem = apiData[i];

    // if an element has only one key we know that key is the name of the department we are lookin at right now
    if (Object.keys(elem).length === 1) {
      dept.agency = elem.agency_expenditures.toUpperCase();
    }
    // if the name of the expendature is 'total dept' we want to loop through that object and add each years expense for the last five years
    if (elem.agency_expenditures === 'TOTAL DEPT.') {
      for (let year = 2018; year > 2013; year--) {
        let temp = {};
        if (parseFloat(elem[`fy${year}`])) {
          temp.x = year;
          temp.y = parseFloat(elem[`fy${year}`].replace(/,/g, ''));

          data.push(temp);
        }
      }
      // finally add our department to the final data set and reset the dept obj so we can be ready for the next one.
      dept.data = data;
      returnArray.push(dept);
      dept = {};
      data = [];
    }
  }
  return returnArray;
}

export default parseAgencyApi;
