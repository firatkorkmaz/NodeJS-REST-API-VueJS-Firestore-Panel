/* JS Playground: Column-to-Column JSON Object Derivation*/
// This File is Not Used in the Program, Only for Study
// Copy and Run This Code at: onecompiler.com/nodejs

var allRows = [
    {
        "id": "1iZHQnxythCenfetew2y",
        "description": "Latest version of the app.",
        "create_date": "23/07/2024 02:57",
        "value": "2.1",
        "parameter_key": "latestVersion"
    },
    {
        "id": "CMWqBhCqBkSZgcnjlwTR",
        "description": "Index of Scroll Paywall for free users.",
        "create_date": "23/07/2024 02:58",
        "value": "5",
        "parameter_key": "scrollPaywall"
    },
    {
        "id": "NrQaj1gncBzRaMekmZB5",
        "description": "Button text.",
        "create_date": "23/07/2024 03:03",
        "value": "Try now!",
        "parameter_key": "btnText"
    },
    {
        "id": "TDanfThyN4NSxPWreVOA",
        "description": "Minimum required version of the app.",
        "create_date": "23/07/2024 02:57",
        "value": "1.0",
        "parameter_key": "minimumVersion"
    },
    {
        "id": "hlZXyK223KWLENm0hYqt",
        "description": "Free usage limit.",
        "create_date": "23/07/2024 02:58",
        "value": "5",
        "parameter_key": "freeUsageLimit"
    },
    {
        "id": "nQ7EnpGsKnVxfBZKJ3T0",
        "description": "Index of Scroll Limit Paywall for free users.",
        "create_date": "23/07/2024 02:55",
        "value": "13",
        "parameter_key": "scrollLimit"
    },
]


var parameter_key = []; var value = []
var dataObjList = JSON.parse(JSON.stringify(allRows));
dataObjList.forEach(dataObj => {
	parameter_key.push(dataObj.parameter_key);
	value.push(dataObj.value);
});


function jsonify(list1, list2) {
    const jsonObj = {};
    list1.forEach((element, index) => {
        jsonObj[element] = list2[index]
    });
    return jsonObj;
};


const jsonLog = jsonify(parameter_key, value);
console.log(jsonLog);
console.log();


/**********************************************/


function currentTime() {
    const date = new Date();
    return date.getDate().toString().padStart(2, '0') + '/' +
        (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
        date.getFullYear() + ' ' +
        date.getHours().toString().padStart(2, '0') + ':' +
        date.getMinutes().toString().padStart(2, '0');
}


function reverseDate(str) {
    const words = str.split(" ");
    const rev = [words[0].split("/").reverse().join("/"), words[1]].join(" ");
    return rev;
}
 
let dateNow = currentTime();

console.log("Current Date:", dateNow)
console.log("Reverse Date:", reverseDate(dateNow));   // For Correct Sorting
