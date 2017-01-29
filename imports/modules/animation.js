/**
 *
 * @public
 * @namespace animation
 * @description checks visible initialized elements on screen and animates
 *
 */

import $ from 'jquery';

  const animation = {

    init() {
      this.targetElements(); /* define target elements*/
      this.events(); /* bind scroll event handlers */

    },
    
    timeline(array, offset) {
      
      /* method to define an offset value for 
      staggered animations. Injects into data
      attribute from defined arrays */

      /* increment value by offset variable */
      let n = 0;

      function increment(value) {
          n += value;
          return n;
      }     
           
      /* iterate through array and apply offset 
      to data attribue of each element */  
      $.each(array, (i, item) => {

        offset = increment(offset);
        offset = offset * 0.30;

        $(item).attr('data-offset-value', offset).css('animation-delay', offset + 's');

      });

    },

    distanceFromTop(el) {

      /* get the distance from the target 
         elements to the top of the viewport */

      return $(el).offset().top - $('body').scrollTop();
    },
    
    targetElements() {

      /* define and identify target elements to add class 
      for triggering CSS animations*/
      
      this.targetElements = $('.banner-thumbnail-wrapper, .promoted-gallery-wrapper, .sqs-block, .sqs-col-4, .sqs-col-6');
      
      $.each(this.targetElements, (i, item) => {
        
          /* add class to target animation */ 
          $(item).addClass('will-be-visible');       
      });
      
      /*defining staggered animation elemenets */
      
      this.timeline($('.sqs-col-4'), 1);
      this.timeline($('.sqs-col-6'), 1.5);
    },

    visible(item) {

      /* check the distance from an element
      and add animate class when in viewport */

      const distance = this.distanceFromTop(item);

      const height = $(window).height() * 0.9;
      
      if(distance < height) {

          /* add visible class */
          $(item).addClass('is-visible');          
      }       
    },

    events() {

      /* initial class setting for elements already
      visible on page load */

      $.each(this.targetElements, (i, item) => {
         this.visible(item);
      });
      
      /* when scrolling look for elements with
      is-initialized class and apply animate class
      when in viewport */

      $(window).on('scroll', (e) => {
        const top = $('body').scrollTop();
        
        $.each(this.targetElements, (i, item) => {
          this.visible(item); /* add visible class */         
        });
      });       
    }
};

export default animation;