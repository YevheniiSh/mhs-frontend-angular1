angular.module('addTeams')
    .component('addTeams', {
        templateUrl: 'admin/add-teams/add-teams.html',
        controller: ['TeamServiceFactory',
            'GameServiceFactory',
            '$rootScope',
            '$location',

            function (TeamService, GameService, $rootScope, $location) {

                let vm = this;

                this.selected = null;

                this.teams = [];
                this.teamsFromDB = [];

                this.$onInit = onInit;

                function onInit() {
                    vm.getTeams();
                }

                this.getTeams = function () {
                    TeamService.getAllTeams().then((res) => {
                        angular.forEach(res, (team) => {
                            this.teamsFromDB.push({teamId: team.$id, name: team.name, selected: false});
                        });
                    });
                };


                // this.addTeam = function () {
                //     console.log(this.selected);
                //     this.teams.push(this.selected);
                //     this.teamsFromDB = this.teamsFromDB.filter((element) => {
                //         return element.teamId !== this.selected.teamId;
                //     });
                //     this.selected = null;
                // };
                //
                // this.newTeam = function () {
                //     this.teams.push({name: this.newTeamName});
                //     this.newTeamName = '';
                // };

                this.onClick = function (item) {
                    item.selected = !item.selected;
                    console.log(item);
                };

                // this.deleteTeam = function (index) {
                //     if (this.teams.length > 2) {
                //         let removedItem = this.teams.splice(index, 1)[0];
                //         console.log(removedItem);
                //         if (removedItem.teamId !== undefined) {
                //             this.teamsFromDB.push({teamId: removedItem.teamId, name: removedItem.name});
                //         }
                //     }
                //     else {
                //         alert('min number of teams is 2');
                //     }
                // };

                // this.removeDuplicates = function (originalArray, prop) {
                //     var newArray = [];
                //     var lookupObject = {};
                //
                //     for (var i in originalArray) {
                //         lookupObject[originalArray[i][prop]] = originalArray[i];
                //     }
                //
                //     for (i in lookupObject) {
                //         newArray.push(lookupObject[i]);
                //     }
                //     return newArray;
                // };

                this.saveTeams = function () {

                    this.teamsFromDB.forEach((item) => {
                        if (item.selected === true) {
                            this.teams.push({id: item.teamId, name: item.name});
                        }
                    });
                    console.log(this.teams);
                    this.save();
                };

                this.addTeamToDb = function () {
                    let teamBuilder = new TeamBuilder(TeamService, [{name: this.newTeamName}]);
                    teamBuilder.setTeams()
                        .then((res) => {
                            console.log(res);
                            res.forEach((item) => {
                                this.teamsFromDB.push({teamId: item.$id, name: item.name, selected: false});
                            });
                            this.newTeamName = '';
                            return res;
                        })
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
                            console.log(gameId);

                            $location.path('/setup-game-type/' + gameId);
                        });
                }

            }]

    })
;