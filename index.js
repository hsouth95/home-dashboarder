const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const fs = require("fs");
const plugins = require("./src/plugins/plugins.js");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/plugins", async (req, res) => {
    if(Object.keys(req.query).length === 0) {
        // If no plugin query then we return the full list of plugins available
        console.log("Showing all plugins");
        res.json(Object.keys(plugins));
    } else if (req.query.plugin) {
        if(plugins[req.query.plugin]) {
            console.log("Returning plugin " + req.query.plugin + " data");
            res.send(await plugins[req.query.plugin].get());
        } else {
            console.log("Couldn't find plugin");
            res.send("No plugin of name: " + req.query.plugin);
        }
    } else {
        console.log("No accepted query param");
        // Not an accepted query param
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