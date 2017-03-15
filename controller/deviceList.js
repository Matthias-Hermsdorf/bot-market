let devices = [{name:"r2d2",host:"http://localhost:4000", type:"car"}];

function add (device) {
    console.log("add device",device)
    if(device) {
        devices.push(device);  
    }
}

function remove (socketId) {
    console.log("remove device",socketId)
    //devices.push(device);
    devices.map(function(item){
        console.log("item",item)
        if (item.socketId == socketId) {
            item.active = false;
        }
    });
    
}

function show () {
    return devices;
}
module.exports.add = add;
module.exports.remove = remove;
module.exports.show = show;
