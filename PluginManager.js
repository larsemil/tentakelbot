const fs = require('fs')
const util = require('util')

class PluginManager{

    commands = {}

    constructor() {}

    register(plugin){
        plugin.init();
        var _commands = plugin.getCommands();
        Object.keys(_commands).forEach( (command) => {
            console.log('Plugin has ' + command)
            this.commands[command] = plugin;

        })

        console.log(util.inspect(this.commands, {showHidden: false, depth: null}))

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



}
module.exports = PluginManager
