// Initialize AOS (Animate On Scroll) when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    initializeChart();
    initializeScrollAnimations();
    initializeParticles();
});

// Tab navigation system
function initializeTabs() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const tabId = link.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            tabLinks.forEach(item => item.classList.remove('active'));
            tabContents.forEach(item => item.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            link.classList.add('active');
            document.getElementById(tabId).classList.add('active');

            // Scroll to top of content smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

// Initialize Chart.js for benefits visualization
function initializeChart() {
    const benefitsCtx = document.getElementById('benefitsChart');
    if (!benefitsCtx) return;

    const gradient1 = benefitsCtx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient1.addColorStop(0, 'rgba(156, 163, 175, 0.8)');
    gradient1.addColorStop(1, 'rgba(156, 163, 175, 0.4)');

    const gradient2 = benefitsCtx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient2.addColorStop(0, 'rgba(99, 102, 241, 1)');
    gradient2.addColorStop(1, 'rgba(236, 72, 153, 0.8)');

    new Chart(benefitsCtx, {
        type: 'bar',
        data: {
            labels: ['Anticipation des Besoins', 'Efficacité Énergétique', 'Qualité de Service (QoS)'],
            datasets: [
                {
                    label: 'Avant Optimisation IA',
                    data: [30, 50, 60],
                    backgroundColor: gradient1,
                    borderColor: '#9ca3af',
                    borderWidth: 2,
                    borderRadius: 8,
                },
                {
                    label: 'Après Optimisation IA',
                    data: [90, 75, 85],
                    backgroundColor: gradient2,
                    borderColor: '#6366f1',
                    borderWidth: 2,
                    borderRadius: 8,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(99, 102, 241, 0.1)',
                        lineWidth: 1
                    },
                    ticks: {
                        color: '#64748b',
                        font: {
                            family: 'Poppins',
                            size: 12
                        }
                    },
                    title: {
                        display: true,
                        text: 'Efficacité (Score hypothétique / 100)',
                        color: '#1e293b',
                        font: {
                            family: 'Poppins',
                            size: 14,
                            weight: '600'
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#1e293b',
                        font: {
                            family: 'Poppins',
                            size: 12,
                            weight: '500'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#1e293b',
                        font: {
                            family: 'Poppins',
                            size: 13,
                            weight: '500'
                        },
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                title: {
                    display: true,
                    text: 'Comparaison de l\'efficacité avant et après l\'IA',
                    color: '#1e293b',
                    font: {
                        family: 'Poppins',
                        size: 18,
                        weight: '700'
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(30, 41, 59, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#e2e8f0',
                    borderColor: '#6366f1',
                    borderWidth: 1,
                    padding: 12,
                    titleFont: {
                        family: 'Poppins',
                        size: 14,
                        weight: '600'
                    },
                    bodyFont: {
                        family: 'Poppins',
                        size: 13
                    },
                    cornerRadius: 8
                }
            }
        }
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.card, .benefit-card, .challenge-card, .implementation-card, .diagram-box').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Animated background particles
function initializeParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((particleA, indexA) => {
            particles.slice(indexA + 1).forEach(particleB => {
                const dx = particleA.x - particleB.x;
                const dy = particleA.y - particleB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particleA.x, particleA.y);
                    ctx.lineTo(particleB.x, particleB.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    init();
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
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

// Add hover sound effect (optional - can be enabled/disabled)
function addHoverEffects() {
    const cards = document.querySelectorAll('.card, .tab-link');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

addHoverEffects();

// Keyboard navigation for tabs
document.addEventListener('keydown', (e) => {
    const activeTab = document.querySelector('.tab-link.active');
    const allTabs = Array.from(document.querySelectorAll('.tab-link'));
    const currentIndex = allTabs.indexOf(activeTab);

    if (e.key === 'ArrowRight' && currentIndex < allTabs.length - 1) {
        allTabs[currentIndex + 1].click();
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        allTabs[currentIndex - 1].click();
    }
});
