//const koa = require('koa');
const koa = require('koa.io');

const router = require('koa-router');
const koaStatic = require('koa-static');
const compress = require('koa-compress');
const cors = require('koa-cors');
const koaBody = require('koa-body');
const app = koa();

const pjson = require('./package.json');
const deviceList = require("./controller/deviceList");
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
    this.render('index');
});

// neuen Bot anlegen

// middleware for socket.io's connect and disconnect
app.io.use(function* (next) {
    // on connect
    console.log("connect socket",this.id);
    this.emit('device-list', deviceList.show());
    yield* next;
    this.emit('device-list', deviceList.show());
    console.log("close socket");
    // on disconnect
    deviceList.remove({socketId:this.id})
});


app.io.route('device-add', function* () {
    //console.log("socket add",this.data[0]); 
    console.log("socket add", this.id); 
    this.data[0].socketId = this.id;
    deviceList.add(this.data[0])
    this.emit('device-list', deviceList.show());
});


app.listen(pjson.port);

console.log(getTime()+" bot-market is running at :"+pjson.port);

function getTime () {
    const date = new Date();
    return "["+date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds()+"]";
}
