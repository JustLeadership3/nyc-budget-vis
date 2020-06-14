function processCapitalExpenditures(json) {
  // will be a list of all the data that is a department summary, identifyable by "TOTAL" in the name
  var bulkTotals = [];

  var i = 0;

  while (i < json.length) {
    const possibleDepartment = json[i];
    var DepartmentName;
    i += 1;
    if ('agency_capital_expenditures_by_purpose' in possibleDepartment) {
      DepartmentName =
        possibleDepartment['agency_capital_expenditures_by_purpose'];
      if (DepartmentName.includes('TOTAL')) bulkTotals.push(possibleDepartment);
    }
  }

  // will be the return structure
  // an array of hashes for each department wherein the data is nested in inner hashes for each data point
  let returnArray = [];

  let k = 0;
  while (k < bulkTotals.length) {
    const oneDepartment = bulkTotals[k];
    const currDate = new Date(Date.now());
    const currYear = currDate.getFullYear();
    let dataArray = [];

    for (let year = currYear - 10; year <= currYear; year++) {
      const fiscalYearString = oneDepartment[`fy_${year}`];
      if (fiscalYearString !== undefined) {
        const amountInt = parseFloat(fiscalYearString.replace(/,/g, ''));
        let valuesHash = {};
        valuesHash['x'] = year.toString();
        valuesHash['y'] = amountInt;
        dataArray.push(valuesHash);
      }
    }

    // will be the container to hold the department's name and data
    let departmentHash = {};
    const agencyDigestedName = oneDepartment[
      'agency_capital_expenditures_by_purpose'
    ]
      .substring(6)
      .toUpperCase();
    departmentHash['agency'] = agencyDigestedName;
    departmentHash['data'] = dataArray;
    returnArray.push(departmentHash);
    k += 1;
  }
  return returnArray;
}

export default processCapitalExpenditures;
