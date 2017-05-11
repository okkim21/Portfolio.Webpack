$(document).ready(function(){
    const css = require('./pin.css');
    
    // ScrollMagic Controller
    var controller = new ScrollMagic.Controller();

    // Scene01 -> pin
    var pinScene01 = new ScrollMagic.Scene({
        triggerElement: "#slide01",
        triggerHook:0,
        duration:'100%'
    })
    .setPin("#slide01 .pin-wrapper")
    .addTo(controller)
    ;

    // Scene02 -> pin
    var pinScene02 = new ScrollMagic.Scene({
        triggerElement: "#slide01",
        triggerHook:0,
        duration:'200%'
    })
    .setPin("#slide02 .pin-wrapper")
    .addTo(controller)
    ;

    // Scene02 -> pin
    var pinScene03 = new ScrollMagic.Scene({
        triggerElement: "#slide02",
        triggerHook:0,
        duration:'200%'
    })
    .setPin("#slide03 .pin-wrapper")
    .addTo(controller)
    ;
    // Scene02 -> pin
    var pinScene04 = new ScrollMagic.Scene({
        triggerElement: "#slide03",
        triggerHook:0,
        duration:'100%'
    })
    .setPin("#slide04 .pin-wrapper")
    .addTo(controller)
    ;
});
