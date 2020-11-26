const Plugin = require('./Plugin.js')

class Agree extends Plugin{
    name = "Agree";

    commands = {
        'agree' :function(message, params){
            message.reply("Jag håller helt med!")
        }
    }

}
module.exports = Agree;
