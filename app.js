//const koa = require('koa');
const koa = require('koa.io');

const router = require('koa-router');
const koaStatic = require('koa-static');
const compress = require('koa-compress');
const cors = require('koa-cors');
const koaBody = require('koa-body');
const app = koa();

const pjson = require('./package.json');
const botList = require("./controller/botList");
const Pug = require('koa-pug');
const pug = new Pug({
  viewPath: './views',
  basedir: './views',
  app: app //Equivalent to app.use(pug)
});

const _ = router(); //Instantiate the router

app.use(cors());
app.use(compress());
app.use(koaBody());
app.use(koaStatic('public'));

app.use(_.routes()); //Use the routes defined using the router

// index//
_.get('/', function *showIndex(){
    this.render('index',{bots:botList.show()});
});

// neuen Bot anlegen
_.post('/bot', function* () {
    console.log("body",this.request.body)
    botList.add(this.request.body);
    app.io.broadcast.emit("bot-add",this.request.body)

});

// Liste von Bots zeigen
_.get('/bot', function *showBots() {
    this.body = botList.show();
});

// middleware for socket.io's connect and disconnect
app.io.use(function* (next) {
    // on connect
    console.log("connect socket");
    //console.log("connect socket this.broadcast.emit", this.broadcast.emit);
    this.emit("mssage",{msg:"neu client connected"})
    this.emit('bot-list', botList.show());
    yield* next;
    console.log("close socket");
    // on disconnect
});


app.io.route('bot-add', function* () {
    //console.log("socket add",this.data[0]); 
    console.log("socket add"); 
    botList.add(this.data[0])
    this.emit('bot-list', botList.show());


});


app.listen(pjson.port);

console.log(getTime()+" bot-market is running at :"+pjson.port);

function getTime () {
    const date = new Date();
    return "["+date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds()+"]";
}
