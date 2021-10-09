const helloworld = require("./helloworld/helloworld");
const footballscores = require("./footballscores/footballscores");

const plugins = {
    "helloworld": helloworld,
    "footballscores": footballscores
};

module.exports = plugins;