import HelloWorldElement from "./helloworld/HelloWorldElement";
import FootballScoresElement from "./footballscores/FootballScoresElement";



const PLUGIN_MAP = {
    "helloworld": HelloWorldElement,
    "footballscores": FootballScoresElement
};

export {
    HelloWorldElement,
    FootballScoresElement,
    PLUGIN_MAP
};