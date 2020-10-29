


let array = [];
//


export function getRawDataFromDataBase(url) {
    return fetch(url)
        .then((res) => {
            array=[]
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
            return [array,jsonArray]
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

//Append data on Humidity
function appendDataOnArray(data) {
    array.push(data)
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
            appendDataOnArray(parseInt(mySubString, 16));
        } else if (jsonObj.type === "heart") {
            appendDataOnArray(parseInt(mySubString, 16));
        } else if (jsonObj.type ==="Luminance") {
            appendDataOnArray(parseInt(mySubString, 16));
        } else if (jsonObj.type === "humidity") {
            appendDataOnArray(parseFloat(mySubString));
        } else {
            appendDataOnArray(parseFloat(mySubString));
        }
    }
    //console.log("data size : " + array.length);
}
