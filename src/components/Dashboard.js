import React, {Component} from 'react';
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
        return (
            <div className={`db db-h${this.state.height} db-w${this.state.width}`}>
                <h1>{this.state.name}</h1>
            </div>
        );
    }
}

export default Dashboard;