import React, {Component} from 'react';
import Dashboard from "./Dashboard";

import jsonData from "../data/dashboard.json";


class Dashboards extends Component {
    constructor(props){
        super(props);
        this.state = {
            dashboards: jsonData.dashboards
        };
    }

    render(){
        return (
        <div id="dashboards">
            {this.state.dashboards.map(dashboard => (
                <Dashboard {...dashboard} />
            ))}
        </div>
        );
    }
}

export default Dashboards;