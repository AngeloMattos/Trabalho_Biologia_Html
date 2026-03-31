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

                        <div class="division-canvas-wrapper">
                            <canvas id="meiose1Canvas" width="450" height="400"></canvas>
                        </div>

                        <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                            <h4 id="meiose1PhaseName" style="color: var(--secondary); margin: 0 0 0.5rem 0;">Prófase I</h4>
                            <p id="meiose1PhaseDesc" style="margin: 0; color: var(--gray-600); font-size: 0.95rem;">Os cromossomos se emparelham e ocorre crossing-over.</p>
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

                        <div class="division-canvas-wrapper">
                            <canvas id="meiose2Canvas" width="450" height="400"></canvas>
                        </div>

                        <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                            <h4 id="meiose2PhaseName" style="color: var(--secondary); margin: 0 0 0.5rem 0;">Prófase II</h4>
                            <p id="meiose2PhaseDesc" style="margin: 0; color: var(--gray-600); font-size: 0.95rem;">Cromossomos se condensam novamente.</p>
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
    const c1 = document.getElementById('meiose1Canvas');
    const c2 = document.getElementById('meiose2Canvas');
    
    if (!c1 || !c2) return;

    const ctx1 = c1.getContext('2d');
    const ctx2 = c2.getContext('2d');

    meioseState.canvases = { 1: c1, 2: c2 };
    meioseState.contexts = { 1: ctx1, 2: ctx2 };

    drawMeioseDivision(ctx1, 0, 1);
    drawMeioseDivision(ctx2, 0, 2);
}

function drawMeioseDivision(ctx, phase, division) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    ctx.fillStyle = 'rgba(245, 247, 250, 1)';
    ctx.fillRect(0, 0, w, h);

    if (division === 1) {
        drawMeiose1Phase(ctx, phase, cx, cy);
    } else {
        drawMeiose2Phase(ctx, phase, cx, cy);
    }
}

function drawMeiose1Phase(ctx, phase, cx, cy) {
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, 100, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = 0.8;

    if (phase === 0) { // Prófase I
        // Cromossomos emparelhados com crossing-over
        ctx.fillStyle = '#ef4444';
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.ellipse(cx - 50 + i * 50, cy - 40, 15, 8, 0.3, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.fillStyle = '#f87171';
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.ellipse(cx - 50 + i * 50, cy + 40, 15, 8, -0.3, 0, Math.PI * 2);
            ctx.fill();
        }

        // Crossing-over visual
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(cx - 50 + i * 50 - 12, cy - 5);
            ctx.lineTo(cx - 50 + i * 50 + 12, cy + 5);
            ctx.stroke();
        }

    } else if (phase === 1) { // Metáfase I
        ctx.fillStyle = '#ef4444';
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.ellipse(cx - 50 + i * 50, cy, 16, 10, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(cx - 80, cy);
        ctx.lineTo(cx + 80, cy);
        ctx.stroke();
        ctx.setLineDash([]);

    } else if (phase === 2) { // Anáfase I
        ctx.fillStyle = '#10b981';
        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.arc(cx - 70 + i * 24, cy - 50, 6, 0, Math.PI * 2);
            ctx.fill();
        }
        
        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.arc(cx - 70 + i * 24, cy + 50, 6, 0, Math.PI * 2);
            ctx.fill();
        }

    } else if (phase === 3) { // Telófase I
        // Célula 1
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx - 60, cy, 55, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx - 60, cy, 22, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#ef4444';
        ctx.globalAlpha = 0.5;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(cx - 70 + i * 20, cy, 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Célula 2
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx + 60, cy, 55, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx + 60, cy, 22, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#3b82f6';
        ctx.globalAlpha = 0.5;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(cx + 50 + i * 20, cy, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.globalAlpha = 1;
}

function drawMeiose2Phase(ctx, phase, cx, cy) {
    if (phase < 2) {
        // Prófase II e Metáfase II - 2 células
        drawMeiose2TwoCells(ctx, phase, cx, cy);
    } else {
        // Anáfase II e Telófase II - 4 células
        drawMeiose2FourCells(ctx, phase, cx, cy);
    }
}

function drawMeiose2TwoCells(ctx, phase, cx, cy) {
    const offset = 55;

    // Célula 1 (esquerda)
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx - offset, cy, 50, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.globalAlpha = 0.7;
    if (phase === 0) {
        ctx.beginPath();
        ctx.ellipse(cx - offset - 8, cy - 10, 10, 6, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(cx - offset + 8, cy + 10, 10, 6, 0.3, 0, Math.PI * 2);
        ctx.fill();
    } else {
        ctx.beginPath();
        ctx.ellipse(cx - offset - 6, cy, 8, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(cx - offset + 6, cy, 8, 5, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // Célula 2 (direita)
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx + offset, cy, 50, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#3b82f6';
    ctx.globalAlpha = 0.7;
    if (phase === 0) {
        ctx.beginPath();
        ctx.ellipse(cx + offset - 8, cy - 10, 10, 6, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(cx + offset + 8, cy + 10, 10, 6, 0.3, 0, Math.PI * 2);
        ctx.fill();
    } else {
        ctx.beginPath();
        ctx.ellipse(cx + offset - 6, cy, 8, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(cx + offset + 6, cy, 8, 5, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.globalAlpha = 1;
}

function drawMeiose2FourCells(ctx, phase, cx, cy) {
    const positions = [
        { x: cx - 60, y: cy - 60, color: '#ef4444' },
        { x: cx + 60, y: cy - 60, color: '#3b82f6' },
        { x: cx - 60, y: cy + 60, color: '#10b981' },
        { x: cx + 60, y: cy + 60, color: '#f59e0b' }
    ];

    positions.forEach(pos => {
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 35, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = pos.color;
        ctx.globalAlpha = 0.6;

        if (phase === 2) { // Anáfase II
            ctx.beginPath();
            ctx.arc(pos.x - 8, pos.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(pos.x + 8, pos.y, 3, 0, Math.PI * 2);
            ctx.fill();
        } else { // Telófase II
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    ctx.globalAlpha = 1;
}

function goToMeiosePhase(phase, division) {
    if (division === 1) {
        meioseState.phases1Current = phase;
        const info = meioseInfo.phase1[phase];
        document.getElementById('meiose1PhaseName').textContent = info.name;
        document.getElementById('meiose1PhaseDesc').textContent = info.desc;

        document.querySelectorAll('.meiose-divisions .division-container:first-child .subfase-tab').forEach((tab, i) => {
            tab.classList.toggle('active', i === phase);
        });

        const ctx = meioseState.contexts[1];
        if (ctx) drawMeioseDivision(ctx, phase, 1);

    } else {
        meioseState.phases2Current = phase;
        const info = meioseInfo.phase2[phase];
        document.getElementById('meiose2PhaseName').textContent = info.name;
        document.getElementById('meiose2PhaseDesc').textContent = info.desc;

        document.querySelectorAll('.meiose-divisions .division-container:last-child .subfase-tab').forEach((tab, i) => {
            tab.classList.toggle('active', i === phase);
        });

        const ctx = meioseState.contexts[2];
        if (ctx) drawMeioseDivision(ctx, phase, 2);
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