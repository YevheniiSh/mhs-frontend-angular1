angular
    .module('mhs.admin')
    .controller('resultEditorCtrl', function() {
        let db = DbConnection.getConnection();
        let resultService = new ResultService(db);
        let teamService = new TeamService(db);
        resultService.getByRoundAndQuiz(3,2,'-Kq8WOf8_OxjxQdg8pIV').then(results => {
            results.forEach(result => {
              teamService.getById(result.teamId).then(team =>{

                  })
            });
        });
});