const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URL = "https://fbref.com";

const LEAGUE_TABLE_URLS = {
    "Premier League": "https://fbref.com/en/comps/9/Premier-League-Stats",
    "La Liga": "https://fbref.com/en/comps/12/La-Liga-Stats",
    "Ligue 1": "https://fbref.com/en/comps/13/Ligue-1-Stats",
    "Bundesliga": "https://fbref.com/en/comps/20/Bundesliga-Stats",
    "Serie A": "https://fbref.com/en/comps/11/Serie-A-Stats"
};

let footballscores = {};
let footballteams = {
    leagues: {}
};

getFootballScores = async function(team) {
    if(team in footballscores) {
        return footballscores[team];
    }
    
    for(const [league, teams] of Object.entries(footballteams.leagues)) {
        if(team in teams) {
            try {
                const {data} = await axios.get(teams[team]);
                const $ = cheerio.load(data);
                const scoreElement = $("div#meta strong:contains('Last Match')").parent();

                // We expect this to be in format 'Last Match: <our team score>-<other team score> vs Other Team Name'
                let scoreText = $(scoreElement).text();
                scoreText = scoreText.replace("Last Match: ", "");

                // Remove result (e.g. Draw, Win)
                scoreText = scoreText.substr(scoreText.indexOf(" ") + 1);

                let homeAwayScore = scoreText.split(" ")[0];

                // This uses an endash, be warned!
                homeAwayScore = homeAwayScore.split("–");
                let lastTeamScore = {
                    "homeScore": homeAwayScore[0],
                    "awayScore": homeAwayScore[1],
                    // Get everything after the 'vs' to get team name
                    "awayTeam": scoreText.split(" ").slice(2).join(" ")
                };

                footballscores[team] = lastTeamScore;

                return lastTeamScore;
            } catch(error) {
                console.error(error);
                return "0";
            }
        }
    }
}


getFootballTeams = async function() {
    if(Object.keys(footballteams.leagues).length > 0) {
        return;
    }

    for(const [key, value] of Object.entries(LEAGUE_TABLE_URLS)) {
        try {
            const {data} = await axios.get(value);
            const $ = cheerio.load(data);
            const table = $("table#stats_squads_standard_for th[data-stat='squad'] a");

            footballteams.leagues[key] = {};

            table.each((index, ele) => {
                footballteams.leagues[key][$(ele).text()] = BASE_URL + $(ele).attr("href");
            });
        } catch(err) {
            console.error(err);
        }
    }
}


footballscores.get = async function(config) {
    await getFootballTeams();

    return await getFootballScores(config);
}

module.exports = footballscores;