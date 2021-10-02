import React, { useEffect } from "react";

import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';
import 'gridstack/dist/gridstack-h5.js';
import './edit.css';

class EditPage extends React.Component {

    componentDidMount() {
        this.grid = GridStack.init({
            minRow: 1,
            cellHeight: "70px"
        });

        this.grid.addWidget({
            x: 0,
            y: 0,
            h: 1,
            w: 2,
            id: 0
        });

        this.grid.addWidget({
            x: 1, y: 0, id: 1
        });
    }

    render() {
        return (
            <div className="Edit">
                <div class="grid-stack">
                </div>
            </div>
        );
    }
}

export default EditPage;
