const Plugin = require('./Plugin.js');
const random = require('random')
const rp = require('request-promise');
const $ = require('cheerio');
var app = null;

class Day extends Plugin{
    name = "Day";
    datastore = {
        day: {}
    }

    commands = {
        'day': function (msg) {
            var datetime = new Date();
            let today = datetime.toISOString().slice(0, 10);
    
            if(app.datastore.day[today]){
                console.log('Already checked today. Returning cached value');
                msg.reply(app.datastore.day[today]);
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
                    return;
                }
    
                let days = 'Idag är det ';
    
                for (let i = 0; i < elements.length; i++) {
    
                    days += $(elements[i]).text();
    
                    if (i != elements.length - 1) {
                        days += " och ";
                    }
                }
    
                console.log('Saving days in cache');
                app.datastore.day[today] = days;
    
                console.log('Replying');
                msg.reply(days);
    
            }).catch((err) => {
                console.log(err.message);
            });
        },
        
    }


    init(){
        super.init()
        app = this;
    }
}
module.exports = Day;
