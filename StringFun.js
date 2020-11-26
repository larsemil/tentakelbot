const Plugin = require('./Plugin.js')

class StringFun extends Plugin{
    name = "StringFun";

    commands = {
        'reverse' :function(message, params){
            message.reply(message.cleanContent.split("").reverse().join(""))
        }
    }

}
module.exports = StringFun;
