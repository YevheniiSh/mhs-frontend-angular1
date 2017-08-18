var database = DbConnection.getConnection()
var gameId = "-KppOjFC92mwI17MjJNh";/*localStorage.getItem("gameId");*/

var gameService = new GameService(database);

gameService.getCurrentRound(gameId)
    .then(res=>{
        let quizElem = document.querySelector('#round').innerHTML = "Round #"+res.val();
    })
    .then(()=>{
        gameService.getCurrentQuiz(gameId)
            .then(res=>{
                let roundElem = document.querySelector('#quiz').innerHTML = "Quiz #"+res.val();
            })
    })