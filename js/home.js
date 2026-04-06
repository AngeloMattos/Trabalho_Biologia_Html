/**
 * CellLab Interativo - Tela Home
 * Renderiza e gerencia a tela inicial com animações
 */

/**
 * Renderiza a tela home
 */
function renderHome() {
    return `
        <div class="home">
            <!-- Partículas de fundo -->
            <div class="home-particles" id="particlesContainer"></div>

            <!-- Conteúdo principal -->
            <div class="home-content">
                <div class="home-header">
                    <div class="home-logo"></div>
                    <h1 class="home-title">CellLab Interativo</h1>
                    <p class="home-subtitle">Aprenda Mitose e Meiose de forma Dinâmica e Interativa</p>
                </div>

                <!-- Botões principais -->
                <div class="home-buttons">
                    <div class="home-btn-card" onclick="navigateTo('mitose')">
                        <i class="fas fa-circle-notch"></i>
                        <span>Explorar Mitose</span>
                        <p>Entenda o processo de divisão celular mitótica</p>
                    </div>

                    <div class="home-btn-card" onclick="navigateTo('meiose')">
                        <i class="fas fa-dna"></i>
                        <span>Explorar Meiose</span>
                        <p>Descubra as fases da divisão meiótica</p>
                    </div>

                    <div class="home-btn-card" onclick="navigateTo('comparacao')">
                        <i class="fas fa-balance-scale"></i>
                        <span>Modo Comparação</span>
                        <p>Veja mitose e meiose lado a lado</p>
                    </div>



                <div class="home-footer">
                </div>
            </div>
        </div>
    `;
}

/**
 * Inicializa efeitos da página home
 */
function initHome() {
    createParticles();
    addHomeAnimations();
}

/**
 * Cria partículas animadas no fundo
 */
function createParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;

    const particleCount = window.innerWidth > 768 ? 50 : 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = `particle particle-${(i % 3) + 1}`;
        
        // Posição aleatória
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Duração aleatória
        const duration = 15 + Math.random() * 20;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // Opacidade aleatória
        particle.style.opacity = Math.random() * 0.5 + 0.3;

        container.appendChild(particle);
    }
}

/**
 * Adiciona animações aos elementos da home
 */
function addHomeAnimations() {
    const buttons = document.querySelectorAll('.home-btn-card');
    buttons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            btn.style.transition = 'all 0.6s ease-out';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 100 + index * 100);
    });

    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Inicializa quando renderizada
setTimeout(initHome, 100);