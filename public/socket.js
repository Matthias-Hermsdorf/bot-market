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

socket.on('bot-add', function () {
    //$(window).trigger({type:"connection-found"})
    console.log("socket bot-add");
});

socket.on('bot-list', function (e) {
    //$(window).trigger({type:"connection-found"})
    console.log("socket bot-list",e);
    bots.botList=e;
});

/*
$(window).on("connection-lost", function () {
    console.log("on disconnect");
});
$(window).on("connection-found", function () {
    console.log("on connect");
});
*/