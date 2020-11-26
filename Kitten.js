const Plugin = require('./Plugin.js');
const Discord = require('discord.js');
class Kitten extends Plugin{
    name = "Place that kitten";

    commands = {
        'kitten' :function(message, params){
            var size = 200;
            if(params.length >= 2){
                size = params[1]
            }
            var attachment = new Discord.MessageAttachment('http://placekitten.com/' + size ,'kitten.jpg')
            message.reply(attachment);
        }
    }


}
module.exports = Kitten;
