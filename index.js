const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const fs = require("fs");

app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

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

app.post("/dashboards", (req, res) => {
    console.log(JSON.parse(req.body));
    res.status(200);
});