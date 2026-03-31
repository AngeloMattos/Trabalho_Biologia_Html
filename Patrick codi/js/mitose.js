/**
 * CellLab Interativo - Simulação de Mitose
 * Renderiza e controla a simulação interativa de mitose
 */

// Estado da simulação de mitose
const mitoseState = {
    currentPhase: 0,
    isAnimating: false,
    speed: 1,
    phases: [
        { name: 'Prófase', description: 'Os cromossomos se condensam e se tornam visíveis. O envoltório nuclear desaparece.' },
        { name: 'Metáfase', description: 'Os cromossomos se alinham no equador da célula (placa metafásica).' },
        { name: 'Anáfase', description: 'Os cromossomos se separam e se movem para os polos opostos da célula.' },
        { name: 'Telófase', description: 'O envoltório nuclear se reforma em torno dos cromossomos em cada polo.' }
    ]
};

/**
 * Renderiza a tela de mitose
 */
function renderMitose() {
    return `
        <div class="mitose">
            <div class="mitose-container">
                <!-- Header -->
                <div class="mitose-header">
                    <h2><i class="fas fa-circle-notch"></i> Mitose Interativa</h2>
                    <p>Explore as fases da divisão celular mitótica</p>
                </div>

                <!-- Simulação -->
                <div class="simulation-area">
                    <canvas id="mitoseCanvas" width="600" height="400"></canvas>
                </div>

                <!-- Info da fase -->
                <div class="phase-info">
                    <h3 id="phaseName">${mitoseState.phases[0].name}</h3>
                    <p id="phaseDescription">${mitoseState.phases[0].description}</p>
                </div>

                <!-- Indicador de fases -->
                <div class="phases-indicator">
                    ${mitoseState.phases.map((phase, index) => `
                        <div class="phase-dot ${index === 0 ? 'active' : ''}" onclick="setMitosePhase(${index})" title="${phase.name}">
                            ${index + 1}
                        </div>
                    `).join('')}
                </div>

                <!-- Controles -->
                <div class="controls-section">
                    <button class="btn-control btn-prev" onclick="previousMitosePhase()">
                        <i class="fas fa-chevron-left"></i> Anterior
                    </button>
                    <button class="btn-control btn-next" onclick="nextMitosePhase()">
                        Próximo <i class="fas fa-chevron-right"></i>
                    </button>
                    <button class="btn-control btn-reset" onclick="resetMitose()">
                        <i class="fas fa-redo"></i> Reiniciar
                    </button>
                </div>

                <!-- Controle de velocidade -->
                <div class="speed-control">
                    <label for="mitoseSpeed">Velocidade da Animação:</label>
                    <input type="range" id="mitoseSpeed" min="0.5" max="2" step="0.5" value="1" onchange="setMitoseSpeed(this.value)">
                    <span id="speedValue">1x</span>
                </div>

                <!-- Cards informativos -->
                <div class="mitose-info-cards">
                    <div class="info-card">
                        <h4><i class="fas fa-info-circle"></i> O que é Mitose?</h4>
                        <p>Mitose é o processo de divisão do núcleo celular que resulta em duas células-filhas geneticamente idênticas à célula-mãe.</p>
                    </div>

                    <div class="info-card">
                        <h4><i class="fas fa-dna"></i> Cromossomos</h4>
                        <p>Cada cromossomo é uma estrutura que contém DNA. Durante a mitose, os cromossomos se separam para garantir que cada célula-filha receba uma cópia completa.</p>
                    </div>

                    <div class="info-card">
                        <h4><i class="fas fa-check-circle"></i> Importância</h4>
                        <p>A mitose é essencial para o crescimento, desenvolvimento e manutenção dos organismos vivos, permitindo a reposição de células danificadas.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Inicializa a simulação de mitose
 */
function initMitose() {
    const canvas = document.getElementById('mitoseCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    mitoseState.canvas = canvas;
    mitoseState.ctx = ctx;

    // Ajusta tamanho do canvas
    adjustCanvasSize(canvas);

    // Desenha a primeira fase
    drawMitose(ctx, 0);

    // Adiciona event listeners
    window.addEventListener('resize', () => {
        adjustCanvasSize(canvas);
        drawMitose(ctx, mitoseState.currentPhase);
    });
}

/**
 * Ajusta o tamanho do canvas
 */
function adjustCanvasSize(canvas) {
    const container = canvas.parentElement;
    const width = Math.min(container.clientWidth - 40, 600);
    const ratio = canvas.height / canvas.width;
    
    canvas.style.width = width + 'px';
    canvas.style.height = (width * ratio) + 'px';
}

/**
 * Desenha a fase atual de mitose
 */
function drawMitose(ctx, phase) {
    const canvas = ctx.canvas;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const cellRadius = 120;

    // Limpa o canvas
    ctx.fillStyle = 'rgba(245, 247, 250, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha a célula (membrana)
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, cellRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Desenha de acordo com a fase
    switch(phase) {
        case 0: // Prófase
            drawProfase(ctx, centerX, centerY, cellRadius);
            break;
        case 1: // Metáfase
            drawMetafase(ctx, centerX, centerY, cellRadius);
            break;
        case 2: // Anáfase
            drawAnafase(ctx, centerX, centerY, cellRadius);
            break;
        case 3: // Telófase
            drawTelofase(ctx, centerX, centerY, cellRadius);
            break;
    }

    // Desenha asters (radiações do centrossomo)
    drawAsters(ctx, centerX, centerY, phase);
}

/**
 * Desenha Prófase
 */
function drawProfase(ctx, centerX, centerY, cellRadius) {
    // Cromossomos condensados (espiral)
    const chromosomeCount = 4;
    ctx.fillStyle = '#ef4444';
    ctx.globalAlpha = 0.8;

    for (let i = 0; i < chromosomeCount; i++) {
        const angle = (i / chromosomeCount) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * 60;
        const y = centerY + Math.sin(angle) * 60;

        // Desenha cromossomo como forma ondulada
        ctx.beginPath();
        ctx.ellipse(x, y, 15, 8, angle, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.globalAlpha = 1;

    // Centríolos em formação
    drawCentrioles(ctx, centerX - 40, centerY - 80, 1);
    drawCentrioles(ctx, centerX + 40, centerY + 80, 1);
}

/**
 * Desenha Metáfase
 */
function drawMetafase(ctx, centerX, centerY, cellRadius) {
    // Cromossomos alinhados no equador
    const chromosomeCount = 8;
    ctx.fillStyle = '#ef4444';
    ctx.globalAlpha = 0.8;

    for (let i = 0; i < chromosomeCount; i++) {
        const x = centerX - 60 + (i * 15);
        const y = centerY;

        ctx.beginPath();
        ctx.ellipse(x, y, 10, 6, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.globalAlpha = 1;

    // Placa metafásica (linha)
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(centerX - 70, centerY);
    ctx.lineTo(centerX + 70, centerY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Centríolos nos polos
    drawCentrioles(ctx, centerX, centerY - 100, 1);
    drawCentrioles(ctx, centerX, centerY + 100, 1);
}

/**
 * Desenha Anáfase
 */
function drawAnafase(ctx, centerX, centerY, cellRadius) {
    // Cromossomos se separando
    const chromosomeCount = 8;
    ctx.fillStyle = '#10b981';
    ctx.globalAlpha = 0.8;

    // Cromossomos do polo superior
    for (let i = 0; i < chromosomeCount / 2; i++) {
        const x = centerX - 40 + (i * 20);
        const y = centerY - 60;

        ctx.beginPath();
        ctx.ellipse(x, y, 8, 5, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // Cromossomos do polo inferior
    for (let i = 0; i < chromosomeCount / 2; i++) {
        const x = centerX - 40 + (i * 20);
        const y = centerY + 60;

        ctx.beginPath();
        ctx.ellipse(x, y, 8, 5, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.globalAlpha = 1;

    // Centríolos nos polos
    drawCentrioles(ctx, centerX, centerY - 80, 1);
    drawCentrioles(ctx, centerX, centerY + 80, 1);
}

/**
 * Desenha Telófase
 */
function drawTelofase(ctx, centerX, centerY, cellRadius) {
    // Duas células formando
    const cellOffset = 70;

    // Célula 1
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX - cellOffset, centerY, 60, 0, Math.PI * 2);
    ctx.stroke();

    // Núcleo 1
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX - cellOffset, centerY, 25, 0, Math.PI * 2);
    ctx.stroke();

    // Cromossomos em núcleo 1
    ctx.fillStyle = '#10b981';
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const x = centerX - cellOffset + Math.cos(angle) * 12;
        const y = centerY + Math.sin(angle) * 12;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    // Célula 2
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX + cellOffset, centerY, 60, 0, Math.PI * 2);
    ctx.stroke();

    // Núcleo 2
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX + cellOffset, centerY, 25, 0, Math.PI * 2);
    ctx.stroke();

    // Cromossomos em núcleo 2
    ctx.fillStyle = '#10b981';
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const x = centerX + cellOffset + Math.cos(angle) * 12;
        const y = centerY + Math.sin(angle) * 12;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.globalAlpha = 1;
}

/**
 * Desenha centríolos
 */
function drawCentrioles(ctx, x, y, count) {
    ctx.fillStyle = '#6366f1';
    ctx.globalAlpha = 0.7;

    for (let i = 0; i < count; i++) {
        ctx.beginPath();
        ctx.arc(x + i * 8, y, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.globalAlpha = 1;
}

/**
 * Desenha asters (radiações do centrossomo)
 */
function drawAsters(ctx, centerX, centerY, phase) {
    if (phase === 0 || phase === 1) {
        // Prófase e Metáfase: asters simples
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
        ctx.lineWidth = 1;

        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const fromX = centerX + Math.cos(angle) * 5;
            const fromY = centerY + Math.sin(angle) * 5;
            const toX = centerX + Math.cos(angle) * 50;
            const toY = centerY + Math.sin(angle) * 50;

            ctx.beginPath();
            ctx.moveTo(fromX, fromY);
            ctx.lineTo(toX, toY);
            ctx.stroke();
        }
    } else if (phase === 2) {
        // Anáfase: asters em ambos os polos
        drawAstersPolo(ctx, centerX, centerY - 100);
        drawAstersPolo(ctx, centerX, centerY + 100);
    } else if (phase === 3) {
        // Telófase: asters em ambas as células
        drawAstersPolo(ctx, centerX - 70, centerY);
        drawAstersPolo(ctx, centerX + 70, centerY);
    }
}

/**
 * Desenha asters em um polo específico
 */
function drawAstersPolo(ctx, centerX, centerY) {
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
    ctx.lineWidth = 1;

    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const fromX = centerX + Math.cos(angle) * 3;
        const fromY = centerY + Math.sin(angle) * 3;
        const toX = centerX + Math.cos(angle) * 30;
        const toY = centerY + Math.sin(angle) * 30;

        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
    }
}

/**
 * Avança para a próxima fase
 */
function nextMitosePhase() {
    if (mitoseState.currentPhase < mitoseState.phases.length - 1) {
        setMitosePhase(mitoseState.currentPhase + 1);
    }
}

/**
 * Volta para a fase anterior
 */
function previousMitosePhase() {
    if (mitoseState.currentPhase > 0) {
        setMitosePhase(mitoseState.currentPhase - 1);
    }
}

/**
 * Define a fase atual
 */
function setMitosePhase(phase) {
    mitoseState.currentPhase = phase;

    // Atualiza informações
    const phaseName = document.getElementById('phaseName');
    const phaseDescription = document.getElementById('phaseDescription');

    if (phaseName && phaseDescription) {
        phaseName.textContent = mitoseState.phases[phase].name;
        phaseDescription.textContent = mitoseState.phases[phase].description;

        // Anima a atualização
        phaseName.style.opacity = '0.5';
        phaseName.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            phaseName.style.transition = 'all 0.3s ease';
            phaseName.style.opacity = '1';
            phaseName.style.transform = 'translateY(0)';
        }, 10);
    }

    // Atualiza indicadores
    document.querySelectorAll('.phase-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === phase);
    });

    // Redesenha o canvas
    if (mitoseState.ctx) {
        drawMitose(mitoseState.ctx, phase);
    }
}

/**
 * Reinicia a simulação
 */
function resetMitose() {
    setMitosePhase(0);
}

/**
 * Define a velocidade da animação
 */
function setMitoseSpeed(speed) {
    mitoseState.speed = parseFloat(speed);
    document.getElementById('speedValue').textContent = speed + 'x';
}

// Exporta para escopo global
window.nextMitosePhase = nextMitosePhase;
window.previousMitosePhase = previousMitosePhase;
window.setMitosePhase = setMitosePhase;
window.resetMitose = resetMitose;
window.setMitoseSpeed = setMitoseSpeed;
window.initMitose = initMitose;