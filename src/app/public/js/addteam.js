var numberOfTeams = 0;
var limit = 10;

class NewTeamInput{
    constructor(teamNumber){
        this.teamNumber = teamNumber;
    }

    addTeam(){
        var newdiv = document.createElement('div');


        var newLabel = document.createElement('label');
        newLabel.setAttribute('class', 'control-label teams');
        newLabel.innerHTML = 'Team' + this.teamNumber;
        newdiv.appendChild(newLabel);

        var inputdiv = document.createElement('div');
        inputdiv.setAttribute('class', 'input-group');

        var newinput = document.createElement('input');
        newinput.setAttribute('id', 'team' + this.teamNumber);
        newinput.setAttribute('class', 'form-control');
        newinput.setAttribute('type', 'text');
        newinput.setAttribute('name', 'team[]');
        newinput.setAttribute('placeholder', 'Team name');

        inputdiv.appendChild(newinput);

        var newspan = document.createElement('span');
        newspan.setAttribute('class', 'input-group-btn');

        var newbutton = document.createElement('button');
        newbutton.setAttribute('class', 'btn btn-primary');
        newbutton.setAttribute('type', 'button');

        var newi = document.createElement('i');
        newi.setAttribute('class', 'fa fa-trash-o');
        newi.setAttribute('aria-hidden', 'true');

        newbutton.appendChild(newi);
        newspan.appendChild(newbutton);

        inputdiv.appendChild(newspan);

        newdiv.appendChild(inputdiv);
        newdiv.addEventListener('click', deleteRow);

        document.getElementById('teams').appendChild(newdiv);
    }
}

function deleteRow() {

    var target = event.target;
    while (target != this) {
        if (target.tagName == 'BUTTON') {
            if (numberOfTeams > 2) {
                // нашли элемент, который нас интересует!
                var div = document.getElementById('teams')
                div.removeChild(this);
                numberOfTeams--;
                reorderTeams();
                return;
            }
            else {
                alert('Minimum number of teams == 2!');
            }
        }
        target = target.parentNode;
    }

}

function reorderTeams() {

    var teams = document.getElementsByClassName('teams');
    for (i = 0; i < teams.length; i++) {
        teams[i].innerHTML = 'Team' + (i + 1);
    }

}

function addInput() {
    numberOfTeams++;
    if (numberOfTeams > limit) {
        alert("You have reached the limit of adding " + (numberOfTeams - 1) + " inputs");
        numberOfTeams--;
    }
    else {
        var newInput = new NewTeamInput(numberOfTeams);
        newInput.addTeam();
    }
}

function createTeams() {
    addInput();
    addInput();
}






