
var bots = new Vue({
  el: '#bots',
  data: {
    message: 'Alle Bots hier',
    botList: []
  }
});

axios.get("/bot").then(function (response) {

  console.log("axios get /bot", response.data);
  bots.botList=response.data;
});