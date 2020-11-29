var app = null;

class Plugin{
    name = "Generic plugin";
    
    pluginManager = null;
    

    help = {}

    commands = {
        'help' :function(message, params){
           if(params.length === 1){
               
               let command = params[0];
               console.log("Asking for help for a single command: " + command);
               if(app.pluginManager.hasCommand(command)){
                   let plugin = app.pluginManager.getPluginForCommand(command);
                    
                   message.reply(plugin.getHelpForCommand(command));

               }
           } else {
                var helpresponse = {embed: {
                    color: 3447003,
                    title: "Kommandon:",
                    fields: []
                  }
                }
                app.pluginManager.getCommands().forEach((c) => {
                    if(c === "help"){
                        return;
                    }
                    var plugin = app.pluginManager.getPluginForCommand(c);
                    if(plugin.getHelpForCommand(c)){
                        let helptext = plugin.getHelpForCommand(c);
                        console.log("!" + c + " is " + helptext);
                       helpresponse.embed.fields.push(
                            {
                                name: "!" + c,
                                value: helptext,
                                inline: false
                            }
                        )
                    }
               })
               console.log("Done with help command. Sending data");
               
               message.channel.send(helpresponse);
           }
        },
        'contribute': function(message, params){
            message.channel.send("Contribute @ https://github.com/larsemil/tentakelbot");
        }
    }


    init(){
        app = this;
        console.log("Initializing " + this.name)
    }
    
    setPluginManager(PluginManager){
        this.pluginManager = PluginManager;
    }

    getCommands(){
        return Object.keys(this.commands);
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

    getHelpForCommand(command){
        //console.log("Checking help for  command: " + command);
        var helpmessage = this.help[command] || "";
        return helpmessage;
    }

}
module.exports = Plugin;
