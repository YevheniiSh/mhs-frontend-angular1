class RoundStatus extends HTMLElement{
    constructor(){
        super();
        this._updateRendering();
    }

     setCurrentRound(results){
        let game = results[0].val()
        let numberOfRounds = game.rounds.length-1;
        let currentRound = results[1].val();
         // let currentRound = 2;

         if ('content' in document.createElement('template')) {

            // Instantiate the table with the existing HTML tbody
            // and the row with the template
            var t = document.querySelector('#temp');



            var t2 = document.querySelector('#aTemp');
            let a = t2.content.querySelector('a');
            let classA = a.getAttribute('class');
            let roundString = a.innerHTML;

            var past = t.content.querySelector(".past");
            var current = t.content.querySelector(".current");
            var future = t.content.querySelector(".future");

            for(let i = 1; i<currentRound; i++){
                a.setAttribute('class', classA+" btn-success");
                a.innerHTML = roundString+i;
                let newA = document.importNode(t2.content, true);
                past.appendChild(newA);
            }

            a.setAttribute('class', classA+" btn-danger");
            a.innerHTML = roundString+currentRound;
            let currentA = document.importNode(t2.content, true);
            current.appendChild(currentA);

            for(let i = currentRound+1; i <= numberOfRounds; i++){
                a.setAttribute('class', classA+" btn-silver");
                a.innerHTML = roundString+i;
                let futureA = document.importNode(t2.content, true);
                future.appendChild(futureA);
            }

            var shadow = this.attachShadow({mode: 'open'});

            var panel = document.importNode(t.content, true);
            shadow.appendChild(panel);








        } else {
            // Find another way to add the rows to the table because
            // the HTML template element is not supported.
        }
    }


    _updateRendering() {

        let gs = new GameService(DbConnection.getConnection());
        let gameId = localStorage.getItem("gameId");
            let numberOfRounds = gs.getGameById(gameId);

            let currentRound = gs.getCurrentRound(gameId);
            Promise.all([numberOfRounds, currentRound])
                .then(res => {this.setCurrentRound(res);
                console.log(res);
                });

    }
}

function onClicked() {
    document.location.href = '../admin/setAnswers.html';
}

window.customElements.define('round-status', RoundStatus);