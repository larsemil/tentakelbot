require('dotenv').config()

console.log("Welcome to Rolf. Your interactive bot");

const Discord = require('discord.js')
const client = new Discord.Client();
const PluginManager = require('./PluginManager.js');

/* Plugins */
const GenericPlugin = require('./Plugin.js');
const KittenPlugin = require('./Kitten.js');
const StringFunPlugin = require('./StringFun.js');
const Joker = require('./Joker.js');
const Agree = require('./Agree.js');
const Day = require('./Day.js');

var plugins = new PluginManager();
plugins.register(new GenericPlugin());
plugins.register(new KittenPlugin());
plugins.register(new StringFunPlugin());
plugins.register(new Joker());
plugins.register(new Agree());
plugins.register(new Day());

client.on('ready', () => {
    console.log('I am logged in!');
});

client.on('message', msg => {
    console.log('got message');
    if(msg.cleanContent.startsWith("!")){
        var params = msg.cleanContent.split(" ");
        var command = params[0].substring(1);
        console.log("Got command " + command);
        
        if(plugins.hasCommand(command)){
            console.log("There is a plugin to handle this");

            plugins.runCommand(command, msg, params);
        } else {
            console.log("Could not find any plugin to handle. Sleeping.");
        }
    }
} );

client.login(process.env.DISCORD_BOT_TOKEN)
