// Typing animation for hero section with multiple roles
const typingText = document.getElementById('typing-text');
const roles = ['Java Developer', 'Full-Stack Engineer', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let typeSpeed = isDeleting ? 50 : 100;
  
  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500; // Pause before next word
  }
  
  setTimeout(typeWriter, typeSpeed);
}

// Start typing animation when page loads
window.addEventListener('load', () => {
  setTimeout(typeWriter, 500);
});

// Download resume function
function downloadResume() {
  // Programmatic download: tries to fetch the resume and trigger download.
  // Place a file named `resume.pdf` in the project root (next to index.html).
  const url = 'resume.pdf';

  // Try a lightweight HEAD request first to check presence (may be blocked on some hosts/filesystems).
  fetch(url, { method: 'HEAD' })
    .then((res) => {
      if (res.ok) {
        const a = document.createElement('a');
        a.href = url;
        // download attribute hints browser to download instead of navigate
        a.setAttribute('download', 'Sanjay_Varma_Resume.pdf');
        a.setAttribute('target', '_blank');
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        alert('Resume not found. Please add a file named \"resume.pdf\" to the project root (next to index.html).');
      }
    })
    .catch(() => {
      // If HEAD fails (CORS/local file), still attempt to trigger download directly.
      const a = document.createElement('a');
      a.href = url;
      a.setAttribute('download', 'Sanjay_Varma_Resume.pdf');
      a.setAttribute('target', '_blank');
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      try {
        a.click();
      } catch (e) {
        alert('Could not download resume automatically. Please ensure a file named \"resume.pdf\" exists in the project root and open it manually.');
      }
      a.remove();
    });
}

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
  const icon = navToggle.querySelector('i');
  if (navMenu.classList.contains('show')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
    const icon = navToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Add shadow to header on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Animate skill bars when they come into view
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll('.skill-item__progress');
      progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.setProperty('--progress-width', progress + '%');
        bar.classList.add('animate');
        setTimeout(() => {
          bar.style.width = progress + '%';
        }, 100);
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
  observer.observe(skillsSection);
}



// Contact form validation and submission
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Clear previous errors
  document.querySelectorAll('.form-error').forEach(error => {
    error.textContent = '';
  });
  
  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  
  let isValid = true;
  
  // Validate name
  if (name === '') {
    document.getElementById('name-error').textContent = 'Name is required';
    isValid = false;
  } else if (name.length < 2) {
    document.getElementById('name-error').textContent = 'Name must be at least 2 characters';
    isValid = false;
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    document.getElementById('email-error').textContent = 'Email is required';
    isValid = false;
  } else if (!emailRegex.test(email)) {
    document.getElementById('email-error').textContent = 'Please enter a valid email address';
    isValid = false;
  }
  
  // Validate subject
  if (subject === '') {
    document.getElementById('subject-error').textContent = 'Subject is required';
    isValid = false;
  } else if (subject.length < 3) {
    document.getElementById('subject-error').textContent = 'Subject must be at least 3 characters';
    isValid = false;
  }
  
  // Validate message
  if (message === '') {
    document.getElementById('message-error').textContent = 'Message is required';
    isValid = false;
  } else if (message.length < 10) {
    document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
    isValid = false;
  }
  
  // If form is valid, show success message
  if (isValid) {
    formSuccess.textContent = 'Thank you for your message! I will get back to you soon.';
    formSuccess.classList.add('show');
    contactForm.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 5000);
  }
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active');
    } else {
      navLink?.classList.remove('active');
    }
  });
});