let bots = [{name:"r2d2",host:"localhost:4000"}];

function add (bot) {
    console.log("add bot",bot)
    if(bot) {
        bots.push(bot);  
    }
 
}

function show () {
    return bots;
}
module.exports.add = add;
module.exports.show = show;
