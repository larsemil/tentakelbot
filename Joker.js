const Plugin = require('./Plugin.js');
const random = require('random')
var app = null;

class Joker extends Plugin{
    name = "Joker";

    help = {
        'dadjoke' : 'För att skämta lite',
        'otterjoke': 'Utterskt bra skämt'
    }

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
            ['När jag åker utomlands tar jag alltid med strumpor med hål i.', 'Jag hoppas att de ska bli stoppade i tullen'],
            ['Hur många bor det i Kanadas huvudstad?', 'Åtta va?'],
            ['Håkan Juholt får skylla sig själv när han ljög. Han kunde Ju Holt sig till sanningen!'],
            ['Vet du varför mammutarna dog ut?', 'Nej?', 'Det fanns inga papputar']
        ],
        'otterJokes': [
            ['Var kommer uttrarna ifrån?', 'Uttre världsrymden.'],
            ['Var klär sig uttrarna i?','Utterrockar.'],
            ['Vilket språk talar uttrarna?','Uttrikiska.'],
            ['Hur lagar man till en utter?','Man låter den (p)uttra på svag värme.'],
            ['Vad äter uttrar?','Morutter.'],
            ['Vad gör en sur utter?','Han (m)uttrar.'],
            ['Vad gör uttrarna på upploppet?','De (sp)uttrar'],
            ['Vad heter en religiös utter?','(L)utter'],
            ['Vad gör en utelåst utter?','Han sitter utanför utterdörren och huttrar.']
            ['Hur gammal är uttern?','Det ska jag inte uttra mig om!']
        ]
    };

    commands = {
        'dadjoke' :function(message, params){
            var joke = app.jokes.dadJokes[random.int(0, app.jokes.dadJokes.length -1)];
            app.sendJoke(message, joke);
            
        },
        'otterjoke': function(message,params){
            var joke = app.jokes.otterJokes[random.int(0,app.jokes.otterJokes.length -1)];
            app.sendJoke(message, joke);
        }
    }


    init(){
        super.init()
        app = this;
    }
    sendJoke(message,joke){
        for(let i = 0; i < joke.length; i++){
            setTimeout(() => {
                message.channel.send(joke[i]);
            }, i*2000,message,joke);
        }
    }
}
module.exports = Joker;
