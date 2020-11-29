const fs = require('fs')
const util = require('util')

let app = null;

class PluginManager{

    commands = {}
    ticks = [];

    constructor() {}

    register(plugin){
        app = this;
        plugin.init();
        plugin.setPluginManager(this);
        plugin.getCommands().forEach( (command) => {
            console.log('Plugin has ' + command)
            this.commands[command] = plugin;

        })

        if (typeof plugin.tick === "function") { 
            console.log("Plugin has a tick method. Add it to it can be run every 5000ms");
            this.ticks.push({handler: plugin.tick});
        } else {
            console.log("No ticks found for plugin");
        }

       // console.log(util.inspect(this.commands, {showHidden: false, depth: null}))

    }
    getCommands(){
        return Object.keys(this.commands);
    }

    hasCommand(command){
        if(command in this.commands){
            return true;
        }

        return false;
    }

    runCommand(command, message, params){
        try {
            return this.commands[command].run(command, message, params)
        } catch (err) {
            console.log(err)
        }
    }

    getPluginForCommand(command){
        return this.commands[command] || null;
    }

    tick(client){
              
        app.ticks.forEach((methodTorun) => {
            methodTorun.handler(client);
        });
    }



}
module.exports = PluginManager
