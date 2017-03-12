let socket = io(location.host);

/*
$(document).on("visibilitychange", function () {
    console.log("visibilitychange", document.hidden);
    if (document.visibilityState != "visible") {
        socket.close();
    } else {
        socket = io(location.host);
    }
});
*/
socket.on('disconnect close', function () {
    console.log("disconnect");
   // $(window).trigger({type: "connection-lost"})
});

socket.on('device-add', function () {
    //$(window).trigger({type:"connection-found"})
    console.log("socket device-add");
});

socket.on('device-list', function (e) {
    //$(window).trigger({type:"connection-found"})
    console.log("socket device-list",e);
    devices.deviceList=e;
});

/*
$(window).on("connection-lost", function () {
    console.log("on disconnect");
});
$(window).on("connection-found", function () {
    console.log("on connect");
});
*/