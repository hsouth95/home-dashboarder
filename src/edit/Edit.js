import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';

import './edit.css';
import jsonData from "../data/dashboard.json";

const ReactGridLayout = WidthProvider(RGL);

class EditPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {layout: []}
    }

    componentDidMount() {
        if(jsonData && jsonData.dashboards) {
            let keys = [];
            for(let dashboard of jsonData.dashboards) {
                let gridDashboard = {
                    i: dashboard.name,
                    x: dashboard.x,
                    y: dashboard.y,
                    w: dashboard.width,
                    h: dashboard.height
                };

                keys.push(gridDashboard);
            }
            
            this.setState({layout: keys});
        }
    }

    generateKeys() {
        if (this.state.layout && this.state.layout.length > 0) {
            return this.state.layout.map((item) => {
                return (
                    <div key={item.i}>
                        <span className="text">{item.i}</span>
                    </div>
                );
            });
        }
    }

    onLayoutChange(layout) {
        this.setState({layout});
    }

    saveDashboard() {
        
    }

    render() {
        if(this.state.layout.length === 0) {
            return (
                <h1>Loading</h1>
            )
        }

        return (
            <div className="Edit">
                <button onClick={this.saveDashboard}>Save</button>
                <ReactGridLayout className="layout" layout={this.state.layout} onLayoutChange={this.onLayoutChange} cols={3}>
                    {this.generateKeys()}
                </ReactGridLayout>
            </div>
        );
    }
}

export default EditPage;
