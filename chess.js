function getUserName() {
    var chessUsername = document.getElementById('chessUsername').value;

    fetch(`https://api.chess.com/pub/player/${chessUsername}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
}