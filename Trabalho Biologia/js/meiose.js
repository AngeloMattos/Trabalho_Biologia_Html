/**
 * CellLab Interativo - Simulação de Meiose (COMPLETO)
 */

const meioseState = {
    phases1Current: 0,
    phases2Current: 0,
    canvases: {},
    contexts: {},
    speed: 1
};

function renderMeiose() {
    return `
        <div class="meiose">
            <div class="meiose-container">
                <div class="meiose-header">
                    <h2><i class="fas fa-dna"></i> Meiose Interativa</h2>
                    <p>Explore as fases da divisão celular meiótica e a importância do crossing-over</p>
                </div>

                <div class="meiose-divisions">
                    <!-- MEIOSE I -->
                    <div class="division-container">
                        <div class="division-title">
                            <h3>Meiose I - Divisão Reducional</h3>
                            <p>Separação dos cromossomos homólogos</p>
                        </div>

                        <div class="crossing-over-info">
                            <h4><i class="fas fa-link"></i> Crossing-Over</h4>
                            <p>Na Prófase I, cromossomos homólogos trocam segmentos de DNA, criando variação genética!</p>
                        </div>

                        <div class="subfase-tabs">
                            <div class="subfase-tab active" onclick="goToMeiosePhase(0, 1)">Prófase I</div>
                            <div class="subfase-tab" onclick="goToMeiosePhase(1, 1)">Metáfase I</div>
                            <div class="subfase-tab" onclick="goToMeiosePhase(2, 1)">Anáfase I</div>
                            <div class="subfase-tab" onclick="goToMeiosePhase(3, 1)">Telófase I</div>
                        </div>

                        <!-- Imagem Meiose I -->
                        <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; margin-bottom: 1.5rem;">
                            <h4 id="meiose1PhaseName" style="margin-top: 0; color: #8b5cf6; margin-bottom: 1rem;">Prófase I</h4>
                            <img id="meiose1PhaseImage" src="images/profase1.png" 
                                 style="max-width: 100%; max-height: 400px; height: auto; border-radius: 8px; border: 3px solid #8b5cf6; box-shadow: 0 5px 15px rgba(139, 92, 246, 0.2); display: block; margin: 0 auto;">
                            <p id="meiose1PhaseDesc" style="margin-top: 1rem; margin-bottom: 0; font-size: 0.95rem; color: #666; line-height: 1.6;">Os cromossomos se emparelham e ocorre crossing-over.</p>
                        </div>

                        <div class="division-controls">
                            <button class="division-btn division-btn-play" onclick="nextMeiosePhase(1)"><i class="fas fa-chevron-right"></i> Próxima</button>
                            <button class="division-btn division-btn-reset" onclick="resetMeiose1()"><i class="fas fa-redo"></i> Reiniciar</button>
                        </div>
                    </div>

                    <!-- MEIOSE II -->
                    <div class="division-container">
                        <div class="division-title">
                            <h3>Meiose II - Divisão Equacional</h3>
                            <p>Separação das cromátides irmãs</p>
                        </div>

                        <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                            <p style="margin: 0; color: var(--gray-600); font-size: 0.9rem;"><i class="fas fa-info-circle"></i> Similar à mitose, mas com células haplóides</p>
                        </div>

                        <div class="subfase-tabs">
                            <div class="subfase-tab active" onclick="goToMeiosePhase(0, 2)">Prófase II</div>
                            <div class="subfase-tab" onclick="goToMeiosePhase(1, 2)">Metáfase II</div>
                            <div class="subfase-tab" onclick="goToMeiosePhase(2, 2)">Anáfase II</div>
                            <div class="subfase-tab" onclick="goToMeiosePhase(3, 2)">Telófase II</div>
                        </div>

                        <!-- Imagem Meiose II -->
                        <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; margin-bottom: 1.5rem;">
                            <h4 id="meiose2PhaseName" style="margin-top: 0; color: #8b5cf6; margin-bottom: 1rem;">Prófase II</h4>
                            <img id="meiose2PhaseImage" src="images/profase2.png" 
                                 style="max-width: 100%; max-height: 400px; height: auto; border-radius: 8px; border: 3px solid #8b5cf6; box-shadow: 0 5px 15px rgba(139, 92, 246, 0.2); display: block; margin: 0 auto;">
                            <p id="meiose2PhaseDesc" style="margin-top: 1rem; margin-bottom: 0; font-size: 0.95rem; color: #666; line-height: 1.6;">Cromossomos se condensam novamente.</p>
                        </div>

                        <div class="division-controls">
                            <button class="division-btn division-btn-play" onclick="nextMeiosePhase(2)"><i class="fas fa-chevron-right"></i> Próxima</button>
                            <button class="division-btn division-btn-reset" onclick="resetMeiose2()"><i class="fas fa-redo"></i> Reiniciar</button>
                        </div>
                    </div>
                </div>

                <!-- Resultado Final -->
                <div class="meiose-result">
                    <h3><i class="fas fa-check-circle"></i> Resultado Final</h3>
                    <p>Meiose produz 4 células haplóides (com metade dos cromossomos), cada uma geneticamente ÚNICA!</p>
                    <div class="result-cells">
                        <div class="result-cell">1n ♀</div>
                        <div class="result-cell">1n ♂</div>
                        <div class="result-cell">1n ♀</div>
                        <div class="result-cell">1n ♂</div>
                    </div>
                </div>

                <!-- Cards educacionais -->
                <div class="meiose-education">
                    <div class="education-card">
                        <h4><i class="fas fa-dna"></i> Variação Genética</h4>
                        <p>Através do crossing-over e segregação aleatória, meiose cria diversidade genética. Nenhuma célula é igual!</p>
                    </div>

                    <div class="education-card">
                        <h4><i class="fas fa-mars-and-venus"></i> Reprodução Sexual</h4>
                        <p>Meiose produz gametas. A fusão de dois gametas haplóides forma um zigoto diplóide.</p>
                    </div>

                    <div class="education-card">
                        <h4><i class="fas fa-book"></i> vs Mitose</h4>
                        <p>Mitose = 2 células idênticas. Meiose = 4 células diferentes com metade dos cromossomos.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

const meioseInfo = {
    phase1: [
        { name: 'Prófase I', desc: 'Cromossomos se emparelham (sinapse) e ocorre crossing-over (recombinação genética).' },
        { name: 'Metáfase I', desc: 'Pares de cromossomos homólogos se alinham no equador da célula.' },
        { name: 'Anáfase I', desc: 'Cromossomos homólogos se separam e se movem para polos opostos.' },
        { name: 'Telófase I', desc: 'Envoltório nuclear se reforma. A célula se divide em duas.' }
    ],
    phase2: [
        { name: 'Prófase II', desc: 'Cromossomos se condensam novamente. Cada célula tem conjunto haplóide.' },
        { name: 'Metáfase II', desc: 'Cromossomos se alinham individualmente no equador.' },
        { name: 'Anáfase II', desc: 'Cromátides irmãs se separam e se movem para os polos.' },
        { name: 'Telófase II', desc: 'Formam-se 4 células haplóides (gametas), cada uma geneticamente única!' }
    ]
};

function initMeiose() {
    const img1 = document.getElementById('meiose1PhaseImage');
    const img2 = document.getElementById('meiose2PhaseImage');
    
    if (!img1 || !img2) return;

    // Mostra as primeiras imagens
    updateMeioseImage(0, 1);
    updateMeioseImage(0, 2);
}

function updateMeioseImage(phase, division) {
    const imageNames1 = ['profase1', 'metafase1', 'anafase1', 'telofase1'];
    const imageNames2 = ['profase2', 'metafase2', 'anafase2', 'telofase2'];

    if (division === 1) {
        const img = document.getElementById('meiose1PhaseImage');
        const name = document.getElementById('meiose1PhaseName');
        const desc = document.getElementById('meiose1PhaseDesc');

        if (img && name && desc) {
            img.src = `images/${imageNames1[phase]}.png`;
            img.alt = meioseInfo.phase1[phase].name;
            name.textContent = meioseInfo.phase1[phase].name;
            desc.textContent = meioseInfo.phase1[phase].desc;

            // Anima a mudança da imagem
            img.style.opacity = '0.5';
            setTimeout(() => {
                img.style.transition = 'opacity 0.3s ease';
                img.style.opacity = '1';
            }, 50);
        }
    } else {
        const img = document.getElementById('meiose2PhaseImage');
        const name = document.getElementById('meiose2PhaseName');
        const desc = document.getElementById('meiose2PhaseDesc');

        if (img && name && desc) {
            img.src = `images/${imageNames2[phase]}.png`;
            img.alt = meioseInfo.phase2[phase].name;
            name.textContent = meioseInfo.phase2[phase].name;
            desc.textContent = meioseInfo.phase2[phase].desc;

            // Anima a mudança da imagem
            img.style.opacity = '0.5';
            setTimeout(() => {
                img.style.transition = 'opacity 0.3s ease';
                img.style.opacity = '1';
            }, 50);
        }
    }
}

function goToMeiosePhase(phase, division) {
    if (division === 1) {
        meioseState.phases1Current = phase;

        document.querySelectorAll('.meiose-divisions .division-container:first-child .subfase-tab').forEach((tab, i) => {
            tab.classList.toggle('active', i === phase);
        });

        updateMeioseImage(phase, 1);

    } else {
        meioseState.phases2Current = phase;

        document.querySelectorAll('.meiose-divisions .division-container:last-child .subfase-tab').forEach((tab, i) => {
            tab.classList.toggle('active', i === phase);
        });

        updateMeioseImage(phase, 2);
    }
}

function nextMeiosePhase(division) {
    if (division === 1) {
        if (meioseState.phases1Current < 3) {
            goToMeiosePhase(meioseState.phases1Current + 1, 1);
        }
    } else {
        if (meioseState.phases2Current < 3) {
            goToMeiosePhase(meioseState.phases2Current + 1, 2);
        }
    }
}

function resetMeiose1() {
    goToMeiosePhase(0, 1);
}

function resetMeiose2() {
    goToMeiosePhase(0, 2);
}

window.initMeiose = initMeiose;
window.goToMeiosePhase = goToMeiosePhase;
window.nextMeiosePhase = nextMeiosePhase;
window.resetMeiose1 = resetMeiose1;
window.resetMeiose2 = resetMeiose2;