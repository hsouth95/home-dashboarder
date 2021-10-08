const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const fs = require("fs");
const plugins = require("./src/plugins/plugins.js");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/plugins", (req, res) => {
    // Add query command for plugin 
    // Add endpoint on module for getting data

    if(Object.keys(req.query).length === 0) {
        // If no plugin query then we return the full list of plugins available
        res.json(Object.keys(plugins));
    } else if (req.query.plugin) {
        if(plugins[req.query.plugin]) {
            res.send(plugins[req.query.plugin].get());
        } else {
            res.send("No plugin of name: " + req.query.plugin);
        }
    }
});

app.get("/dashboards", (req, res) => {
    fs.readFile("./data/dashboards.json", (err, data) => {
        if(data) {
            let dashboards = JSON.parse(data);
            res.json(dashboards);
        } else {
            res.status(500);
        }
    });
});

app.put("/dashboards", async (req, res) => {
    const data = await fs.readFile("./data/dashboards.json");
    oldData = JSON.parse(data);

    console.log(oldData);

    console.log(req.body);

    res.status(200);
});