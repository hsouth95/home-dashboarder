import React, {Component} from 'react';

import getPluginData from '../utils.js';

class FootballScoresElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: null,
            homeScore: null,
            awayTeam: null,
            awayScore: null
        };
    }

    async componentDidMount() {
        let data = await getPluginData("footballscores", this.props.config);
        this.setState({
            team: this.props.config,
            homeScore: data.homeScore,
            awayScore: data.awayScore,
            awayTeam: data.awayTeam
        });
    }

    render() {
        if(this.state.team === null) {
            return (
                <h1>Loading...</h1>
            );
        }

        return (
            <div>
                <span>{this.state.team}</span><br />
                <span>{this.state.homeScore}</span><br />
                <span>vs.</span>
                <span>{this.state.awayTeam}</span><br />
                <span>{this.state.awayScore}</span>
            </div>
        )
    }
}

export default FootballScoresElement;