if (navigator.userAgent.includes("Instagram")) {
  alert("This browser might not fully support animations. For the best experience, open in Chrome.");
}

const whole = document.querySelector('.whole');
const loader = document.querySelector('.loader');
const services = document.querySelector('.services');
const tl = gsap.timeline();
gsap.registerPlugin(ScrollTrigger);
tl.to("#bar", {
  width: "100%",
  duration: 1,//8
  onComplete: function() {
    console.log("Loading complete!");
    loader.style.display = "none";
    gsap.from(".home",{
      opacity: 0,
      duration: 1.5,
      ease: "power2.out"
    }) 
  }
});




//gsap animation
let menuAnimation = gsap.to(".menu-i", {
    opacity: 1,
    duration: 0.5,
    paused: true, 
  });
let headAnimation1 = gsap.from(".contact-head", {
    opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
    scrollTrigger:{
      trigger:".contact-head",
      start:"top 80%",
      end:"top 20%",
    }     
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
    tl.from(workEl, {
      scrollTrigger: {
        trigger: workEl,
        start: "top 70%",
        scrub: true // When the top of the element hits 80% of viewport
      },
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  });
  tl.from(".about", {
    scrollTrigger: {
      trigger: ".about",
      start: "top 70%",
      scrub: true // When the top of the element hits 80% of viewport
    },
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });
     //menu animation
const menubtn = document.querySelector('.menu-i');
const menu = document.querySelector('.overlay');
const off = document.querySelector('.close-i');
const links = document.querySelectorAll('.o-link');

menubtn.addEventListener('click', () => {
  menu.classList.toggle('active');
  off.classList.toggle('active');
  if (menu.classList.contains('active')) {
    gsap.to(".o-link",{duration: 0.4,stagger:0.2,y:"-50%", opacity: 1})
    gsap.to('.overlay', { duration: 0.5, opacity: 1 });
    gsap.to('.menu-i', { duration: 0.5, opacity: 1 });
    gsap.to('.calendly-badge-content', { duration: 0, opacity: 0 });
  } 
})
off.addEventListener('click',()=>{
  menu.classList.toggle('active');
  off.classList.toggle('active');
  if (!off.classList.contains('active'))  {
    tl.to(".o-link",{duration: 0.2,stagger:0.2,y:"0", opacity: 0})
    tl.to('.overlay', { duration: 0.2, opacity: 0 });
    tl.to('.calendly-badge-content', { duration: 0, opacity: 1 });
  }
})
links.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
});
     //text reveal
    
const splitTypes = document.querySelectorAll(".reveal");
splitTypes.forEach((char,i)=>{

  
  const text = new SplitType(char,{types:"chars"});
  console.log(text);
  tl.from(text.chars,{
    scrollTrigger:{
      trigger:char,
      start:"top 80%",
      end:"top 20%",
      scrub:true,
    },
    stagger:0.1,
    opacity:0.3,
  })
})

tl.to(".testimonials",{
  scrollTrigger:{
    trigger:".testimonials",
    start:"top 30%",
    end:"top -20%",
    scrub:3,
    pin:true,
    ease:Expo.easeInOut,

  },
  x:"-150%",
})

tl.to(".m",{
  scrollTrigger:{
    trigger:".member-row",
    start:"top 5%",
    end:"top -15%",
    scrub:true,
  },
  y: "-70%", // move it up slowly
  ease: "none"
})

const splitY = document.querySelectorAll(".rev");
splitY.forEach((char,i)=>{

  
  const text = new SplitType(char,{types:"chars"});
  tl.from(text.chars,{
    scrollTrigger:{
      trigger:char,
      start:"top 80%",
      end:"top 40%",
      scrub:true,

    },
    stagger:0.1,
    opacity:0.4,
    
    //y:"50%",
    onComplete: () => {
      tl.to(".left",{
        scrollTrigger:{
          trigger:".services",
          start:"top -5%",
          end:"top -50%",
          scrub:true,

        },
        x: "-100%",
        opacity:0.2,
         // move it up slowly
      }),
      tl.to(".right",{
        scrollTrigger:{
          trigger:".services",
          start:"top -5%",
          end:"top -50%",
          scrub:true,
        },
        x: "120%", 
        opacity:0.2,
        
        
      })
    }
  })
  
})


const mm = gsap.matchMedia();
        mm.add("(max-width:800px)",()=>{
          tl.to(".testimonials",{
            scrollTrigger:{
              trigger:".testimonials",
              start:"top 30%",
              end:"top -20%",
              scrub:true,
              ease:Expo.easeInOut,
          
            },
            x:"-200%",
          })
        })
          
     //lenisrr
     const lenis = new Lenis({

    })
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)



