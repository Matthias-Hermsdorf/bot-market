let devices = [{name:"r2d2",host:"localhost:4000", type:"car"}];

function add (device) {
    console.log("add device",device)
    if(device) {
        devices.push(device);  
    }
 
}

function show () {
    return devices;
}
module.exports.add = add;
module.exports.show = show;
