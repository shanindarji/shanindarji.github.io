// scripts.js

// Shuffle Testimonials Functionality
const testimonials = [
    "\"Shanin is an exceptional engineer! His designs are innovative and practical.\" - Client A",
    "\"A pleasure to work with, Shanin always delivers on time and exceeds expectations.\" - Client B",
    "\"His attention to detail is impressive, and he brings great ideas to the table.\" - Client C"
];

const shuffleButton = document.getElementById('shuffle-button');
const testimonialsContent = document.querySelector('.testimonials-content');

shuffleButton.addEventListener('click', () => {
    // Shuffle the testimonials array
    const shuffledTestimonials = testimonials.sort(() => Math.random() - 0.5);
    
    // Clear current testimonials
    testimonialsContent.innerHTML = '';

    // Display shuffled testimonials
    shuffledTestimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = testimonial;
        testimonialsContent.appendChild(card);
    });

    // Add the shuffle button back
    testimonialsContent.appendChild(shuffleButton);
});

// Form Validation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (event) => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        event.preventDefault(); // Prevent form submission
        alert('Please fill out all fields before submitting.');
    } else {
        alert('Thank you for your message!');
    }
});

// Navigation and scroll effects
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navigation
    window.addEventListener('scroll', () => {
        let current = '';
        
        // Navigation background change
        if (window.scrollY > 100) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }

        // Update active navigation link
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Skill Progress Animation
const animateSkills = () => {
    const skillProgress = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = `${progress}%`;
            }
        });
    }, { threshold: 0.5 });

    skillProgress.forEach(progress => observer.observe(progress));
};

// Project cards animation
const animateProjects = () => {
    const projects = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    projects.forEach(project => observer.observe(project));
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateSkills();
    animateProjects();
});

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Send email using EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    })
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Your message has been sent successfully!');
        document.getElementById('contact-form').reset(); // Reset the form
    }, function(error) {
        console.log('FAILED...', error);
        alert('There was an error sending your message. Please try again later.');
    });
});
