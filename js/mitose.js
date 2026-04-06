/**
 * CellLab Interativo - Simulação de Mitose
 * Renderiza e controla a simulação interativa de mitose
 */

// Estado da simulação de mitose
const mitoseState = {
    currentPhase: 0,
    isAnimating: false,
    speed: 1,
    images: {
        profase: new Image(),
        metafase: new Image(),
        anafase: new Image(),
        telofase: new Image()
    },
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

                <!-- Imagem real da fase -->
                <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; margin-bottom: 2rem;">
                    <h3 id="phaseName" margin-bottom: 1rem;">${mitoseState.phases[0].name}</h3>
                    <img id="mitosePhaseImage" src="images/profase.png" 
                         style="max-width: 100%; max-height: 500px; height: auto; border-radius: 12px; border: 3px solid #ffffff; box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2); display: block; margin: 0 auto;">
                    <p id="phaseDescription" style="margin-top: 1rem; margin-bottom: 0; font-size: 1rem; color: #666; line-height: 1.6;">${mitoseState.phases[0].description}</p>
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
                
                </div>

                <!-- Controle de velocidade -->
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
    const phaseImage = document.getElementById('mitosePhaseImage');
    if (!phaseImage) return;

    // Carrega imagens
    mitoseState.images.profase.src = 'images/profase.png';
    mitoseState.images.metafase.src = 'images/metafase.png';
    mitoseState.images.anafase.src = 'images/anafase.png';
    mitoseState.images.telofase.src = 'images/telofase.png';

    // Mostra a primeira imagem
    updatePhaseImage(0);
}

/**
 * Atualiza a imagem da fase
 */
function updatePhaseImage(phase) {
    const phaseImage = document.getElementById('mitosePhaseImage');
    const phaseName = document.getElementById('phaseName');
    const phaseDescription = document.getElementById('phaseDescription');

    if (!phaseImage) return;

    const imageNames = ['profase', 'metafase', 'anafase', 'telofase'];
    phaseImage.src = `images/${imageNames[phase]}.png`;
    phaseImage.alt = mitoseState.phases[phase].name;

    if (phaseName) {
        phaseName.textContent = mitoseState.phases[phase].name;
    }

    if (phaseDescription) {
        phaseDescription.textContent = mitoseState.phases[phase].description;
    }

    // Anima a mudança da imagem
    phaseImage.style.opacity = '0.5';
    setTimeout(() => {
        phaseImage.style.transition = 'opacity 0.3s ease';
        phaseImage.style.opacity = '1';
    }, 50);
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

    // Atualiza indicadores
    document.querySelectorAll('.phase-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === phase);
    });

    // Atualiza a imagem
    updatePhaseImage(phase);
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