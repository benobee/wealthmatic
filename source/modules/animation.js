/**
 *
 * @description checks visible initialized elements on screen and animates
 * exports to index.js which is exported to main.js
 *
 */

import $ from 'jquery';

const animation = {

    init() {
      
      /*
       * @desc initialize all variables and event handlers 
       * 
      */
     
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {

        this.firefox();

      } else {
        this.targetElements();
        this.events();     
      }
      
    },

    firefox() {
        const array = $('.banner-thumbnail-wrapper, .promoted-gallery-wrapper, .sqs-block, .sqs-col-4, .sqs-col-6');

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

    distanceFromTop: function(el) {
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
          $(item).addClass('will-be-visible');
      });
      
      const blocks = $('.sqs-row');
      
      $.each(blocks, (i, item) => {
        const six = $(item).find('.sqs-col-6').toArray();

        const four = $(item).find('.sqs-col-4').toArray();
        
        this.staggerAnimation(six);
        this.staggerAnimation(four);

      });

    },

    staggerAnimation(array) {

      /*
       * @desc if array exists run through each element
       * to add staggered animation
       * 
      */
     
      if (array.length > 0) {
        this.timeline(array, 0);
      }

    },

    visible(item) {

      /*
       * @desc check the distance from an element
       * and add animate class when in viewport
       * 
      */
     
      const distance = Math.floor( this.distanceFromTop(item) );

      let height = Math.floor( $(window).height() );

      height *= 0.9;

      if (distance < height) {
          /* add visible class */
          $(item).addClass('is-visible');
      }    
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
        $.each(this.targetElements, (i, item) => {
          this.visible(item); /* add visible class */         
        });
      });       
    }
};

export default animation;