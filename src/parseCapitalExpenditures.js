// processJson(jsonArray) {

//   var bulkTotals = [];
  
//   var i = 0;
  
//   while (i < jsonArray.length){
//     const temp = jsonArray[i]
//     var maybe 
//     i += 1
//     if ("agency_capital_expenditures_by_purpose" in temp) {
//       maybe = temp["agency_capital_expenditures_by_purpose"]
//       if (maybe.includes("TOTAL"))
//       bulkTotals.push(temp)
//     }  
//   }
  
//   let returnArray = []
  
//   k = 0
  
//   while (k < bulkTotals.length) {
//   const oneDepartment = bulkTotals[k]
//   const allKeys = Object.keys(oneDepartment)
//   const modifiedKeys = []
//   allKeys.forEach(element => {
//     modifiedKeys.push(element.substring(3))
//   })
//   modifiedKeys.sort()
//   modifiedKeys.pop()
  
//   const last5Elements = modifiedKeys.slice(-5)
//   let valuesHash = {};
  
//   last5Elements.map((modifiedKey)=> {
//      const stringKey = oneDepartment[`fy_${modifiedKey}`]
//     const parsedKey = parseFloat(stringKey.replace(/,/g, ''));
//   valuesHash[modifiedKey] = parsedKey
//   })
  
//   returnArray[oneDepartment["agency_capital_expenditures_by_purpose"]] = valuesHash
  
//   k += 1
  
//   }
  
//   return returnArray
  
//   }