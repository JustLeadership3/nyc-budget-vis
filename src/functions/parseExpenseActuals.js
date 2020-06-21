function parseExpenseActuals(json) {
  // holds the department name, the last 5 years of data, money (in thousands) spent that year
  let tempHash = {};
  const currDate = new Date(Date.now());
  const currYear = currDate.getFullYear();

  json.forEach((entry) => {
    const agencyName = entry['agy_nm'];
    const fiscalYear = parseInt(entry['fisc_yr'], 10);
    const cityFunds = parseInt(entry['cty_fnd'], 10);

    // Only store entries if fiscalYear is within last 10 years from currYear
    if (fiscalYear >= currYear - 10 && fiscalYear <= currYear) {
      // If agencyName is not in tempHash, initialize agency as emtpy object
      if (agencyName in tempHash !== true) {
        tempHash[agencyName] = {};
      }
      tempHash[agencyName][fiscalYear] = cityFunds;
    }
  });

  // will be external data structure
  let returnArray = [];

  for (let [department, information] of Object.entries(tempHash)) {
    let departmentHash = {};
    departmentHash['agency'] = department.toUpperCase();
    let dataArray = [];
    for (let [year, expense] of Object.entries(information)) {
      dataArray.push({
        x: year,
        y: expense * 1000, // Dollar fields was rounded to thousdands
      });
    }
    departmentHash['data'] = dataArray;
    returnArray.push(departmentHash);
  }
  return returnArray;
}
export default parseExpenseActuals;
