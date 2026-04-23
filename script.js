/**
 * Lightweight Ambient Background Animation
 * Creates large, slow-moving, out-of-focus color orbs to add a premium, modern feel.
 */
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('ambient-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let orbs = [];

    // Sophisticated, subtle pastel tones (Sky Blue, Light Teal, Pale Slate)
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

    window.addEventListener('resize', () => {
        // Debounce to keep performance smooth
        requestAnimationFrame(resize);
    });

    class AmbientOrb {
        constructor(color) {
            this.color = color;
            this.reset(true);
        }

        reset(randomizePosition = false) {
            // Very large radii for a diffuse, modern look
            this.radius = Math.random() * 300 + 300; 
            
            this.x = randomizePosition ? Math.random() * width : Math.random() > 0.5 ? -this.radius : width + this.radius;
            this.y = randomizePosition ? Math.random() * height : Math.random() * height;
            
            // Extremely slow, elegant movement
            this.vx = (Math.random() - 0.5) * 0.2;
            this.vy = (Math.random() - 0.5) * 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Softly bounce off boundaries
            if (this.x < -this.radius * 1.5 || this.x > width + this.radius * 1.5) this.vx *= -1;
            if (this.y < -this.radius * 1.5 || this.y > height + this.radius * 1.5) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'rgba(248, 250, 252, 0)'); // Fades into background color
            
            ctx.fillStyle = gradient;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initOrbs() {
        orbs = [];
        // Only 3-4 orbs needed for an elegant, minimal effect
        const count = width > 768 ? 4 : 2; 
        
        for (let i = 0; i < count; i++) {
            orbs.push(new AmbientOrb(ORB_COLORS[i % ORB_COLORS.length]));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        orbs.forEach(orb => {
            orb.update();
            orb.draw();
        });

        requestAnimationFrame(animate);
    }

    // Initialize
    resize();
    animate();
});