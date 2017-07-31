angular.module('addTeams')
    .component('addTeams', {
        templateUrl: 'admin/add-teams/add-teams.html',
        controller: function AddTeamsController($rootScope, $location) {

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

                let teamBuilder = new TeamBuilder(new TeamService(DbConnection.getConnection()), this.teams);
                teamBuilder.setTeams()
                    .then((res) => {
                            $rootScope.teams = res;
                            $location.path('/setup-game-type');
                            $rootScope.$apply();
                        },
                        (err) => {
                            console.error(err);
                        });
            };

        }

    });