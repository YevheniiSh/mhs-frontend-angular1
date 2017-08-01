angular.module('addTeams')
    .component('addTeams', {
        templateUrl: 'admin/add-teams/add-teams.html',
        controller: ['TeamServiceFactory',
            'GameServiceFactory',
            '$rootScope',
            '$location',

            function (TeamService, GameService, $rootScope, $location) {

            console.log(TeamService);

                this.selected = {};

            this.teams = [
                // {
                //     name: 'Superman',
                // },
                // {
                //     name: 'Batman',
                // }
            ];

                this.teamFire = [];

                TeamService.getAllTeams().then((res) => {
                    for (let key in res) {
                        this.teamFire.push({teamId: key, name: res[key].name});
                    }
                    $rootScope.$apply();
                });

                console.log(this.teamFire);

            this.addTeam = function () {
                console.log(this.selected);
                this.teams.push(this.selected);
                this.selected = {};
            };

                this.newTeam = function () {
                    this.teams.push({name: this.newTeamName});
                    this.newTeamName = '';
                };

            this.deleteTeam = function (index) {
                if (this.teams.length > 2) {
                    this.teams.splice(index, 1);
                }
                else {
                    alert('min number of teams is 2');
                }
            };

                this.removeDuplicates = function (originalArray, prop) {
                    var newArray = [];
                    var lookupObject = {};

                    for (var i in originalArray) {
                        lookupObject[originalArray[i][prop]] = originalArray[i];
                    }

                    for (i in lookupObject) {
                        newArray.push(lookupObject[i]);
                    }
                    return newArray;
                }

            this.saveTeams = function () {


                let unique = this.removeDuplicates(this.teams, "name");
                // console.log("uniqueArray is: " + JSON.stringify(uniqueArray));
                //
                // let unique = [...new Set(this.teams.map(item => {return {teamId:item.teamId, name:item.name}}))];

                console.log(unique);
                if (unique.length < this.teams.length) {
                    alert('You have entered teams with same name. Remove dublicate');
                }
                else {
                    this.teams = [];

                    unique.forEach(item => {
                        this.teams.push({id: item.teamId, name: item.name});
                    });
                    this.save();
                }


            };

                this.save = function () {
                    let teamBuilder = new TeamBuilder(TeamService, this.teams);
                    teamBuilder.setTeams()
                        .then((res) => {
                            return res;

                        })
                        .then((teams) => {
                            let game = new GameBuilder().addTeams(teams).buildGame();
                            return GameService.save(game);
                        })
                        .then((gameId) => {
                            console.log(gameId.key);

                            $location.path('/setup-game-type/' + gameId.key);
                            $rootScope.$apply();
                        });
                }

        }]

    });