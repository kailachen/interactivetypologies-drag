console.log("hello console")


// the slider
// document.addEventListener('DOMContentLoaded', (event) => {
//   const slider = document.getElementById('sectionSlider');
//   const scrollContainer = document.querySelector('.scroll-container');
//   const sections = document.querySelectorAll('section');

//   slider.addEventListener('input', () => {
//       const sectionIndex = slider.value - 1;
//       const section = sections[sectionIndex];
//       scrollContainer.scrollTo({
//           left: section.offsetLeft,
//           behavior: 'smooth'
//       });
//   });
// });



document.addEventListener('DOMContentLoaded', (event) => {
    const scrollContainer = document.querySelector('.scroll-container');
    const cursorImage = document.getElementById('cursorImage');
    let isDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        scrollContainer.classList.add('active');
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener('mouseleave', () => {
        isDown = false;
        scrollContainer.classList.remove('active');
    });

    scrollContainer.addEventListener('mouseup', () => {
        isDown = false;
        scrollContainer.classList.remove('active');
        //   const sectionWidth = scrollContainer.clientWidth;
        //   const scrollLeftPosition = scrollContainer.scrollLeft;
        //   const currentIndex = Math.round(scrollLeftPosition / sectionWidth);
        //   scrollContainer.scrollTo({
        //     left: currentIndex * sectionWidth,
        //     behavior: 'smooth'
        // });
    });

    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 3;
        scrollContainer.scrollLeft = scrollLeft - walk;
    });

    document.addEventListener('mousemove', (e) => {
        cursorImage.style.left = `${e.pageX}px`;
        cursorImage.style.top = `${e.pageY}px`;
    });
});


// mouse trail https://www.youtube.com/watch?v=aEptSB3fbqM
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let spots = [];
let hue = 0;
const mouse = {
    x: undefined,
    y: undefined
};
canvas.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 7; i++) {
        spots.push(new Particle());
    }
});
class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 2 + 0.2;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        // this.color = Math.random() > 0.25 ? "#89CFF0" : "#8D69BF";
        const colors = ["#312559", "#012340", "#3B758C", "#41A681", "#50BF77"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.1) this.size -= 0.01;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticle() {
    for (let i = 0; i < spots.length; i++) {
        spots[i].update();
        spots[i].draw();
        for (let j = i; j < spots.length; j++){
            const dx = spots[i].x - spots[j].x;
            const dy = spots[i].y - spots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 90) {
                ctx.beginPath();
                ctx.strokeStyle = spots[i].color;
                ctx.lineWidth = spots[i].size / 10;
                ctx.moveTo(spots[i].x, spots[i].y);
                ctx.lineTo(spots[i].x, spots[j].y);
                ctx.stroke();
            }
        }
        if (spots[i].size <= 0.3) {
            spots.splice(i, 1); 
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    hue++;
    requestAnimationFrame(animate);
}
window.addEventListener('resize', function () {
    canvas.width = this.innerWidth;
    canvas.height = this.innerHeight;
    init();
});

window.addEventListener('mouseout', function () {
    mouse.x = undefined;
    mouse.y = undefined
});
animate();