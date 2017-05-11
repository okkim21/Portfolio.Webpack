$(document).ready(function(){
    const css = require('./crossfade.css');

    var controller,
        $navItem = $('.nav-items li').not('.active'),
        $navTrigger = $('.nav-trigger'),
        getTriggersDown = $('.slide-pos'),
        triggerDown =[],
        getTriggersUp = $('.slide-pos-reverse'),
        triggerUp =[],
        $slideIn = $('.slide.active'),
        $logo = $('.logo'),
        $main = $('main'),
        $body = $('body'),
        $slide = $('.slide'),
        $nav = $('nav'),
        $navContainer = $('.nav-container')
        ;

    // Trigers on the way down
    $.each(getTriggersDown, function(key, value){
        var id = '#' + value.id;
        triggerDown.push(id);
        console.log(triggerDown[key]);

    });

    // Trigers on the way up
    $.each(getTriggersUp, function(key, value){
        var id = '#' + value.id;
        triggerUp.push(id);
        console.log(triggerUp[key]);

    });

    enquire.register("screen and (min-width: 1025px)", {

        match: function(){
            initScrollMagic();
        },
        unmatch: function(){
            controller.destroy(true);
            $('*').removeAttr('style');

        }

    });

    function initScrollMagic (){

        controller = new ScrollMagic.Controller();

        // Scene1
        var pinScene01 = new ScrollMagic.Scene({
            triggerElement: 'main',
            triggerHook: 0,
            duration: '500%'
        })
            .setPin("main .pin-wrapper", {pushFollowers: false})
            .addTo(controller)

        var navTl =  new TimelineMax();

        // Move navi right by 26px for each item
        $navItem.each(function(){
            var slideHref = $(this).find('a').attr('href'),
                slideId = slideHref.substr(slideHref.length - 7),
                moveNav = TweenMax.to('.nav-active', 1, {x:'+=26', ease:Linear.easeNone});

            // Add individual tween to the timeline
            navTl.add(moveNav, slideId);
        });

        // Scene2
        var navScene = new ScrollMagic.Scene({
            triggerElement: $navTrigger,
            duration: '400%'
        })
        .setTween(navTl)
        .addTo(controller)

        // Scene3 - trigger the right animation on the way down
        triggerDown.forEach(function(triggerDown, index){
            var triggerTransitionToNex = new ScrollMagic.Scene({
                triggerElement: triggerDown,
                triggerHook: 0.6
            })
                .on('enter', function(e){
                    var $slideOut = $('.slide.active'),
                        slideIndex = triggerDown.substring(6,8),
                        $slideIn = $('#slide'+slideIndex),
                        direction = e.scrollDirection;

                    crossFade($slideOut, $slideIn, direction, slideIndex, slideIndex);
                })
                .addTo(controller)
        });

        // Scene4 - trigger the right animation on the way up
        triggerUp.forEach(function(triggerUp, index){
            var triggerTransitionToPre = new ScrollMagic.Scene({
                triggerElement: triggerUp,
                triggerHook: 0.49
            })
                .on('leave', function(e){
                    var $slideOut = $('.slide.active'),
                        slideIndex = triggerUp.substring(6,8),
                        $slideIn = $('#slide'+slideIndex),
                        direction = e.scrollDirection;

                    crossFade($slideOut, $slideIn, direction, slideIndex);
                })
                .addTo(controller)
        });

        function init(){

            setTimeout(function(){
                // Prevent body from flickering
                TweenMax.set($body, {autoAlpha: 1});
                animationIn($slideIn);
            }, 500);

        }

        init();

        function crossFade($slideOut, $slideIn, direction, slideIndex){
            var slideOutId = $slideOut.attr('id').substring(5,7),
                slideInId = $slideIn.attr('id').substring(5,7);

            // Slide out
            $slideOutBcg = $slideOut.find('.bcg-color'),
                $slideOutTitle = $slideOut.find('.title .fade-txt'),
                $slideOutPrimaryText = $slideOut.find('.primary-text'),

                // Slide in
                $slideInBcg = $slideIn.find('.bcg-color'),
                $slideInTitle = $slideIn.find('.title .fade-txt'),
                $slideInPrimaryText = $slideIn.find('.primary-text'),
                $slideInBcgWhite = $slideIn.find('.primary .bcg')

            // Update nav
            updateNav(slideOutId, slideInId);

            // Remove class active from all slides
            TweenMax.set($slide, {className: '-=active'});

            // Add class active
            TweenMax.set($('#slide'+slideIndex), {className: '+=active'});

            // Cross fade timeline
            var crossFadeTl = new TimelineMax();

            crossFadeTl
                .set($slideIn, {autoAlpha: 1})
                .set([$slideInTitle, $slideInPrimaryText, $slideInBcgWhite],{autoAlpha: 0})
                .to([$slideOutTitle,$slideOutPrimaryText], 0.6, {autoAlpha: 0, ease: Linear.easeNone})
                .set($main, {className: 'slide'+slideInId+'-active'})
                .add('countingUp')
                .to($slideInBcgWhite, 0.3, {autoAlpha: 1, ease:Linear.easeNone}, 'countingUp-=0.4')
                .staggerFromTo($slideInTitle, 0.3, {autoAlpha: 0, x: '-=20'}, {autoAlpha: 1, x: 0, ease:Power1.easeOut}, 0.1, 'countingUp+=1.1')
                .to($slideInPrimaryText,1.2, {autoAlpha: 1, ease: Linear.easeNone}, 'countingUp+=0.4');

            if (direction == 'FORWARD') {
                var tweenBcg = TweenMax.fromTo(
                    $slideInBcg, 0.5,
                    {autoAlpha: 0},
                    {
                        autoAlpha: 1,
                        ease:Linear.easeNone,
                        onComplete: hideOldSlide,
                        onCompleteParams: [$slideOut]
                    });

                crossFadeTl.add(tweenBcg, 'countingUp-=0.3');
            } else {
                var tweenBcg = TweenMax.to(
                    $slideOutBcg, 0.5,
                    {
                        autoAlpha: 0,
                        ease:Linear.easeNone,
                        onComplete: hideOldSlide,
                        onCompleteParams: [$slideOut]
                    });

                crossFadeTl.add(tweenBcg, 'countingUp-=0.3');
            }
        }

        function hideOldSlide($slideOut){
            TweenMax.set($slideOut, {autoAlpha: 0});
        }

        function updateNav(slideOutId, slideInId){
            // Remove active class from all dots
            $('.nav-items li').removeClass('active');

            //Add active class
            TweenMax.set($('.nav-items li.nav-item'+slideInId), {className: '+=active'});
        }

        function animationIn($slideIn){

            var $slidePrimaryText = $slideIn.find('.primary-text'),
                $slideTitle= $slideIn.find('.fade-txt'),
                $primaryBcg = $slideIn.find('.primary .bcg'),
                $whiteBcg= $slideIn.find('.bcg-white'),
                $navSpan = $navContainer.find('span'),
                transitionTl = new TimelineMax();

            transitionTl
                .set([$slide, $slidePrimaryText, $nav, $logo], {autoAlpha: 0})
                .set($slideIn, {autoAlpha: 1})
                .set($whiteBcg, {scaleX: 1})
                .set($primaryBcg, {scaleX: 0})
                .to($whiteBcg, 0.5, {scaleX: 0.63, ease:Power2.easeIn})
                .to($primaryBcg, 0.6, {scaleX: 1, ease:Power2.easeOut, clearProps: 'all'})
                .add('fadeInLogo')
                .to($whiteBcg, 0.6, {scaleX: 0, ease:Power4.easeIn},'fadeInLogo+=0.3')
                .to([$logo, $slidePrimaryText], 0.2, {autoAlpha: 1, ease: Linear.easeNone}, 'fadeInlogo-=1')
                .staggerFrom($slideTitle, 0.2, {autoAlpha: 0, x: '-=60', ease: Power1.easeOut}, 0.1, 'fadeInlogo+=0.4')
                .fromTo($nav, 0.3, {y: -15, autoAlpha: 0}, {autoAlpha: 1, y: 0, ease:Power1.easeOut}, 'fadeInLogo+=0.8')
                .fromTo($navSpan, 0.3, {y: -15, autoAlpha: 0}, {autoAlpha: 1, y: 0, ease:Power1.easeOut}, 'fadeInLogo+=1')
            ;
        }

    }

});