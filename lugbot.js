const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()
const rp = require('request-promise');
const $ = require('cheerio');

let datastore = {
    day: {}
}

let commands = {
    'ping': function (msg) {
        msg.reply("pong");
    },
    'day': function (msg) {
        var datetime = new Date();
        let today = datetime.toISOString().slice(0, 10);

        if(datastore.day[today]){
            console.log('Already checked today. Returning cached value');
            msg.reply(datastore.day[today]);
            return;
        }

        let options = {
            url: 'https://temadagar.se/',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'
            }
        }
        rp(options).then((html) => {
            console.log('Parsing html');
            //console.log(html);
            let elements = $('#content center a', html);
            console.log('Found ' + elements.length + ' days today');

            if (!elements || elements.length === 0) {
                msg.reply("Idag är en helt vanlig dag");
            }

            let days = 'Idag är det ';

            for (let i = 0; i < elements.length; i++) {

                days += $(elements[i]).text();
                if (i != elements.length - 1) {
                    days += " och ";
                }
            }
            console.log('Saving days in cache');
            datastore.day[today] = days;

            console.log('Replying');
            msg.reply(days);

        }).catch((err) => {
            console.log(err.message);
        });
    },
}


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.charAt(0) === '!') {
        console.log('this is a command');

        let command = msg.content.substring(1);
        console.log('Checking if command: ' + command + 'exists');

        if (commands[command]) {
            console.log('Bingo!');
            commands[command](msg);
        } else {
            console.log('Could not find command ' + command);
        }

    }
});



client.login(process.env.DISCORD_BOT_TOKEN);