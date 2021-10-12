import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';

import PluginSelector from './PluginSelector';

import './edit.css';

const ReactGridLayout = WidthProvider(RGL);

class EditPage extends React.Component {

    // Keep a track of all attributes that may change due to edits
    visualAttributes = [
        "height",
        "width",
        "x",
        "y"
    ];


    constructor(props){
        super(props);
        this.cachedDashboards = {};
        this.state = {layout: []};

        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.saveDashboard = this.saveDashboard.bind(this);
    }

    async componentDidMount() {
        const response = await fetch("/dashboards");
        const data = await response.json();

        if(data && data.dashboards) {
            this.cachedDashboards = data;

            let keys = [];
            for(let dashboard of data.dashboards) {
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
        console.log(this.state.layout);
        console.log(layout);
        this.setState({layout});
    }

    async saveDashboard() {
        let isChanges = false;

        for (let dashboard of this.cachedDashboards.dashboards) {
            let updatedDashboard = this.state.layout.find(x => x.i === dashboard.name);

            if(updatedDashboard.h !== dashboard.height) {
                dashboard.height = updatedDashboard.h;
                isChanges = true;
            }

            if(updatedDashboard.w !== dashboard.width) {
                dashboard.width = updatedDashboard.w;
                isChanges = true;
            }

            if(updatedDashboard.x !== dashboard.x) {
                dashboard.x = updatedDashboard.x;
                isChanges = true;
            }

            if(updatedDashboard.y !== dashboard.y) {
                dashboard.y = updatedDashboard.y;
                isChanges = true;
            }
        }

        if(isChanges) {
            const req = await fetch("/dashboards", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(this.cachedDashboards)
            });
            const res = await req.json();
        }

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
                <PluginSelector />
                <ReactGridLayout className="layout" layout={this.state.layout} onLayoutChange={this.onLayoutChange}
                cols={3}>
                    {this.generateKeys()}
                </ReactGridLayout>
            </div>
        );
    }
}

export default EditPage;
