"use strict"
const stationElement = document.getElementById('station');
const station = document.getElementById('submit');
const tableElement = document.getElementById('time-table');
const buttonElement = document.getElementById('submit');
// opendata api URL

const getData = async () => {
    const station = stationElement.value;
    const url = `https://transport.opendata.ch/v1/stationboard?station=${station}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
buttonElement.addEventListener('click', async () => {
    const data = await getData();
    displayData(data);
});

const displayData = (data) => {
    const stationName = data.station.name;
    const stationNameElement = document.getElementById('station-name');
    stationNameElement.textContent = stationName;

    data.stationboard.forEach((train) => {
        const gleis = train.passList[0].platform;
        const destination = train.to;
        const time = new Date(train.stop.departure);//+

        // Format the time to 24-hour format in Swiss German locale//+
        const formattedTime = new Intl.DateTimeFormat('de-CH', {//+
            hour: '2-digit',//+
            minute: '2-digit',//+
            hour12: false//+
        }).format(time);//+

        const row = tableElement.insertRow();
        const cellUhrzeit = row.insertCell();
        cellUhrzeit.textContent = formattedTime;//+
        const cellZiel = row.insertCell();//+
        cellZiel.textContent = destination;
        const cellGleis = row.insertCell();
        cellGleis.textContent = gleis;
    });
};