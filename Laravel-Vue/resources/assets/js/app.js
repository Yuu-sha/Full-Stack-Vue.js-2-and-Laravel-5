import "core-js/fn/object/assign";
import Vue from 'vue';

import ListingPage from '../components/ListingPage.vue';



var app = new Vue({
    el: '#app',
    render: h => h(ListingPage),
});

document.addEventListener('keyup', function(evt){
    if (evt.keyCode === 27 && app.modalOpen){
        app.modalOpen = false;
    }
});

function escapeKeyListener(evt) {
    if (evt.keyCode === 27 && app.modalOpen) {
      app.modalOpen = false;
    }
  }