const Plugin = require('./Plugin.js');
const fs = require('fs');

var app = null;

class GameNight extends Plugin{
    name = "GameNight";

    gameNights = []

    

    help = {
        'gamenight': 'För att skapa ett speltillfälle skriv: !gamenight Wingspan 2020-12-12 20:00 usernameFördenSomHostar 5, där sista 5 är antalet spelare(frivilligt)',
        'attend': 'För att delta i ett speltillfälle skriv: !attend n, där n är det spel du vill vara med på.',
        'listgames': 'Lista alla kommande speltillfällen',
        'gameinfo': 'För att få detaljerad info om ett speltillfälle skriv: !gameinfo n, där n är det spel du vill ha information om'
    }

    commands = {
        'gamenight' :function(message, params){
            if(params.length < 3 ){
                message.reply(app.help.gamenight);
                return;
            }
            let name = message.author.username;
            let gamenight = {
                'game': params[0],
                'date': params[1],
                'time': params[2],
                'maxplayers': params[4] || 999,
                'attendees': [],
                'reminded' : null,
                'channel': message.channel.id,
                'host': params[3]

            }
            let gameId = app.gameNights.push(gamenight) -1;
            console.log('Created a gamenight with id ' + gameId);
            console.log(gamenight);

            gamenight.attendees.push(params[3]);
            console.log(gameNight.attendees);

            let reply = `@here ${name} vill spela spel!`;
            message.channel.send(reply);
            message.channel.send(app.gameNightTomMessage(gamenight));
            message.channel.send("skriv !attend" + gameId +" för att vara med")

            app.save();
            
        },
        'attend' : function(message, params){
            
            if(params.length != 1){
                message.reply(app.help.attend);
                return;
            }

            console.log("Attempting to join GameId: " + params[0]);
            
            let gameNight = app.gameNights[params[0]];
            
            if(!gameNight){
                console.log('Found no gamenight with id ' + params[0]);
                message.reply("Hittade ingen spelkväll med det idt. ");
            }
            
            if(gameNight.attendees.includes(message.author.username)){
                console.log("Already attending. n00b");
                message.reply("Du är ju redan anmäld till den här kvällen");
                return;
            }
            if(gameNight.attendees.length === gameNight.maxplayers){
                console.log("Its full!");
                message.reply("Den spelkvällen är tyvärr redan full");
                return;
            }
            gameNight.attendees.push(message.author.username);
            console.log(gameNight.attendees);
            message.reply("Kul att du ska vara med och spela " + gameNight.game + ", vi ses " + gameNight.date +", kl " + gameNight.time);
            message.reply("Nu finns det" + app.spotsLeft(gameNight) + " platser kvar")
            app.save();
        },
        'listgames': function(message, params){
            
            message.channel.send("Kommande spelkvällar:")

            app.gameNights.forEach((gn,id) => {
                if(gn.date > new Date().toISOString().split('T')[0]){
                    
                    message.channel.send(app.gameNightTomMessage(gn));
                }
            });

            message.channel.send("Skriv !attend ID, för att vara med på en kväll");

            
        },
        'gameinfo': function(message, params){
            
            if(params.length != 1){
                message.reply(app.help.attend);
                return;
            }

            console.log("Attempting to get GameInfo about ID" + params[0]);

            let gameNight = app.gameNights[params[0]];

            message.channel.send("Information om :")
            message.channel.send(app.gameNightTomDetailMessage(gameNight));
         
        }


    }


    init(){
        super.init()
        app = this;
        let gameNightData = null;
        fs.readFile('gameNightData.json','utf8',(err,data) => {
            if(err && err.errno === -2){
                console.log(err);
                return;
            } 
            console.log("Loaded data from file");
            gameNightData = JSON.parse(data);
            this.gameNights = gameNightData;
        })
        
    }
    gameNightTomMessage(gn){
        return {embed: {
            color: 3447003,
            title: gn.game + " ID: " + app.gameNights.indexOf(gn),
            fields: [
                { name: "Datum", value: gn.date, inline: false},
                { name: "Tid", value: gn.time, inline: false},
                { name: "Spelare", value: gn.attendees.length + "/" + gn.maxplayers, inline: false}
                
            ]
          }
        }
    }

    gameNightTomDetailMessage(gn){

        var detailresponse = {embed: {
            color: 3447003,
            title: gn.game + " ID: " + app.gameNights.indexOf(gn),
            fields: [
                { name: "Datum", value: gn.date, inline: false},
                { name: "Tid", value: gn.time, inline: false},
                { name: "Host", value: gn.host, inline: false},  
                { name: "Spelare", value: gn.attendees.length + "/" + gn.maxplayers, inline: false}
                
            ]

          }
        }

        if(gn.attendees.length > 0){
            gn.attendees.forEach((attendee) => {
                detailresponse.embed.fields.push(
                    {
                        name: attendee.username,
                        value: "", //Här kanske man kan lägga till random coola texter om varje spelare?
                        inline: false
                    }
                )
            })
        }

        return detailresponse;
    }

    tick(client){
        if(!Array.isArray(app.gameNights)){
            
            return;
        }
        
        app.gameNights.forEach((gn) => {
            if(gn.reminded){
                return;
            }

            let timeDifference = new Date(gn.date) - new Date();
            let days = timeDifference / (1000 * 60 * 60 * 24);
            //console.log(gn.game + " has " + days + "until playing");
            if(days < 1){
                console.log(gn.game + " has less than 1 day until playing. Reminding people!");

                let channel = client.channels.cache.get(gn.channel);
                //console.log(channel);
                

                var message = app.gameNightTomMessage(gn);
                channel.send("@here Snart dags för spel!");
                channel.send(message)
                gn.reminded = true;
                app.save();
            }
            
        });
    }

    save(){
        console.log("Saving data");
        let dataToSave = JSON.stringify(app.gameNights, 0, 4);
        fs.writeFile('gameNightData.json', dataToSave, function (err) {
            if (err) throw err;
            console.log('Saved file');
          });
    }

    spotsLeft(gn){
        return gn.maxplayers - gn.attendees.length;
    }
}
module.exports = GameNight;
