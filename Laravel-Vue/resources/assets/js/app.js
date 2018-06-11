import Vue from 'vue';
import { populateAmenitiesAndPrices } from './helpers';

let model = JSON.parse(window.vuebnb_listing_model);

model = populateAmenitiesAndPrices(model);

// import sample from './data';

Vue.component('image-carousel', {
    template: `<div class='image-carousel'>
                <img :src='image'/>
                <div class='controls'>
                    <carousel-control dir='left' @change-image="changeImage"></carousel-control>
                    <carousel-control dir='right' @change-image="changeImage"></carousel-control>
                </div>
            </div>`,
    data () {
        return {
            images: [
                '/images/1/Image_1.jpg',
                '/images/1/Image_2.jpg',
                '/images/1/Image_3.jpg',
                '/images/1/Image_4.jpg'
            ],
            index: 1
        }
    },
    // props: ['images'],
    // data() {
    //     return {
    //         index: 0
    //     }
    // },
    components: { 'carousel-control' : {
        template: `<i :class='classes' @click='clicked'></i>`,
        props: ['dir'],
        computed: {
            classes(){
                return 'carousel-control fa fa-2x fa-chevron-' + this.dir;
            }
        },
        methods: {
            clicked() {
                this.$emit('change-image', this.dir === 'left' ? -1 : 1);
            }
        }
    }},
    methods: {
        changeImage(val) {
            let newVal = this.index + parseInt(val);
            if (newVal < 0) {
                this.index = this.images.length - 1;
            } else if (newVal === this.images.length) {
                this.index = 0;
            } else {
                this.index = newVal;
            }
        }
    },
    computed: { 
        image() {
            return this.images[this.index];
        }
    },
})


var app = new Vue({
    el: '#app',
    data: Object.assign ( model, {
        title: model.title,
        address: model.address,
        about: model.about,
        headerImageStyle:{
            'background-image': `url(${model.images[0]})`

        },
        amenities: model.amenities,
        prices: model.prices,
        contracted: true,
        modalOpen: false,
        message: "hello world"
    }),
    methods: {
        escapeKeyListener (evt) {
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
        // message: function (newVal, oldVal) {
        //     console.log(oldVal, ', ', newVal);
        // }   
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
