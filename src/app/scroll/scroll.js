
(function($){
 
    const css = require('./scroll.css');
    const css2 = require('./font-awesome.css');

    var imagesLoaded = require('imagesloaded');
    // Init ScrollMagic
    var controller = new ScrollMagic.Controller();

    // Slides
    var slides = ["#slide01","#slide02","#slide03"]
    // Headers
    var headers = ["#slide01 header", "#slide02 header", "#slide03 header"]
    // Sections
    var breakSections = ["#cb01", "#cb02", "#cb03"];

    // for preloader progress
    var loadedCount = 0;
    var imagesToLoad = $('.bcg').length;
    var loadingProgress =0;

    imagesLoaded.makeJQueryPlugin( $ );

    $('.bcg').imagesLoaded({
            background: true
        }
    ).progress(function(instance, image) {
            loadProgress(instance, image);
        });

    function loadProgress(imgLoad, image){
        loadedCount++;
        loadingProgress = (loadedCount/imagesToLoad);
        TweenLite.to(progressTl, 0.7, {progress:loadingProgress, ease:Linear.easeNone});
    }

    var progressTl = new TimelineMax({paused:true,onUpdate:progressUpdate, onComplete:loadComplete});

    progressTl
        .to($('.progress span'), 1, {width:100, ease:Linear.easeNone});

    function progressUpdate(){
        loadingProgress = Math.round(progressTl.progress()*100);
        $('.txt-perc').text(loadingProgress + '%');
    }

    function loadComplete(){
        // preloader out
        var preloaderOutTl = new TimelineMax();

        preloaderOutTl
            .to($('.progress'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn})
            .to($('.txt-perc'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn},.3)
            .set($('body'),{className: '-=is-loading'})
            .set($('#intro'),{className: '+=is-loaded'})
            .to($('#preloader'), 0.7, {yPercent: 100, ease:Power4.easeInOut})
            .set($('#preloader'), {className: '+=is-hidden'})
            .from($('#intro .title'), 1, {autoAlpha: 0, ease:Power1.easeOut}, '-=0.2')
            .from($('#intro p'), 0.7, {autoAlpha: 0, ease:Power1.easeOut}, '+=0.2')
            .from($('.scroll-hint'), 0.3, {y: -20, autoAlpha: 0, ease:Power1.easeOut}, '+=0.1');

        return preloaderOutTl;
    }

    // create scenes for each of the headers
    headers.forEach(function (header, index) {

        // number for highlighting scenes
        var num = index+1;

        // make scene
        var headerScene = new ScrollMagic.Scene({
            triggerElement: header, // trigger CSS animation when header is in the middle of the viewport
            offset: -95 // offset triggers the animation 95 earlier then middle of the viewport, adjust to your liking
        })
            .setClassToggle('#slide0'+num, 'is-active') // set class to active slide
            //.addIndicators() // add indicators (requires plugin), use for debugging
            .addTo(controller);
    });

    // change color of the nav for dark content blocks
    breakSections.forEach(function (breakSection, index) {

        // number for highlighting scenes
        var breakID = $(breakSection).attr('id');

        // make scene
        var breakScene = new ScrollMagic.Scene({
            triggerElement: breakSection, // trigger CSS animation when header is in the middle of the viewport
            triggerHook: 0.75
        })
            .setClassToggle('#'+breakID, 'is-active') // set class to active slide
            .on("enter", function (event) {
                $('nav').attr('class','is-light');
            })
            .addTo(controller);
    });

    // tweenmax
    var tl = new TimelineLite(),
        iconContainer = document.getElementById("cb02"),
        icon01 = document.getElementById("cb02-icon01"),
        icon02 = document.getElementById("cb02-icon02"),
        icon03 = document.getElementById("cb02-icon03"),
        text01 = document.getElementById("cb02-text01"),
        text02 = document.getElementById("cb02-text02"),
        text03 = document.getElementById("cb02-text03");

    tl.to(icon01,.6, {opacity:1, ease:Power1.easeIn})
        .to(icon02,.5, {opacity:1, ease:Power1.easeIn})
        .to(icon03,.4, {opacity:1, ease:Power1.easeIn})
        .to(text01,.5, {opacity:1, y:0, ease:Bounce.easeOut})
        .to(text02,.5, {opacity:1, y:0, ease:Bounce.easeOut})
        .to(text03,.5, {opacity:1, y:0, ease:Bounce.easeOut});

    var iconScene = new ScrollMagic.Scene({
        triggerElement:iconContainer,
        triggerHook:0.75
    })
        .setTween(tl)
        .addTo(controller);

    // move bcg container when slide gets into the view
    slides.forEach(function (slide, index) {

        var $bcg = $(slide).find('.bcg');

        var slideParallaxScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 1,
            duration: "100%"
        })
            .setTween(TweenMax.from($bcg, 1, {y: '-40%', autoAlpha: 0.3, ease:Power0.easeNone}))
            .addTo(controller);
    });
    var introTl = new TimelineMax();

    introTl
        .to($('#intro header, .scroll-hint'), 0.2, {autoAlpha: 0, ease:Power1.easeNone})
        .to($('#intro'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone}, 0);

    var introScene = new ScrollMagic.Scene({
        triggerElement: '#intro',
        triggerHook: 0,
        duration: "100%"
    })
        .setTween(introTl)
        .addTo(controller);


}(jQuery));
