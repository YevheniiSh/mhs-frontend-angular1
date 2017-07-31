angular.module('addTeams')
    .component('addTeams', {
        templateUrl: 'admin/add-teams/add-teams.html',
        controller: ['TeamServiceFactory',
            'GameServiceFactory',
            '$rootScope',
            '$location',

            function (TeamService, GameService, $rootScope, $location) {

            console.log(TeamService);

            // This would be loaded by $http etc.
            this.teams = [
                {
                    name: 'Superman',
                },
                {
                    name: 'Batman',
                }
            ];

            this.addTeam = function () {
                this.teams.push({name: 'Team'});
            };

            this.deleteTeam = function (index) {
                if (this.teams.length > 2) {
                    this.teams.splice(index, 1);
                }
                else {
                    alert('min number of teams is 2');
                }
            };

            this.saveTeams = function () {
                this.teams.map(item => item.name)
                    .filter((value, index, self) => self.indexOf(value) === index);

                console.log(this.teams);

                let teamBuilder = new TeamBuilder(TeamService, this.teams);
                teamBuilder.setTeams()
                    .then((res) => {
                        $rootScope.teams = res;
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
            };

        }]

    });