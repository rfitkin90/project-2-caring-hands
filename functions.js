'use strict';

$(function () {

    // configaration
    var width = 720;
    var animationSpeed = 1000;
    var pause = 3000;
    var currentSlide = 1;

    //cashe DOM
    var $slider = $('#slider');
    var $slideContainer = $slider.find('.slides');
    var $slides = $slideContainer.find('.slide');


 //setInterval
    var interval;

    function startSlider() {

//animate margin-left
        interval = setInterval(function () {
            $slideContainer.animate({ 'margin-left': '-=' + width }, animationSpeed, function () {
                currentSlide++;
                if (currentSlide === $slides.length) {


                    //if its last slide, go to posotion 1 (0px);
                    currentSlide = 1;
                    $slideContainer.css('margin-left', 0);
                }

            });
        }, pause);
    }

    function stopSlider() {
        clearInterval(interval);
    }

    // listen for mouseseenter and pauuse 
    // reusme on mouseleave

    $slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);

    startSlider();
});





