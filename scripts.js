//Chess

let now = new Date();
now.getFullYear()
now.getMonth()     // Jan 0, Nov 11 (0-11)

currentMonth=now.getMonth();
currentYear=now.getFullYear();


//Search
function search() {
    getUserName()
    getLocation()
}


//Get username
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
            console.log(data.games[0])
        })
}



//Weather
function getLocation() {
    var location = document.getElementById('weatherLocation').value;
  
  
  //Turning city into coordinates
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(data.results[0].latitude)
            console.log(data.results[0].longitude)
            //Returning weather
            let lat = data.results[0].latitude
            let lon = data.results[0].longitude
            fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=2026-06-08&end_date=2026-06-22&hourly=temperature_2m`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
                  })
  }