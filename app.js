const koa = require('koa');
const app = koa();
const router = require('koa-router');
const static = require('koa-static');
const compress = require('koa-compress');
var pjson = require('./package.json');
const addBot = require("./controller/addBot");
const Pug = require('koa-pug');
const pug = new Pug({
  viewPath: './views',
  basedir: './views',
  app: app //Equivalent to app.use(pug)
});

const _ = router(); //Instantiate the router

app.use(_.routes()); //Use the routes defined using the router

_.get('/', showIndex); // Define routes
_.post('/bot', addBot.add);
_.get('/bot', addBot.show);

function *showIndex(){
    this.render('index');
};


app.use(static('public'));
app.listen(pjson.port);

// Compress
app.use(compress());

console.log(getTime()+" server running at :"+pjson.port);

function getTime () {

    const date = new Date();
    return "["+date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds()+"]";
}
