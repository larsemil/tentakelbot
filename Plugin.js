class Plugin{
    name = "Generic plugin";

    commands = {
        'help' :function(message){
            message.reply('I cannot help you. Yet.')
        },
        'contribute': function(message){
            message.channel.send("Contribute @ https://github.com/larsemil/lugbot");
        }
    }


    init(){
        console.log("Initializing " + this.name)
    }

    getCommands(){
        return this.commands;
    }

    run(command, message, params){
        if(command in this.commands){
            console.log("Running command " + command)
            this.commands[command](message, params);
            return true;
        }
        console.log("Could not run command " + command)
        return false;
    }

}
module.exports = Plugin;
