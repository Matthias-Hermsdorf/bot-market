Vue.component('device-link', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ['device'],
  template: '<li><a target="_blank" v-bind:href="device.host">{{ device.name }} ({{ device.type }})</a> active:{{ device.active }}</li>'
})

var devices = new Vue({
  el: '#devices',
  data: {
    message: 'Alle Geräte hier',
    deviceList: []
  }
});