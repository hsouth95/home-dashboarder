import React, {Component} from 'react';


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

    render(){
        return (
            <div id="dashboard" height={this.state.height} width={this.state.width}>
                <h1>{this.state.name}</h1>
            </div>
        );
    }
}

export default Dashboard;