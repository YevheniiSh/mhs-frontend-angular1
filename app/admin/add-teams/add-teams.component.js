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

                this.onClick = function (item) {
                    item.selected = !item.selected;
                    console.log(item);
                };

                this.saveTeams = function () {

                    this.teamsFromDB.forEach((item) => {
                        if (item.selected === true) {
                            this.teams.push({id: item.teamId, name: item.name});
                        }
                    });
                    console.log(this.teams);
                    this.save();
                };

                this.filter = {};

                this.resetFilter = function () {
                    this.filter = {};
                };

                this.setFilter = function (selected) {
                    this.filter = {selected: selected};
                };

                this.addTeamToDb = function () {
                    let teamBuilder = new TeamBuilder(TeamService, [{name: this.newTeamName}]);
                    teamBuilder.setTeams()
                        .then((res) => {
                            console.log(res);
                            res.forEach((item) => {
                                this.teamsFromDB.unshift({teamId: item.id, name: item.name, selected: true});
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