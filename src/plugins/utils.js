export default async function getPluginData(pluginName, config) {
    const pluginEndpoint = "/plugins";
    const pluginParam = "?plugin=" + pluginName;
    const configParam = "&config=" + config;

    let url = pluginEndpoint + pluginParam;
    if(config) {
        url = url + configParam;
    }

    const response = await fetch(url);
    const data = await response.json();

    return data;
}