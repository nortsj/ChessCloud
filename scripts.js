//Button
document.getElementById("weatherLocation").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        search();
    }
});

document.getElementById("chessUsername").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        search();
    }
});

//Chess

let now = new Date();
now.getFullYear()
now.getMonth()

currentMonth = now.getMonth();
currentYear = now.getFullYear();

//Search
function search() {
    getUserName();
    getLocation();
}

//Chess API lookup
function getUserName() {
    var chessUsername = document.getElementById('chessUsername').value;

    fetch(`https://api.chess.com/pub/player/${chessUsername}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })

    fetch(`https://api.chess.com/pub/player/${chessUsername}/games/${currentYear}/05`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let count = 1;
            let table = '<table>';
            data.games.forEach(game => {
                if (game.black.username == chessUsername) {
                    table += `<tr><td>${count++}. ${game.black.result}</td></tr>`;
                } else {
                    table += `<tr><td>${count++}. ${game.white.result}</td></tr>`;
                }
            });
            table += '</table>';
            document.getElementById('output').innerHTML += table;
                })
}

//Weather
function getLocation() {
    var location = document.getElementById('weatherLocation').value;

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let lat = data.results[0].latitude
            let lon = data.results[0].longitude
            fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=2026-06-08&end_date=2026-06-22&hourly=temperature_2m,weathercode`)
                .then(response => response.json())
                .then(data => {
                    let split = data.hourly.time[0].split("T");
                    let date = split[0];
                    let time = split[1];
                    let temp = data.hourly.temperature_2m[0];
                    let code = data.hourly.weathercode[0];
                    if (code === 0) {
                        code = "Clear sky";
                    } else {
                        code = "Code not yet completed";
                    }
                    document.getElementById('output').innerHTML = date + "<br>" + time + "<br>" + temp + "°C" + "<br>" + code;
                    console.log(data);
                })
            })
        }