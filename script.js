const tl = gsap.timeline();
gsap.registerPlugin(ScrollTrigger);

gsap.to(".menu-i",{
    scrollTrigger:{
        trigger: ".menu-i",
        start: "top -50%",       // When to start (element’s top hits viewport center)
        end: "bottom 60%",         // When to enj            // Smooth scrubbing (scroll-linked animation)
        markers: true,
        toggleActions: "play reverse play reverse",
    },
    opacity:1,
    duration:.5,
    from: { opacity: 0 }   
})
