var buildButton = document.getElementById("game-build");
var currentRound = 0;

function buildGameForFirebase() {
    var numberOfRoundsElem = document.getElementById('number-tour');
    var numberOfRounds = numberOfRoundsElem.value;
    var gameBuilder = new GameBuilder();

    for (let i = 0; i < numberOfRounds; i++) {
        let numberOfQuizzesElement = document.getElementById('number-questions-' + (i + 1));

        gameBuilder.addRound(i + 1, Number(numberOfQuizzesElement.value));
    }

    let teams = JSON.parse(localStorage.getItem("teams"));
    gameBuilder.addTeams(teams);

    return gameBuilder.buildGame();
}
function buildListener() {
    let game = buildGameForFirebase();
    let gameService = new GameService(DbConnection.getConnection());
    gameService.save(game).then((gameId)=>{
        localStorage.setItem("gameId", gameId.key);
        document.location.href = '../admin/RoundStatus.html'
    });
}

function onChangeRounds() {
    let numberOfRoundsInput = document.getElementById('number-tour');
    let numberOfRounds = numberOfRoundsInput.value;
    if(numberOfRounds > currentRound){
        for(let i = (currentRound+1); i<=numberOfRounds; i++){
            addRound();
        }
    }
    else {
        for(let i = (currentRound); i>numberOfRounds; i--){
            deleteRound();
        }
    }

}

function deleteRound() {
    currentRound--;
    let div = document.querySelector("#rows");
    let divToDelete = document.querySelector("#rows div:last-of-type");
    div.removeChild(divToDelete);
}


function addRound() {
    // Test to see if the browser supports the HTML template element by checking
// for the presence of the template element's content attribute.
    if ('content' in document.createElement('template')) {

        currentRound++;
        // Instantiate the table with the existing HTML tbody
        // and the row with the template
        let t = document.querySelector('#roundRow'),
            input = t.content.querySelector("input"),
            label = t.content.querySelector("label");
        input.setAttribute("id", 'number-questions-'+(currentRound));
        label.setAttribute("for", 'number-questions-'+(currentRound));
        label.innerHTML = "Number of questions to "+currentRound+" tour";

        // Clone the new row and insert it into the table
        let div = document.querySelector("#rows");
        let clone = document.importNode(t.content, true);
        div.appendChild(clone);

    } else {
        // Find another way to add the rows to the table because
        // the HTML template element is not supported.
    }
}

function onLoad() {
    let numberOfRoundsInput = document.getElementById('number-tour');
    let numberOfRounds = numberOfRoundsInput.value;
    for (let i = 0; i< numberOfRounds; i++){
        addRound();
    }

    numberOfRoundsInput.onkeypress=function(evt){
        evt.preventDefault();
    };
}