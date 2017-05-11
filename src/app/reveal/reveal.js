$(document).ready(function(){
    const css = require('./reveal.css');
    
    // Set initial state
    TweenMax.set('.part2', {y:-120});
    TweenMax.set('.part3', {y:-300});
    TweenMax.set('.part4', {y:-480});
    TweenMax.set('.part5', {y:-680});
    TweenMax.set('.part6', {y:-870});
    TweenMax.set('.part7', {y:-1060});
    TweenMax.set('.part8', {y:-1270});
    TweenMax.set('.part9', {y:-1430});

    // Init ScrollMagic
    var controller = new ScrollMagic.Controller();

    // Moving parts 9,8,7,6 to its original css
    var part9ToStart = TweenMax.to('.part9', 1, {y:0, ease:Linear.easeNone});

    var part9ToStartScene = new ScrollMagic.Scene({
        triggerElement: '.part1',
        triggerHook: 1,
        offset: 370,
        duration: 1430
    })
    .setTween(part9ToStart)
    .addTo(controller);

    var part8ToStart = TweenMax.to('.part8', 1, {y:0, ease:Linear.easeNone});

    var part8ToStartScene = new ScrollMagic.Scene({
        triggerElement: '.part1',
        triggerHook: 1,
        offset: 380,
        duration: 1270
    })
    .setTween(part8ToStart)
    .addTo(controller);

    var part7ToStart = TweenMax.to('.part7', 1, {y:0, ease:Linear.easeNone});

    var part7ToStartScene = new ScrollMagic.Scene({
        triggerElement: '.part1',
        triggerHook: 1,
        offset: 380,
        duration: 1060
    })
    .setTween(part7ToStart)
    .addTo(controller);

    var part6ToStart = TweenMax.to('.part6', 1, {y:0, ease:Linear.easeNone});

    var part6ToStartScene = new ScrollMagic.Scene({
        triggerElement: '.part1',
        triggerHook: 1,
        offset: 380,
        duration: 870
    })
    .setTween(part6ToStart)
    .addTo(controller);

    // Moving parts 5,4,3,2 to its original css
    var part5ToStart = TweenMax.to('.part5', 1, {y:0, ease:Linear.easeNone});

    var part5ToStartScene = new ScrollMagic.Scene({
        triggerElement: '.part1',
        triggerHook: 1,
        offset: 590,
        duration: 680
    })
    .setTween(part5ToStart)
    .addTo(controller);

    var part4ToStart = TweenMax.to('.part4', 1, {y:0, ease:Linear.easeNone});

    var part4ToStartScene = new ScrollMagic.Scene({
        triggerElement: '.part1',
        triggerHook: 1,
        offset: 590,
        duration: 480
    })
    .setTween(part4ToStart)
    .addTo(controller);

    var part3ToStart = TweenMax.to('.part3', 1, {y:0, ease:Linear.easeNone});

    var part3ToStartScene = new ScrollMagic.Scene({
        triggerElement: '.part1',
        triggerHook: 1,
        offset: 590,
        duration: 300
    })
    .setTween(part3ToStart)
    .addTo(controller);

    var part2ToStart = TweenMax.to('.part2', 1, {y:0, ease:Linear.easeNone});

    var part2ToStartScene = new ScrollMagic.Scene({
        triggerElement: '.part1',
        triggerHook: 1,
        offset: 590,
        duration: 120
    })
    .setTween(part2ToStart)
    .addTo(controller);

    enquire.register("screen and (min-width: 992px)", {

        match: function(){
            displayCaption();
        }

    });

    function displayCaption() {
        var startPoint = 200;
        // add headings for parts
        $('.parts li').each(function () {
            if (this.className === 'part7' | this === 'part8' || this === 'part9') {
                startPoint = 30
            }
            // build a scene
            var scene = new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 0.55,
                offset: startPoint
            })
                .setClassToggle(this, 'fade-in')
                .addTo(controller);

        });
    }
});
