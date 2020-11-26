const Plugin = require('./Plugin.js');
const random = require('random')
var app = null;

class Joker extends Plugin{
    name = "Joker";


    jokes =  {
        'dadJokes': [
            ['Vad heter Finlands värsta cyklist?', 'Inihallonen'],
            ['Varför är det farligt att rensa fisk?', 'Man kan gå vilse bland fjällen'],
            ['Vad säger mexikanerna när de får tacos under ledigheten?', 'Tackolåv'],
            ['Varför grät den tyska skruven?', 'Den saknar sin mutter'],
            ['Vad kallar man en överviktig elektriker?', 'Kanelbulle.'],
            ['Vilken svensk artist äter mest Gorbys?', 'Piroger Pontare'],
            ['Vad är Sandra Bullocks syster väldigt trött på att bli kallad?', 'Andra Bullock'],
            ['Hur säger man korridor på japanska?', 'Lång-trång-gång'],
            ['Har du tagit en promenad?', 'Hurså? Saknas det en?'],
            ['Vad kallar man en alligator som ätit upp en GPS?', 'Navigator'],
            ['När jag åker utomlands tar jag alltid med strumpor med hål i.', 'Jag hoppas att de ska bli stoppade i tullen']
        ]
    };

    commands = {
        'dadjoke' :function(message, params){
            var joke = app.jokes.dadJokes[random.int(0, app.jokes.dadJokes.length -1)];
            message.channel.send(joke[0]);
            setTimeout(function (message,joke) {
                message.channel.send(joke[1])
            }, 2000,message,joke)
        }
    }


    init(){
        super.init()
        app = this;
    }
}
module.exports = Joker;
