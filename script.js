if (navigator.userAgent.includes("Instagram")) { alert("This browser might not fully support animations. For the best experience, open in Chrome.") }
const whole = document.querySelector('.whole'); const loader = document.querySelector('.loader'); const services = document.querySelector('.services'); const tl = gsap.timeline(); gsap.registerPlugin(ScrollTrigger); tl.to("#bar", { width: "100%", duration: 5, onComplete: function () { console.log("Loading complete!"); loader.style.display = "none"; gsap.from(".home", { opacity: 0, duration: 1.5, ease: "power2.out" }) } }); let menuAnimation = gsap.to(".menu-i", { opacity: 1, duration: 0.5, paused: !0, }); let headAnimation1 = gsap.from(".contact-head", { opacity: 0, y: 50, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".contact-head", start: "top 80%", end: "top 20%", } }); ScrollTrigger.create({ trigger: ".menu-i", start: "top -50%", end: "bottom 60%", onUpdate: (self) => { if (self.direction === 1) { menuAnimation.play() } else if (self.direction === -1) { menuAnimation.reverse() } }, }); gsap.utils.toArray('.work').forEach((workEl) => { tl.from(workEl, { scrollTrigger: { trigger: workEl, start: "top 70%", scrub: !0, }, y: 5, duration: 0.8, }) }); tl.from(".about", { scrollTrigger: { trigger: ".about", start: "top 70%", scrub: !0 }, opacity: 0, y: 50, duration: 0.8, ease: "power2.out", }); const menubtn = document.querySelector('.menu-i'); const menu = document.querySelector('.overlay'); const off = document.querySelector('.close-i'); const links = document.querySelectorAll('.o-link'); menubtn.addEventListener('click', () => {
    menu.classList.toggle('active'); off.classList.toggle('active'); if (menu.classList.contains('active')) {
        gsap.to(".o-link", { duration: 0.4, stagger: 0.2, y: "-50%", opacity: 1 })
        gsap.to('.overlay', { duration: 0.5, opacity: 1 }); gsap.to('.menu-i', { duration: 0.5, opacity: 1 }); gsap.to('.calendly-badge-content', { duration: 0, opacity: 0 })
    }
})
off.addEventListener('click', () => {
    menu.classList.toggle('active'); off.classList.toggle('active'); if (!off.classList.contains('active')) {
        gsap.to(".o-link", { duration: 0.2, stagger: 0.2, y: "0", opacity: 0 })
        gsap.to('.overlay', { duration: 0.2, opacity: 0 }); gsap.to('.calendly-badge-content', { duration: 0, opacity: 1 })
    }
})
links.forEach(link => { link.addEventListener('click', () => { menu.classList.toggle('active') }) }); const splitTypes = document.querySelectorAll(".reveal"); splitTypes.forEach((char, i) => { const text = new SplitType(char, { types: "chars" }); console.log(text); tl.from(text.chars, { scrollTrigger: { trigger: char, start: "top 80%", end: "top 20%", scrub: !0, }, stagger: 0.1, opacity: 0.3, }) })
tl.to(".testimonials", { scrollTrigger: { trigger: ".testimonials", start: "top 30%", end: "top -20%", scrub: 3, pin: !0, ease: Expo.easeInOut, }, x: "-150%", })
tl.to(".m", { scrollTrigger: { trigger: ".member-row", start: "top 5%", end: "top -15%", scrub: !0, }, y: "-70%", ease: "none" })
const splitY = document.querySelectorAll(".rev"); splitY.forEach((char, i) => { const text = new SplitType(char, { types: "chars" }); tl.from(text.chars, { scrollTrigger: { trigger: char, start: "top 80%", end: "top 40%", scrub: !0, }, stagger: 0.1, opacity: 0.4, onComplete: () => { tl.to(".left", { scrollTrigger: { trigger: ".services", start: "top -5%", end: "top -50%", scrub: !0, }, x: "-100%", opacity: 0.2, }), tl.to(".right", { scrollTrigger: { trigger: ".services", start: "top -5%", end: "top -50%", scrub: !0, }, x: "120%", opacity: 0.2, }) } }) })
const mm = gsap.matchMedia(); mm.add("(max-width:800px)", () => { tl.to(".testimonials", { scrollTrigger: { trigger: ".testimonials", start: "top 30%", end: "top -20%", scrub: !0, ease: Expo.easeInOut, }, x: "-200%", }) })
const lenis = new Lenis({})
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

async function getIST() {
    try {
        const res = await fetch("https://timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata");
        const data = await res.json();

        let hours = data.hour;
        let minutes = data.minute;
        let seconds = data.seconds;
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
        document.getElementById("indian-time").textContent = `| Time (IST): ${timeString} |`;
    } catch (e) {
        document.getElementById("indian-time").textContent = "⚠️ Couldn't fetch IST.";
        console.error(e);
    }
}

getIST();
setInterval(getIST, 1000); // Update every second