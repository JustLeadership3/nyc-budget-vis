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
    const allKeys = Object.keys(oneDepartment);
    const fiscalYearInt = [];
    allKeys.forEach((element) => {
      fiscalYearInt.push(element.substring(3));
    });
    // keeps all the fiscal years in order, the last element is the "agency_capital_expenditures_by_purpose" label and is removed automatically
    fiscalYearInt.sort();
    fiscalYearInt.pop();
    const last5Years = fiscalYearInt.slice(-5);

    // will be the container for the x and y values which will be year and dollar amounts
    let dataArray = [];

    last5Years.forEach((fiscalYearInt) => {
      const fiscalYearString = oneDepartment[`fy_${fiscalYearInt}`];
      const amountInt = parseFloat(fiscalYearString.replace(/,/g, ''));
      let valuesHash = {};
      valuesHash['x'] = `${fiscalYearInt}`;
      valuesHash['y'] = amountInt;
      dataArray.push(valuesHash);
    });

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
