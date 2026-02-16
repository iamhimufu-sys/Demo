/* ==============================================
   RANJIT PORTFOLIO - JAVASCRIPT
   Smooth Animations & Interactive Features
   ============================================== */

// ============================================== 
// SCROLL ANIMATIONS
// ============================================== 
document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .reason-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // ============================================== 
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================== 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for internal hash links
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ============================================== 
    // GLITCH EFFECT ON HERO TITLE
    // ============================================== 
    const glitchElement = document.querySelector('.glitch');
    
    if (glitchElement) {
        setInterval(() => {
            const shouldGlitch = Math.random() > 0.95;
            
            if (shouldGlitch) {
                glitchElement.style.textShadow = `
                    ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #ff3b3b,
                    ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(0, 255, 136, 0.3)
                `;
                
                setTimeout(() => {
                    glitchElement.style.textShadow = '2px 2px 0 #ff3b3b, -2px -2px 0 rgba(0, 255, 136, 0.3)';
                }, 50);
            }
        }, 3000);
    }
    
    // ============================================== 
    // CURSOR TRAIL EFFECT (Desktop Only)
    // ============================================== 
    if (window.innerWidth > 768) {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        canvas.style.opacity = '0.6';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = 15;
        
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.life = 1;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= 0.02;
                if (this.size > 0.2) this.size -= 0.05;
            }
            
            draw() {
                ctx.fillStyle = `rgba(0, 255, 136, ${this.life})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        let mouseX = 0;
        let mouseY = 0;
        let isMoving = false;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isMoving = true;
        });
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (isMoving && particles.length < particleCount) {
                particles.push(new Particle(mouseX, mouseY));
            }
            
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw();
                
                if (particles[i].life <= 0) {
                    particles.splice(i, 1);
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        animate();
        
        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        // Stop particle generation when mouse stops
        let timeout;
        document.addEventListener('mousemove', () => {
            isMoving = true;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                isMoving = false;
            }, 100);
        });
    }
    
    // ============================================== 
    // PROJECT CARD TILT EFFECT (Desktop Only)
    // ============================================== 
    if (window.innerWidth > 768) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }
    
    // ============================================== 
    // DYNAMIC BACKGROUND GRID
    // ============================================== 
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const gridCanvas = document.createElement('canvas');
        gridCanvas.style.position = 'absolute';
        gridCanvas.style.top = '0';
        gridCanvas.style.left = '0';
        gridCanvas.style.width = '100%';
        gridCanvas.style.height = '100%';
        gridCanvas.style.opacity = '0.1';
        gridCanvas.style.pointerEvents = 'none';
        hero.style.position = 'relative';
        hero.insertBefore(gridCanvas, hero.firstChild);
        
        const gridCtx = gridCanvas.getContext('2d');
        gridCanvas.width = hero.offsetWidth;
        gridCanvas.height = hero.offsetHeight;
        
        function drawGrid() {
            const gridSize = 40;
            gridCtx.strokeStyle = '#00ff88';
            gridCtx.lineWidth = 1;
            
            // Vertical lines
            for (let x = 0; x < gridCanvas.width; x += gridSize) {
                gridCtx.beginPath();
                gridCtx.moveTo(x, 0);
                gridCtx.lineTo(x, gridCanvas.height);
                gridCtx.stroke();
            }
            
            // Horizontal lines
            for (let y = 0; y < gridCanvas.height; y += gridSize) {
                gridCtx.beginPath();
                gridCtx.moveTo(0, y);
                gridCtx.lineTo(gridCanvas.width, y);
                gridCtx.stroke();
            }
        }
        
        drawGrid();
        
        window.addEventListener('resize', () => {
            gridCanvas.width = hero.offsetWidth;
            gridCanvas.height = hero.offsetHeight;
            drawGrid();
        });
    }
    
    // ============================================== 
    // TYPING EFFECT FOR CODE WINDOW (Optional Enhancement)
    // ============================================== 
    const codeContent = document.querySelector('.window-content code');
    
    if (codeContent) {
        const originalHTML = codeContent.innerHTML;
        let isTypingComplete = false;
        
        // Only run typing effect on first load
        const hasSeenTyping = sessionStorage.getItem('typingEffectShown');
        
        if (!hasSeenTyping && window.innerWidth > 768) {
            codeContent.innerHTML = '';
            codeContent.style.opacity = '1';
            
            let index = 0;
            const typingSpeed = 20;
            
            function typeCode() {
                if (index < originalHTML.length) {
                    codeContent.innerHTML = originalHTML.slice(0, index + 1);
                    index++;
                    setTimeout(typeCode, typingSpeed);
                } else {
                    isTypingComplete = true;
                    sessionStorage.setItem('typingEffectShown', 'true');
                }
            }
            
            // Start typing after a short delay
            setTimeout(typeCode, 500);
        }
    }
    
    // ============================================== 
    // PERFORMANCE: REDUCE ANIMATIONS ON MOBILE
    // ============================================== 
    if (window.innerWidth <= 768) {
        // Disable heavy animations on mobile for better performance
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation-duration: 0.3s !important;
                transition-duration: 0.2s !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ============================================== 
    // SCROLL PROGRESS INDICATOR (Optional)
    // ============================================== 
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, #00ff88, #ff3b3b)';
    progressBar.style.zIndex = '10000';
    progressBar.style.transformOrigin = 'left';
    progressBar.style.transform = 'scaleX(0)';
    progressBar.style.transition = 'transform 0.1s ease';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = window.scrollY;
        const progress = scrolled / windowHeight;
        progressBar.style.transform = `scaleX(${progress})`;
    });
    
    // ============================================== 
    // CONSOLE EASTER EGG
    // ============================================== 
    console.log('%c👨‍💻 RANJIT - WEB DEVELOPER', 'color: #00ff88; font-size: 20px; font-weight: bold;');
    console.log('%cLooking for a developer? Let\'s connect!', 'color: #b0b0b0; font-size: 14px;');
    console.log('%cWhatsApp: +91 7814903906', 'color: #00ff88; font-size: 14px;');
    console.log('%cGitHub: https://github.com/iamhimufu-sys', 'color: #00ff88; font-size: 14px;');
    
});

// ============================================== 
// LAZY LOADING OPTIMIZATION
// ============================================== 
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}
