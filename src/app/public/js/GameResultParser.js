class GameResultParser {
    static getRoundsResult(result) {
        let res = [];
        for ( let key in result) {
            res.push(result[key])
        }
        var rounds = {}
        res.forEach((elem) => {
            rounds[elem.round] = {};
        });
        for(let key in rounds){
            let teams = {}
            res.forEach((elem) => {
                teams[elem.teamId] = {score:0};
            })
            rounds[key] = teams;
        }
        res.forEach((elem)=>{
            rounds[elem.round][elem.teamId].score+=elem.score;
        });
        var results = [];
        for(var roundKey in rounds){
            results.push({round:"Round #"+(roundKey),data:(function () {
                let data = [];
                for(var teamKey in rounds[roundKey]){
                    data.push({team:teamKey,score:rounds[roundKey][teamKey].score})
                }
                return data;
            })()})
        }
        return results;
        
    }
}