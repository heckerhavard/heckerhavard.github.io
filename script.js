document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. Ambient Background (HOMEPAGE ONLY)
    // ==========================================
    const canvas = document.getElementById('ambient-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let orbs = [];

        const ORB_COLORS = [
            'rgba(14, 165, 233, 0.08)', // Sky
            'rgba(20, 184, 166, 0.05)', // Teal
            'rgba(148, 163, 184, 0.06)'  // Slate
        ];

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initOrbs();
        }

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resize, 150);
        });

        class AmbientOrb {
            constructor(color) {
                this.color = color;
                this.reset(true);
            }
            reset(randomizePosition = false) {
                this.radius = Math.random() * 300 + 300; 
                this.x = randomizePosition ? Math.random() * width : Math.random() > 0.5 ? -this.radius : width + this.radius;
                this.y = randomizePosition ? Math.random() * height : Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.2;
                this.vy = (Math.random() - 0.5) * 0.2;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < -this.radius * 1.5 || this.x > width + this.radius * 1.5) this.vx *= -1;
                if (this.y < -this.radius * 1.5 || this.y > height + this.radius * 1.5) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(1, 'rgba(248, 250, 252, 0)');
                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initOrbs() {
            orbs = [];
            const count = width > 768 ? 4 : 2; 
            for (let i = 0; i < count; i++) {
                orbs.push(new AmbientOrb(ORB_COLORS[i % ORB_COLORS.length]));
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            orbs.forEach(orb => { orb.update(); orb.draw(); });
            requestAnimationFrame(animate);
        }

        resize();
        animate();
    }

    // ==========================================
    // 2. Scroll Reveal Logic (PROJECTS PAGE ONLY)
    // ==========================================
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const elementVisible = 100;
            reveals.forEach((reveal) => {
                const elementTop = reveal.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    reveal.classList.add('active');
                }
            });
        };
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Trigger immediately on load
    }
});