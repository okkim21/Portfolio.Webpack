(function($){

    const css = require('./app.css');
    
    var tl = new TimelineLite(),
        name = document.getElementById("name"),
        greetingText = document.getElementById("greeting-text"),
        content01 = document.getElementById("content01-01"),
        content0102 = document.getElementById("content01-02"),
        content02 = document.getElementById("content02-01"),
        content0202 = document.getElementById("content02-02");


    TweenLite.set(name, {autoAlpha:0});
    TweenLite.set(greetingText, {autoAlpha:0, rotationX:-90});
    TweenLite.set(content01, {autoAlpha:0, rotationX:-90});
    TweenLite.set(content0102, {autoAlpha:0, rotationX:-90});
    TweenLite.set(content02, {autoAlpha:0, rotationX:-90});
    TweenLite.set(content0202, {autoAlpha:0, rotationX:-90});

    tl
        .to(name, 0.7, {autoAlpha:1, ease: Power1.easeIn})
        .to(greetingText, 0.7, {autoAlpha:1,rotationX:0, transformOrigin:"50% 50% -25px"})
        .to(content01, 0.7, {autoAlpha:1,rotationX:0, transformOrigin:"50% 50% -25px"})
        .to(content0102, 0.7, {autoAlpha:1,rotationX:0, transformOrigin:"50% 50% -25px"})
        .to(content02, 0.7, {autoAlpha:1,rotationX:0, transformOrigin:"50% 50% -25px"})
        .to(content0202, 0.7, {autoAlpha:1,rotationX:0, transformOrigin:"50% 50% -25px"});

}(jQuery));