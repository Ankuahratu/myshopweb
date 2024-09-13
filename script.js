// Portfolio Slideshow
document.addEventListener('DOMContentLoaded', function() {
    let index = 0;
    const images = document.querySelectorAll('.portfolio-gallery img');
    const totalImages = images.length;

    function showImage(n) {
        images.forEach((img, i) => {
            img.style.display = (i === n) ? 'block' : 'none';
        });
    }

    function nextImage() {
        index = (index + 1) % totalImages;
        showImage(index);
    }

    function prevImage() {
        index = (index - 1 + totalImages) % totalImages;
        showImage(index);
    }

    document.querySelector('.next-btn').addEventListener('click', nextImage);
    document.querySelector('.prev-btn').addEventListener('click', prevImage);

    // Initialize the slideshow
    showImage(index);
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetID = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetID);
        window.scrollTo({
            top: targetSection.offsetTop - 70, // Adjust for navbar height
            behavior: 'smooth'
        });
    });
});

// Modal Popup for Portfolio Images
document.querySelectorAll('.portfolio-gallery img').forEach(image => {
    image.addEventListener('click', function() {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <img src="${this.src}" alt="Portfolio Image">
            </div>
        `;
        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(modal);
        });

        // Close modal when clicking outside the image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    });
});

// Form Validation and Auto-Save
const form = document.getElementById('contactForm');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const messageField = document.getElementById('message');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    let valid = true;

    if (nameField.value.trim() === "") {
        alert('Name is required.');
        valid = false;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailField.value.match(emailPattern)) {
        alert('Please enter a valid email.');
        valid = false;
    }

    if (messageField.value.trim() === "") {
        alert('Message cannot be empty.');
        valid = false;
    }

    if (valid) {
        alert('Form submitted successfully!');
        this.reset();
        localStorage.removeItem('contactForm'); // Clear auto-saved data
    }
});

// Auto-save form data
const saveFormData = () => {
    const formData = {
        name: nameField.value,
        email: emailField.value,
        message: messageField.value
    };
    localStorage.setItem('contactForm', JSON.stringify(formData));
};

// Load saved form data
const loadFormData = () => {
    const savedData = localStorage.getItem('contactForm');
    if (savedData) {
        const formData = JSON.parse(savedData);
        nameField.value = formData.name;
        emailField.value = formData.email;
        messageField.value = formData.message;
    }
};

loadFormData();
form.addEventListener('input', saveFormData);

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');
window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll Animations for Services Section
const serviceCards = document.querySelectorAll('.service-card');
window.addEventListener('scroll', function() {
    const triggerPoint = window.innerHeight / 1.2;
    serviceCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < triggerPoint) {
            card.classList.add('visible');
        }
    });
});

// Background Image Slideshow for Hero Section
const heroBgImages = [
    'project/assets/hero-bg.jpg',
    'project/assets/service2.jpg',
    'project/assets/hard.jpg',
    'project/assets/service3.jpeg',
    'project/assets/bfimage.jpg'
];
let heroBgIndex = 0;

function changeHeroBg() {
    const heroSection = document.querySelector('.hero');
    const currentImage = heroSection.querySelector('.hero-bg.active');
    
    if (currentImage) {
        currentImage.classList.remove('active');
        currentImage.classList.add('inactive');
    }
    
    heroBgIndex = (heroBgIndex + 1) % heroBgImages.length;
    const nextImage = heroSection.querySelector(`.hero-bg[data-image="${heroBgImages[heroBgIndex]}"]`);
    
    if (nextImage) {
        nextImage.classList.remove('inactive');
        nextImage.classList.add('active');
    }
}

function startHeroBgSlideshow() {
    const heroSection = document.querySelector('.hero');
    heroBgImages.forEach(image => {
        const imgElement = document.createElement('div');
        imgElement.classList.add('hero-bg');
        imgElement.style.backgroundImage = `url(${image})`;
        imgElement.dataset.image = image;
        heroSection.appendChild(imgElement);
    });

    changeHeroBg(); // Start with the first image
    setInterval(changeHeroBg, 5000); // Change image every 5 seconds
}

startHeroBgSlideshow();

// Accordion for FAQs
document.querySelectorAll('.accordion').forEach(accordion => {
    accordion.addEventListener('click', function() {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    });
});

// Live Clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);

// Optional Google Maps initialization code
function initMap() {
    const location = { lat: 32.2409, lng: 75.6497 }; // Village Amachnaga Grota Road, Pathankot
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location
    });
    const marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

// On Load Scroll Animations
document.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.querySelector('.hero-content');
    heroContent.classList.add('fade-in');
});
