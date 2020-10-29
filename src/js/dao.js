

let arrayTemperature = [];
let arrayHumidity = [];
let arraySkin = [];
let arrayLuminance = [];
let arrayHeartRate = [];
//
var maxArraySizeTemperature = 65536;
var maxArraySizeHumidity = 65536;
var maxArraySizeSkin = 65536;
var maxArraySizeLuminance = 65536;
var maxArraySizeHeartRate = 65536;

export function getRawDataFromDataBase(url) {
    return fetch(url)
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            console.log(res);
            let jsonArrayString = JSON.stringify(res);
            let jsonArray = (JSON).parse(jsonArrayString);
            for (let i = 0; i < jsonArray.length; i++) {
                //console.log(jsonArray[i]);
                getParsedData(jsonArray[i])
                return jsonArray
            }
        }).then((jsonArray) => {
            //console.log("returnArray  :"+ arraySkin)
            //return arraySkin
            return [arraySkin,jsonArray]
    })
}

//General use functions
function parseFloat(str) {
    var float = 0, sign,  exp,
        int = 0, multi = 1;
    if (/^0x/.exec(str)) {
        int = parseInt(str, 16);
    } else {
        for (var i = str.length - 1; i >= 0; i -= 1) {
            if (str.charCodeAt(i) > 255) {
                console.log('Wrong string parametr');
                return false;
            }
            int += str.charCodeAt(i) * multi;
            multi *= 256;
        }
    }
    sign = (int >>> 31) ? -1 : 1;
    exp = (int >>> 23 & 0xff) - 127;
    var mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
    for (i = 0; i < mantissa.length; i += 1) {
        float += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0;
        exp--;
    }
    return float * sign;
}

//Append data on Temperature
function appendDataOnTemperature(data) {
    arrayTemperature.push(data);
    if (arrayTemperature.length >= maxArraySizeTemperature) {
        console.log("Temperature data array " + arrayTemperature);
        arrayTemperature = [];
    }
}

//Append data on Humidity
function appendDataOnHumidity(data) {
    arrayHumidity.push(data);
    if (arrayHumidity.length >= maxArraySizeHumidity) {
        console.log("Humidity data array full " + arrayHumidity);
        arrayHumidity = [];
    }
}

//Append data on Skin
function appendDataOnSkin(data) {
    arraySkin.push(data);
    if (arraySkin.length >= maxArraySizeSkin) {
        //console.log("Skin data array full " + arraySkin);
        arraySkin = [];
    }
}

//Append data on Luminance
function appendDataOnLuminance(data) {
    arrayLuminance.push(data);
    if (arrayLuminance.length >= maxArraySizeLuminance) {
        console.log("Luminance data array full " + arrayLuminance);
        arrayLuminance = [];
    }
}

//Append data on Heart Rate
function appendDataOnHeartRate(data) {
    arrayHeartRate.push(data);
    if (arrayHeartRate.length >= maxArraySizeHeartRate) {
        console.log("Heart Rate data array full " + arrayHeartRate);
        arrayHeartRate = [];
    }
}

function getParsedData(jsonObj) {
    var stringToParse = jsonObj.data;
    //console.log("data size : " + stringToParse.length);
    for (var i = 0; i < stringToParse.length; i = i + 8) {
        var mySubString = "0x" + stringToParse.substring(i, i + 8);
        /*
        console.log("data type : " + jsonObj.type);
        console.log("hex value : " + mySubString);
        console.log("float value : " + parseFloat(mySubString));
        console.log("int value : " + parseInt(mySubString, 16));
        */
        if (jsonObj.type === "skin") {
            appendDataOnSkin(parseInt(mySubString, 16));
        } else if (jsonObj.type === "heart") {
            appendDataOnHeartRate(parseInt(mySubString, 16));
        } else if (jsonObj.type ==="Luminance") {
            appendDataOnLuminance(parseInt(mySubString, 16));
        } else if (jsonObj.type === "humidity") {
            appendDataOnHumidity(parseFloat(mySubString));
        } else {
            appendDataOnTemperature(parseFloat(mySubString));
        }
    }
    //console.log("data size : " + array.length);
}
