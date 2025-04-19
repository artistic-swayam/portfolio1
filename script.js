import { Application } from 'https://unpkg.com/@splinetool/runtime@0.9.505/build/runtime.js';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas3d');
  const app = new Application(canvas);
  app.load('https://prod.spline.design/e1ahrrOCFKVpYV0k/scene.splinecode');
});


const tl = gsap.timeline();
gsap.registerPlugin(ScrollTrigger);



//gsap animation
let menuAnimation = gsap.to(".menu-i", {
    opacity: 1,
    duration: 0.5,
    paused: true,  // Initially paused
  });
  
  ScrollTrigger.create({
    trigger: ".menu-i",
    start: "top -50%",  // When the top of the element hits the viewport center
    end: "bottom 60%",  // When the bottom of the element hits 60% of the viewport    // Show markers for debugging
    onUpdate: (self) => {
      if (self.direction === 1) {  // Scroll down
        menuAnimation.play();
      } else if (self.direction === -1) {  // Scroll up
        menuAnimation.reverse();
      }
    },
  });

  gsap.utils.toArray('.work').forEach((workEl) => {
    gsap.from(workEl, {
      scrollTrigger: {
        trigger: workEl,
        start: "top 70%", // When the top of the element hits 80% of viewport

      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out"
    });
  });
  
//lenisrr


const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

const works = document.querySelectorAll('.work')

lenis.on('scroll', () => {
  const winHeight = window.innerHeight

  works.forEach(work => {
    const rect = work.getBoundingClientRect()
    const middle = rect.top + rect.height / 2
    const scrollProgress = (middle - winHeight / 2) / winHeight

    const parallax = scrollProgress * 40// bumped from 50 to 80 🔥

    if (rect.top < winHeight && rect.bottom > 0) {
      work.style.backgroundPosition = `center ${parallax}px`
      work.style.backgroundSize = 'cover'
    }
  })
})
