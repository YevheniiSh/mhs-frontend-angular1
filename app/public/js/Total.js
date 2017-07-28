var database = DbConnection.getConnection()
var gameId = localStorage.getItem("gameId");
var resultService = new ResultService(database);
var gameService = new GameService(database);

resultService.getGameResults(gameId)
    .then((res) => {
        return res;
    })
    .then(GameResultParser.getRoundsResult)
    .then(replaceTeamIds)
    .then(drawChart)


function replaceTeamIds(score) {
    return gameService.getGameTeams(gameId)
        .then((teams) => {
            score.forEach(roundScore => {
                roundScore.data.forEach(roundScoreData => {
                    teams.forEach(team => {
                        if (roundScoreData.team === team.teamId) {
                            roundScoreData.team = team.name;
                        }
                    })
                })
            })
            return score
        })
}


function drawChart(dataset) {

    rounds = dataset.map(function (d) {
        return d.round;
    });


    dataset = dataset.map(function (d) {
        return d.data.map(function (o) {
            return {
                x: o.score,
                y: o.team
            };
        });
    });

    for (let i = 0; i < dataset.length; i++) {
        for (let j = 0; j < dataset[i].length; j++) {
            try {
                dataset[i][j].x0 = dataset[i - 1][j].x + dataset[i - 1][j].x0;
            } catch (e) {
                dataset[i][j].x0 = 0;
            }
        }
    }
    teamNames = dataset[0].map(d => {
        return d.y;
    })

    let margins = {
        top: 12,
        left: 130,
        right: 24,
        bottom: 24
    };
    legendPanel = {
        width: 210
    };

    width = 700 - margins.left - margins.right - legendPanel.width;
    height = dataset[0].length * 40 - margins.top - margins.bottom;

    svg = d3.select('.chart')
        .append('svg')
        .attr('width', width + margins.left + margins.right + legendPanel.width)
        .attr('height', height + margins.top + margins.bottom)
        .append('g')
        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

    xMax = d3.max(dataset, function (group) {
        return d3.max(group, function (d) {
            return d.x + d.x0;
        });
    });

    xScale = d3.scaleLinear()
        .domain([0, xMax])
        .range([0, width]);

    yScale = d3.scaleBand()
        .domain(teamNames)
        .rangeRound([0, height])
        .padding(0.1);

    xAxis = d3.axisBottom()
        .scale(xScale);

    yAxis = d3.axisLeft()
        .scale(yScale);

    colours = d3.scaleOrdinal(d3.schemeCategory10);

    groups = svg.selectAll('g')
        .data(dataset)
        .enter()
        .append('g')
        .style('fill', function (d, i) {
            return colours(i);
        })

    rects = groups.selectAll('rect')
        .data(function (d) {
            return d;
        })
        .enter()
        .append('rect')
        .attr('x', function (d) {
            return xScale(d.x0);
        })
        .attr('y', function (d) {
            return yScale(d.y);
        })
        .attr('height', function () {
            return yScale.bandwidth();
        })
        .attr('width', function (d) {
            return xScale(d.x);
        })

    texts = groups.selectAll('text')
        .data((d) => {
            return d
        })
        .enter()
        .append('text')
        .attr('x', function (d) {
            return xScale(d.x0 + d.x * 0.4);
        })
        .attr('y', function (d) {
            return yScale(d.y) + yScale.bandwidth() * 0.6;
        })
        .style('fill', "white")
        .text(function (d) {
            return d.x;
        });

    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .style("font-size","15px")
        .call(xAxis);

    svg.append('g')
        .style("font-size","15px")
        .call(yAxis);

    rounds.forEach(function (s, i) {
        svg.append('text')
            .attr('font-size', 15)
            .attr('fill', 'black')
            .attr('x', width + margins.left)
            .attr('y', i * 24 + 18)
            .text(s);
        svg.append('rect')
            .attr('fill', colours(i))
            .attr('width', 60)
            .attr('height', 20)
            .attr('x', width + margins.left + 90)
            .attr('y', i * 23 + 6);
    });
}