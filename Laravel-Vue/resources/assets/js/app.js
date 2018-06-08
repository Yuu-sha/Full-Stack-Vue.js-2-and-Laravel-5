import Vue from 'vue';
import sample from './data';

var app = new Vue({
    el: '#app',
    data: {
        title: sample.title,
        address: sample.address,
        about: sample.about,
        headerImageStyle:{
            'background-image': 'url(/images/header.jpg)'
        },
        amenities: sample.amenities,
        prices: sample.prices,
        contracted: true,
        modalOpen: false,
        message: "hello world"
    },
    methods: {
        escapeKeyListener: function (evt) {
            if (evt.keyCode === 27 && app.modalOpen) {
                app.modalOpen = false;
            }
        }
    },
    watch: {
        modalOpen: function(){
            var className = 'modal-open';
            if (this.modalOpen) {
                document.body.classList.add(className);
            } else {
                document.body.classList.remove(className);
            };
        },
        message: function (newVal, oldVal) {
            console.log(oldVal, ', ', newVal);
        }   
    },
    created: function () {
        document.addEventListener('keyup', escapeKeyListener);
    },
    destroyed: function () {
        document.removeEventListener('keyup', this.escapeKeyListener);
    }
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
  

setTimeout(function() {
    app.message = 'Goodbye world';
    // Output: "Hello world, Goodbye world";
  }, 2000);
