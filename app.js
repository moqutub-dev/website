// --- 1. Game Data Setup ---
const worldsData = [
    { id: 'arabic', title: 'Arabic', solved: 15, total: 30 },
    { id: 'norse', title: 'Old Norse', solved: 30, total: 30 }, // This one is mastered!
    { id: 'celtic', title: 'Celtic', solved: 5, total: 30 },
    { id: 'immigrant', title: 'Immigrant Voices', solved: 0, total: 30 },
    { id: 'subcultures', title: 'American Subcultures', solved: 0, total: 30 },
    { id: 'native', title: 'Native Tongues', solved: 0, total: 30 }
];

// --- 2. Populate the UI ---
const worldContainer = document.getElementById('worldContainer');

worldsData.forEach(world => {
    // Check if the world is mastered
    const isMastered = world.solved === world.total ? 'mastered' : '';
    
    const cardHTML = `
        <div class="world-card ${isMastered}" onclick="triggerLeap('${world.id}')">
            <div class="card-info">
                <h3>${world.title}</h3>
                <p>${world.solved} / ${world.total} Solved</p>
            </div>
            <div class="mastered-seal" title="Lexicon Mastered"></div>
        </div>
    `;
    worldContainer.innerHTML += cardHTML;
});

// Dummy function for when a card is clicked
function triggerLeap(worldId) {
    console.log(`Initiating Quantum Leap to: ${worldId}`);
    // Here is where you will eventually call your Ethereal Flash transition!
}

// --- 3. The Infinite Manuscript Canvas Animation ---
const canvas = document.getElementById('manuscriptCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// Ancient letters and fragments to float around
const glyphs = ['Æ', 'Þ', 'Ð', 'Ω', 'Σ', 'ب', 'ت', 'ث', 'A', 'R', 'L', 'O', 'G'];

function resize() {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
}
window.addEventListener('resize', resize);
resize();

class GlyphParticle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.char = glyphs[Math.floor(Math.random() * glyphs.length)];
        this.size = Math.random() * 20 + 10;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around screen
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
    }
    draw() {
        ctx.fillStyle = `rgba(232, 220, 196, ${this.opacity})`;
        ctx.font = `${this.size}px 'Lora', serif`;
        ctx.fillText(this.char, this.x, this.y);
    }
}

// Initialize particles
for (let i = 0; i < 50; i++) {
    particles.push(new GlyphParticle());
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw subtle connecting lines for that "stitching" effect
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
            }
        }
    }
    ctx.stroke();

    // Update and draw glyphs
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

animate();