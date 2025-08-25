const savedColor = localStorage.getItem('siteColor') || '#ff0000';
document.documentElement.style.setProperty('--main-color', savedColor);

const pickr = Pickr.create({
    el: '#color-picker', 
    theme: 'classic',
    useAsButton:true,
    default: savedColor,
    swatches: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
    components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
            hex: true,
            rgba: true,
            hsl: true,
            input: true,
            save: true
        }
    }
});

// Change event — update CSS variable & save to localStorage
pickr.on('change', (color) => {
    const hex = color.toHEXA().toString();
    document.documentElement.style.setProperty('--main-color', hex);
    localStorage.setItem('siteColor', hex);
});

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () =>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec =>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 500;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){

            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });

            sec.classList.add('show-animate');
        }

        else{
            sec.classList.remove('show-animate');
        }
    });

    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');    
}

// THEME BUTTON

const themeBtn = document.querySelector(".theme-btn");
const themeOptions = document.getElementById("themeOptions");

themeBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent immediate close
  themeOptions.classList.toggle("active");
});

// Hide when clicking outside
document.addEventListener("click", (e) => {
  if (!themeOptions.contains(e.target) && !themeBtn.contains(e.target)) {
    themeOptions.classList.remove("active");
  }
});

// DARK MODE BUTTON

const body = document.body;
const toggle = document.getElementById("darkToggle");
const toggleIcon = document.getElementById("toggleIcon");

    // Load saved mode from localStorage
    if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark-mode");
      toggle.checked = true;
      toggleIcon.classList.replace("bx-sun", "bx-moon");
    }

    // Toggle and save preference
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
        toggleIcon.classList.replace("bx-sun", "bx-moon");
      } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
        toggleIcon.classList.replace("bx-moon", "bx-sun");
      }
    });

// READ MORE BUTTON

// READ MORE BUTTON
const btn = document.getElementById('read-more-btn');
const moreText = document.getElementById('more-text');
const aboutSection = document.getElementById('about'); // your about section id

btn.addEventListener('click', () => {
  moreText.classList.toggle('show');

  if (moreText.classList.contains('show')) {
    btn.textContent = 'Read Less';
  } else {
    btn.textContent = 'Read More';
  }
});

// Function to check if About section is visible in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top < window.innerHeight && // top is above bottom of screen
    rect.bottom > 0                 // bottom is below top of screen
  );
}

// Collapse when scrolling away from About section
window.addEventListener('scroll', () => {
  if (!isInViewport(aboutSection) && moreText.classList.contains('show')) {
    moreText.classList.remove('show');
    btn.textContent = 'Read More';
  }
});

// CONTACT ME

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();

  emailjs.sendForm("service_tugrr04", "template_df03wby", this)
  .then(function(response) {
      alert("Message sent successfully!");
  }, function(error) {
      alert("Failed to send message, please try again.");
      console.log("FAILED...", error);
  });
});