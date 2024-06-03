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
      snapToSection();
  });

  scrollContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 3; // The * 3 is to increase the scrolling speed
      scrollContainer.scrollLeft = scrollLeft - walk;
  });

  function snapToSection() {
      const sectionWidth = scrollContainer.clientWidth;
      const scrollLeftPosition = scrollContainer.scrollLeft;
      const currentIndex = Math.round(scrollLeftPosition / sectionWidth);
      scrollContainer.scrollTo({
          left: currentIndex * sectionWidth,
          behavior: 'smooth'
      });
  }

  document.addEventListener('mousemove', (e) => {
      cursorImage.style.left = `${e.pageX}px`;
      cursorImage.style.top = `${e.pageY}px`;
  });
});
