/**
 *
 * @description checks visible initialized elements on screen and animates
 * exports to index.js which is exported to main.js
 *
 */

import $ from 'jquery';
// import visible from 'visible-element';

const animation = {

    init() {
      
      /*
       * @desc initialize all variables and event handlers 
       * 
      */
     
      this.heightMap = [];
     
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {

        this.firefox();

      } else {
        this.targetElements();
        this.mapTargetElements();
        this.setStaggeredAnimations();
        this.events(); 
      }

      console.log(this.heightMap);
      
    },

    firefox() {

        /*
         * @desc temp fix for live firefox issue
         * 
        */
       
        const array = $('.banner-thumbnail-wrapper, .promoted-gallery-wrapper, .sqs-block, .sqs-col-4, .sqs-col-6').toArray();

        $.each(array, (i, item) => {
          $(item).addClass("is-visible");
        });
    },

    increment(num, value) {
      num += value;
      return num;
    },
    
    timeline(array, offset) {

      /*
       * @desc method to define an offset value for 
       * staggered animations. Injects into data
       * attribute from defined arrays
       * 
      */
      
      const num = 0; //increment value by offset variable
          
      //iterate through array and apply offset to data attribue of each element
      $.each(array, (i, item) => {

        offset = this.increment(num, offset);
        offset += 0.15;

        $(item).attr('data-offset-value', offset).css({
          'animation-delay': offset + 's'
        });

      });

    },

    mapTargetElements() {

       /*
       * @desc map out each target element and get
       * the distance from the height of the document
       * and store in a mapped array
       * 
      */
          
      $.each(this.targetElements, (i, item) => {
        const distance = this.distanceDocumentTop(item);

        item.distanceFromTop = distance;

        this.heightMap.push(item);
      });
    },

    distanceDocumentTop(element) {

        /*
         * @desc get the distance from the top
         * of the document
         * 
        */
       
        const distance = $(element).offset();

        return distance.top;
    },

    distanceWindowTop(el) {

      /*
       * @desc get the distance from the top
       * of the current window
       * 
      */
     
      const top = Math.floor( $(el).offset().top - $('body').scrollTop() );

      return top;
    },
    
    targetElements() {

      /*
       * @desc define and identify target elements to add class 
       * for triggering CSS animations
       * 
      */
      
      this.targetElements = $('.banner-thumbnail-wrapper, .promoted-gallery-wrapper, .sqs-block, .sqs-col-4, .sqs-col-6');
      
      $.each(this.targetElements, (i, item) => {
          $(item).addClass('is-initialized');
      });
    

    },

    setStaggeredAnimations() {

      /*
       * @desc find elements within rows and stagger certain
       * responsive columns with animation delay
       * 
      */
     
      const blocks = $('.sqs-row');
      
      $.each(blocks, (i, item) => {
        //find col-6 elements
        const six = $(item).find('.sqs-col-6').toArray();

        if (six.length > 0) {
          this.timeline(six, 0);
        }

        //find col-4 elements
        const four = $(item).find('.sqs-col-4').toArray();

        if (four.length > 0) {
          this.timeline(four, 0);
        }

      });
    },

    visible(item) {

      /*
       * @desc check the distance from an element
       * and add animate class when in viewport
       * 
      */
     
      const distance = Math.floor( this.distanceWindowTop(item) );

      let height = Math.floor( $(window).height() );

      height *= 0.9;

      if (distance < height) {
          /* add visible class */
          $(item).addClass('is-visible');
      }
    },

    round5(x) {
      return Math.ceil( x / 5 ) * 5;
    },

    events() {

      /*
       * @desc initial class setting for elements already
       * visible on page load 
       * 
      */
     
      $.each(this.targetElements, (i, item) => {
         this.visible(item);
      });
      
      /* when scrolling look for elements with
      is-initialized class and apply animate class
      when in viewport */

      $(window).on('scroll', () => {
        $.each(this.heightMap, (i, item) => {

          // let height = $('body').scrollTop();

          // height += window.innerHeight / 2;
          // const itemHeight = item.distanceFromTop;

          // if (height === itemHeight) {
          //   console.log(item);         
          // }

          const visible = $(item).hasClass('is-visible');

          if (visible === false) {
            this.visible(item); /* add visible class */               
          }
      
        });
      });       
    }
};

export default animation;