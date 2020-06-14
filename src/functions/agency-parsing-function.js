function parseAgencyApi(apiData) {
  // will be the final data structure
  let returnArray = [];
  let data = [];
  let dept = {};
  const currDate = new Date(Date.now());
  const currYear = currDate.getFullYear();
  // loop through the data retrieved from the API
  for (let i = 0; i < apiData.length; i++) {
    let elem = apiData[i];

    // if an element has only one key we know that key is the name of the department we are lookin at right now
    if (Object.keys(elem).length === 1) {
      dept.agency = elem.agency_expenditures.toUpperCase();
    }
    // if the name of the expendature is 'total dept' we want to loop through that object and add each years expense for the last five years
    if (elem.agency_expenditures === 'TOTAL DEPT.') {
      for (let year = currYear - 10; year <= currYear; year++) {
        let temp = {};
        // In the dataset, the years are listed in one of the following
        // formats:
        // 1. fyYEAR (e.g. fy2018
        // 2. fy_YEAR (e.g. fy_2013)
        const expenseString =
          elem[`fy${year}`] !== undefined
            ? elem[`fy${year}`]
            : elem[`fy_${year}`];
        // Since dataset is not always complete, there is a chance that
        // the expense for a given year is undefined
        if (expenseString !== undefined) {
          const expenseNumber = parseFloat(expenseString.replace(/,/g, ''));
          // The expense for an agency may not be in a number format
          // (e.g. - 0) so we need to make sure the number parses to an
          // actual number
          if (!isNaN(expenseNumber)) {
            temp.x = year.toString();
            temp.y = parseFloat(expenseString.replace(/,/g, ''));
            data.push(temp);
          }
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
