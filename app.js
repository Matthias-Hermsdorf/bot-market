const koa = require('koa');
const app = koa();
const router = require('koa-router');
const static = require('koa-static');
const compress = require('koa-compress');
const cors = require('koa-cors');
const koaBody = require('koa-body');

var pjson = require('./package.json');
const botList = require("./controller/botList");
const Pug = require('koa-pug');
const pug = new Pug({
  viewPath: './views',
  basedir: './views',
  app: app //Equivalent to app.use(pug)
});

const _ = router(); //Instantiate the router

app.use(cors());
app.use(koaBody());
app.use(_.routes()); //Use the routes defined using the router

// index//
_.get('/', function *showIndex(){
    this.render('index',{bots:botList.show()});
});

// neuen Bot anlegen
_.post('/bot', function* () {
    console.log("body",this.request.body)
    botList.add(this.request.body);

});

// Liste von Bots zeigen
_.get('/bot', function *showBots() {
    this.body = botList.show();
});




app.use(static('public'));
app.listen(pjson.port);

// Compress
app.use(compress());

console.log(getTime()+" server running at :"+pjson.port);

function getTime () {

    const date = new Date();
    return "["+date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds()+"]";
}
