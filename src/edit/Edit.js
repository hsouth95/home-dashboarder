import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';

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
        this.state = {layout: []}

        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.saveDashboard = this.saveDashboard.bind(this);
    }

    async componentDidMount() {
        const response = await fetch("/dashboards");
        const data = await response.json();

        if(data && data.dashboards) {
            this.cachedDashboards = data.dashboards;

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
        for (let dashboard of this.cachedDashboards) {
            let updatedDashboard = this.state.layout.find(x => x.id === dashboard.id);

            for (let attr of this.visualAttributes){
                if (updatedDashboard[attr] !== dashboard[attr]) {
                    dashboard[attr] = updatedDashboard[attr];
                    isChanges = true;
                }
            }
        }

        if(isChanges) {
            const req = await fetch("/dashboards", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(this.cachedDashboards)
            });
            //const res = await req.json();
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
                <ReactGridLayout className="layout" layout={this.state.layout} onLayoutChange={this.onLayoutChange} cols={3}>
                    {this.generateKeys()}
                </ReactGridLayout>
            </div>
        );
    }
}

export default EditPage;
