export function getData() {
    let dataCount = 30;
    console.log("getData pressed ")
    let data = [];
    for (var i = 0; i < dataCount; i++) {
        var mod = Math.floor(i / 10) % 10;
        data.push({
            date: new Date(2005, 0, i),
            yval: mod == 0 ? null : Math.random() * 100
        });
    }
    return data;
}

export function getDataTest(dataForChart, year, mounth) {
    let dataCount = dataForChart.length;
    let data = [];
    for (let i = 0; i < dataCount; i++) {
        //let mod = Math.floor(i / 10) % 10;
        data.push({
            date: new Date(year, mounth, i),
            yval: dataForChart[i] * 10
        });
    }
    return data;
}
