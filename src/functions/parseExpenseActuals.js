function parseExpenseActuals(json) {
  // holds the department name, the last 5 years of data, money (in thousands) spent that year
  tempHash = {}
  
  json.forEach((entry) => {
    const agencyName = entry["agy_nm"];
    const fiscalYear = parseInt(entry["fisc_yr"]);
    const cityFunds = parseInt(entry["cty_fnd"]);
    
    if (agencyName in tempHash !== true) {
      tempHash[agencyName] = {};
      tempHash[agencyName]["topFiveYears"] = [fiscalYear];
      tempHash[agencyName]["topFiveYears"].sort();
      tempHash[agencyName][fiscalYear] = cityFunds;
    } else if (tempHash[agencyName]["topFiveYears"].length < 5){
      tempHash[agencyName]["topFiveYears"].push(fiscalYear);
      tempHash[agencyName]["topFiveYears"].sort();
      tempHash[agencyName][fiscalYear] = cityFunds;
    } else if (fiscalYear > tempHash[agencyName]["topFiveYears"][4]) {
      const temp = tempHash[agencyName]["topFiveYears"].pop();
      delete tempHash[agencyName].temp; 
      tempHash[agencyName][fiscalYear] = cityFunds};
  });
  
  // will be external data structure
  let returnArray = []
  
  for (let [department, information] of Object.entries(tempHash)) {
    let departmentHash = {};
    departmentHash["agency"] = department.toUpperCase();
    let dataArray = []
    for (let [key, value] of Object.entries(information)) {
      if (key !== "topFiveYears") {
        let temp = {}
        temp["x"] = key;
        temp["y"] = value * 1000
        dataArray.push(temp)
      }
    }
    departmentHash["data"] = dataArray;
    returnArray.push(departmentHash);
  }
  return returnArray
}
export default parseExpenseActuals;