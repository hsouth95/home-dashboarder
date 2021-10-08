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
    res.send(plugins.helloworld.helloworld());
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