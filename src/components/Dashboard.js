import React, {Component} from 'react';
import * as Plugins from '../plugins';

import "./dashboard.css";


class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            height: props.height,
            width: props.width,
            data: props.data
        };
    }

    render() {
        let DashboardElement = Plugins.PLUGIN_MAP[this.props.plugin];
        return (
            <div className={`db db-h${this.state.height} db-w${this.state.width}`}>
                <DashboardElement {...this.props}/>
            </div>
        );
    }
}

export default Dashboard;