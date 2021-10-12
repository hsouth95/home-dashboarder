import React, {Component} from 'react';


class PluginSelector extends Component {
    constructor(props){
        super(props);
        this.state = {
            plugins: []
        };
    }

    async componentDidMount() {
        const request = await fetch("/plugins");
        const data = await request.json();

        if(data) {
            this.setState({
                plugins: data
            });
        }
    }

    render() {
        return (
            <div className="plugin-manager">
                <h2>Plugins</h2>
                <ul>
                {this.state.plugins.map((plugin) =>
                    <li>{plugin}</li>
                )}
                </ul>
            </div>
        );
    }
}

export default PluginSelector;