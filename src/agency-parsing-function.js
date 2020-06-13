function parseAgencyApi(apiData) {
    let parsedData = [];
    let dept = {};

    // loop through the data retrieved from the API
    for (let i = 0; i < apiData.length; i++) {
        let elem = apiData[i];
        // if an element has only one key we know that key is the name of the department we are lookin at right now
        if (Object.keys(elem).length === 1) {
            dept.name = elem.agency_expenditures;
        }
        // if the name of the expendature is 'total dept' we want to loop through that object and add each years expense for the last five years
        if (elem.agency_expenditures === 'TOTAL DEPT.') {
            for (let year = 2018; year > 2013; year--) {
                //adding the year and its exp to our dept object
                dept[`${year}`] = elem[`fy${year}`];
            }
            // finally add our department to our parsed data array and reset the dept obj so we can be ready for the next one.
            parsedData.push(dept);
            dept = {};
        }
    }

    return parsedData;
}

export default parseAgencyApi;