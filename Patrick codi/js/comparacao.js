/**
 * CellLab Interativo - Modo Comparação
 * Sistema de comparação dinâmica entre Mitose e Meiose
 * Explicações visuais por PASSOS
 */

// ================================================================
// CONFIGURAÇÃO E CONSTANTES
// ================================================================

const PHASES_EXPLANATION = {
    0: {
        name: 'Prófase',
        mitose: {
            steps: [
                { title: 'Condensação', desc: 'Cromossomos se condensam e se tornam visíveis' },
                { title: 'Desaparecimento Nuclear', desc: 'O núcleo desaparece para dar passagem' },
                { title: 'Formação de Asters', desc: 'Centríolos se movem para os polos' }
            ]
        },
        meiose: {
            steps: [
                { title: 'Emparelhamento', desc: 'Cromossomos homólogos se pareiam (sinapse)' },
                { title: 'Crossing-Over 🔗', desc: 'Cromossomos trocam segmentos de DNA!' },
                { title: 'Bivalentes', desc: 'Pares de cromossomos se formam' }
            ]
        }
    },
    1: {
        name: 'Metáfase',
        mitose: {
            steps: [
                { title: 'Alinhamento', desc: 'Cromossomos se alinham no equador' },
                { title: 'Fixação', desc: 'Cada cromossomo se prende às fibras' },
                { title: 'Preparação', desc: 'Sistema pronto para separação' }
            ]
        },
        meiose: {
            steps: [
                { title: 'Alinhamento de Pares', desc: 'Pares homólogos se alinham' },
                { title: 'Diferença', desc: 'Alinha PARES, não individuais' },
                { title: 'Redução', desc: 'Preparação para reduzir cromossomos' }
            ]
        }
    },
    2: {
        name: 'Anáfase',
        mitose: {
            steps: [
                { title: 'Separação', desc: 'Cromátides se separam' },
                { title: 'Movimento', desc: 'Cromossomos se movem aos polos' },
                { title: 'Dois Conjuntos', desc: 'Dois conjuntos idênticos se formam' }
            ]
        },
        meiose: {
            steps: [
                { title: 'Separação 🔄', desc: 'Homólogos se separam' },
                { title: 'Redução', desc: 'Cada polo recebe metade' },
                { title: 'Variação', desc: 'Cada grupo é diferente' }
            ]
        }
    },
    3: {
        name: 'Telófase',
        mitose: {
            steps: [
                { title: 'Reforma Nuclear', desc: 'Novo envoltório se forma' },
                { title: '2 Células Idênticas', desc: 'Duas células irmãs iguais' },
                { title: 'Fim', desc: 'Mesmo número de cromossomos' }
            ]
        },
        meiose: {
            steps: [
                { title: 'Reforma Nuclear', desc: 'Novo envoltório em cada polo' },
                { title: 'Meiose I Completa', desc: '2 células diferentes' },
                { title: 'Próximo Passo', desc: 'Meiose II vem a seguir' }
            ]
        }
    }
};

const COLORS = {
    mitose: {
        primary: '#667eea',
        chromosome: '#ef4444',
        accent: '#fbbf24'
    },
    meiose: {
        primary: '#8b5cf6',
        chromosome1: '#ef4444',
        chromosome2: '#f87171',
        accent: '#fbbf24'
    },
    result: '#10b981'
};

const CANVAS_CONFIG = {
    width: 500,
    height: 450,
    centerOffsetX: 0.5,
    centerOffsetY: 0.5,
    cellRadius: 110,
    chromosomeSize: 14
};

// ================================================================
// ESTADO DA APLICAÇÃO
// ================================================================

const AppState = {
    currentPhase: 0,
    isAnimating: false,
    speed: 1,
    contexts: { mitose: null, meiose: null },
    canvases: { mitose: null, meiose: null },
    animationTimer: null,

    init() {
        this.currentPhase = 0;
        this.isAnimating = false;
    },

    setPhase(phase) {
        this.currentPhase = Math.min(Math.max(phase, 0), 3);
    },

    nextPhase() {
        if (this.currentPhase < 3) this.currentPhase++;
    },

    prevPhase() {
        if (this.currentPhase > 0) this.currentPhase--;
    },

    reset() {
        this.init();
    }
};

// ================================================================
// FUNÇÕES DE RENDERIZAÇÃO HTML
// ================================================================

function renderComparacao() {
    return `
        <div class="comparacao">
            <div class="comparacao-container">
                ${renderHeader()}
                ${renderPhaseIndicator()}
                ${renderComparisonView()}
                ${renderControls()}
                ${renderComparisonTable()}
                ${renderDifferencesGrid()}
                ${renderTimeline()}
            </div>
        </div>
    `;
}

function renderHeader() {
    return `
        <div class="comparacao-header">
            <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1rem;">
                <div style="width: 80px; height: 5px; background: linear-gradient(90deg, #667eea, #764ba2); border-radius: 5px;"></div>
                <h2 style="margin: 0;"><i class="fas fa-balance-scale"></i> Comparação Dinâmica</h2>
                <div style="width: 80px; height: 5px; background: linear-gradient(90deg, #764ba2, #667eea); border-radius: 5px;"></div>
            </div>
            <p>Veja mitose e meiose acontecendo SIMULTANEAMENTE com sincronização perfeita</p>
        </div>
    `;
}

function renderPhaseIndicator() {
    const phase = PHASES_EXPLANATION[AppState.currentPhase];
    return `
        <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%); 
                    padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; text-align: center; 
                    border: 2px solid rgba(99, 102, 241, 0.2);">
            <h3 style="margin: 0; color: var(--primary); font-size: 2rem;">
                <span id="phaseNameLarge">${phase.name}</span>
                <span style="color: var(--gray-400); font-size: 1.5rem;"> / Etapa ${AppState.currentPhase + 1} de 4</span>
            </h3>
        </div>
    `;
}

function renderComparisonView() {
    return `
        <div class="comparison-view-enhanced">
            ${renderComparisonColumn('mitose')}
            ${renderDivider()}
            ${renderComparisonColumn('meiose')}
        </div>
    `;
}

function renderComparisonColumn(type) {
    const isMitose = type === 'mitose';
    const icon = isMitose ? 'fa-circle-notch' : 'fa-dna';
    const title = isMitose ? 'Mitose' : 'Meiose';
    const tag = isMitose ? 'Divisão Somática' : 'Divisão Germinativa';
    const result = isMitose ? 'IDÊNTICAS (2n)' : 'DIFERENTES (1n)';
    const steps = isMitose ? 
        PHASES_EXPLANATION[AppState.currentPhase].mitose.steps : 
        PHASES_EXPLANATION[AppState.currentPhase].meiose.steps;

    return `
        <div class="comparison-column-enhanced ${type}">
            <div class="comparison-column-header ${type}">
                <div class="column-icon"><i class="fas ${icon}"></i></div>
                <h3>${title}</h3>
                <div class="column-tag">${tag}</div>
            </div>

            <div class="comparison-canvas-wrapper-enhanced">
                <canvas id="comp${type.charAt(0).toUpperCase() + type.slice(1)}Canvas" 
                        width="${CANVAS_CONFIG.width}" 
                        height="${CANVAS_CONFIG.height}"></canvas>
                <div class="canvas-overlay">
                    <div class="info-badge ${type}">
                        <span class="badge-label">Resultado: ${isMitose ? '2' : '4'} células</span>
                        <span class="badge-value">${result}</span>
                    </div>
                </div>
            </div>

            <div class="phase-explanation ${type}">
                <div class="explanation-steps">
                    ${steps.map((step, idx) => `
                        <div class="step-item ${type}">
                            <div class="step-number">${idx + 1}</div>
                            <div class="step-content">
                                <h4>${step.title}</h4>
                                <p>${step.desc}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="phase-characteristics">
                ${renderCharacteristics(type)}
            </div>
        </div>
    `;
}

function renderCharacteristics(type) {
    const mitoseChars = [
        ['📊', 'Cromossomos: <strong>Mantém 2n</strong>'],
        ['🔄', 'Tipo: <strong>Equacional</strong>'],
        ['👥', 'Células-filhas: <strong>2</strong>']
    ];
    
    const meioseChars = [
        ['📊', 'Cromossomos: <strong>Reduz para 1n</strong>'],
        ['🔄', 'Tipo: <strong>Reducional</strong>'],
        ['👥', 'Células-filhas: <strong>4</strong>']
    ];

    const chars = type === 'mitose' ? mitoseChars : meioseChars;

    return chars.map(([icon, text]) => `
        <div class="char-item">
            <span class="char-icon">${icon}</span>
            <span class="char-text">${text}</span>
        </div>
    `).join('');
}

function renderDivider() {
    return `
        <div class="comparison-divider">
            <div class="divider-inner">
                <span class="divider-text">VS</span>
            </div>
        </div>
    `;
}

function renderControls() {
    const isFirst = AppState.currentPhase === 0;
    const isLast = AppState.currentPhase === 3;

    return `
        <div class="comparison-controls-enhanced">
            <button class="comp-btn comp-btn-prev" onclick="ComparisonApp.prevPhase()" ${isFirst ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i> Fase Anterior
            </button>

            <div class="phase-progress">
                ${[0, 1, 2, 3].map(i => `
                    <div class="phase-dot-comp ${i === AppState.currentPhase ? 'active' : ''}" 
                         onclick="ComparisonApp.setPhase(${i})" 
                         title="${PHASES_EXPLANATION[i].name}">
                        ${i + 1}
                    </div>
                `).join('')}
            </div>

            <button class="comp-btn comp-btn-next" onclick="ComparisonApp.nextPhase()" ${isLast ? 'disabled' : ''}>
                Próxima Fase <i class="fas fa-chevron-right"></i>
            </button>
        </div>

        <div class="comparison-control-buttons">
            <button class="btn btn-primary" onclick="ComparisonApp.toggleAnimation()">
                <i class="fas fa-play"></i> ${AppState.isAnimating ? 'Pausar' : 'Animar'}
            </button>
            <button class="btn btn-secondary" onclick="ComparisonApp.reset()">
                <i class="fas fa-redo"></i> Reiniciar
            </button>
        </div>
    `;
}

function renderComparisonTable() {
    return `
        <div class="comparison-table-section">
            <h3><i class="fas fa-chart-bar"></i> Tabela Comparativa Completa</h3>
            <div class="table-wrapper">
                <table class="comparison-table-enhanced">
                    <thead>
                        <tr>
                            <th class="th-aspect">Aspecto</th>
                            <th class="th-mitose"><i class="fas fa-circle-notch"></i> Mitose</th>
                            <th class="th-meiose"><i class="fas fa-dna"></i> Meiose</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderTableRows()}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderTableRows() {
    const rows = [
        {
            aspect: '📍 Objetivo',
            mitose: { text: 'Crescimento e Regeneração', badge: 'green' },
            meiose: { text: 'Produção de Gametas', badge: 'purple' },
            highlight: true
        },
        {
            aspect: '🔢 Fases',
            mitose: { text: '1 Divisão (Prófase, Metáfase, Anáfase, Telófase)', badge: null },
            meiose: { text: '2 Divisões (Meiose I + Meiose II)', badge: null },
            highlight: false
        },
        {
            aspect: '📊 Resultado',
            mitose: { text: '<strong>2</strong> células IDÊNTICAS', badge: 'green' },
            meiose: { text: '<strong>4</strong> células DIFERENTES', badge: 'purple' },
            highlight: true
        },
        {
            aspect: '🧬 Cromossomos',
            mitose: { text: 'Mantém 2n (diplóide)', badge: null },
            meiose: { text: 'Reduz para 1n (haplóide)', badge: null },
            highlight: false
        },
        {
            aspect: '🔗 Crossing-over',
            mitose: { text: 'NÃO ocorre', badge: 'gray' },
            meiose: { text: 'Ocorre na Prófase I ⭐', badge: 'orange' },
            highlight: true
        },
        {
            aspect: '👁️ Variação Genética',
            mitose: { text: 'Nenhuma (clones genéticos)', badge: null },
            meiose: { text: 'Máxima variação! 🌟', badge: null },
            highlight: false
        }
    ];

    return rows.map((row, i) => `
        <tr class="${row.highlight ? 'row-highlight' : ''}">
            <td class="aspect-bold">${row.aspect}</td>
            <td>${row.mitose.badge ? `<span class="badge-${row.mitose.badge}">${row.mitose.text}</span>` : row.mitose.text}</td>
            <td>${row.meiose.badge ? `<span class="badge-${row.meiose.badge}">${row.meiose.text}</span>` : row.meiose.text}</td>
        </tr>
    `).join('');
}

function renderDifferencesGrid() {
    const differences = [
        { icon: '🎯', title: 'Objetivo Biológico', mitose: 'Manter corpo funcionando', meiose: 'Criar gametas únicos' },
        { icon: '👥', title: 'Número de Células', mitose: '2 células', meiose: '4 células' },
        { icon: '🧬', title: 'Conteúdo Genético', mitose: 'Igual à mãe', meiose: 'Único e diferente' },
        { icon: '🔗', title: 'Recombinação', mitose: 'Sem variação', meiose: 'Crossing-over ⭐' },
        { icon: '📊', title: 'Resultado de Cromossomos', mitose: '2n (diplóide)', meiose: '1n (haplóide)' },
        { icon: '🌍', title: 'Relevância Evolutiva', mitose: 'Manutenção', meiose: 'Evolução 🚀' }
    ];

    return `
        <div class="key-differences-enhanced">
            <h3><i class="fas fa-star"></i> Diferenças-Chave</h3>
            <div class="differences-grid">
                ${differences.map(diff => `
                    <div class="difference-card-enhanced">
                        <div class="card-icon">${diff.icon}</div>
                        <h4>${diff.title}</h4>
                        <div class="card-split">
                            <div class="split-item mitose-split">
                                <strong>Mitose:</strong> ${diff.mitose}
                            </div>
                            <div class="split-item meiose-split">
                                <strong>Meiose:</strong> ${diff.meiose}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderTimeline() {
    return `
        <div class="timeline-section">
            <h3><i class="fas fa-stream"></i> Cronograma das Fases</h3>
            <div class="timeline-container">
                <div class="timeline-track">
                    ${[0, 1, 2, 3].map(i => `
                        <div class="timeline-item ${i === AppState.currentPhase ? 'active' : ''}" 
                             onclick="ComparisonApp.setPhase(${i})">
                            <div class="timeline-marker"></div>
                            <div class="timeline-label">${PHASES_EXPLANATION[i].name}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// ================================================================
// FUNÇÕES DE DESENHO NO CANVAS
// ================================================================

const Canvas = {
    clear(ctx) {
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        ctx.fillStyle = 'rgba(245, 247, 250, 1)';
        ctx.fillRect(0, 0, w, h);
    },

    drawCellMembrane(ctx, x, y, radius, color) {
        ctx.shadowColor = `rgba(${this.hexToRgb(color)}, 0.3)`;
        ctx.shadowBlur = 20;
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowColor = 'transparent';
    },

    drawChromosome(ctx, x, y, width, height, angle, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.ellipse(x, y, width, height, angle, 0, Math.PI * 2);
        ctx.fill();
    },

    drawChromosomesInCircle(ctx, centerX, centerY, count, radius, color) {
        ctx.fillStyle = color;
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            this.drawChromosome(ctx, x, y, 14, 8, angle, color);
        }
    },

    drawDashedLine(ctx, fromX, fromY, toX, toY, color, lineWidth = 3) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
        ctx.setLineDash([]);
    },

    drawLabel(ctx, text, x, y, color = '#667eea', fontSize = '16px') {
        ctx.fillStyle = color;
        ctx.font = `bold ${fontSize} Poppins`;
        ctx.textAlign = 'center';
        ctx.fillText(text, x, y);
    },

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0';
    }
};

// ================================================================
// FUNÇÕES DE DESENHO - MITOSE
// ================================================================

function drawMitosePhase(ctx, phase) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    Canvas.clear(ctx);
    Canvas.drawCellMembrane(ctx, cx, cy, CANVAS_CONFIG.cellRadius, COLORS.mitose.primary);
    Canvas.drawLabel(ctx, ['Prófase', 'Metáfase', 'Anáfase', 'Telófase'][phase], cx, 35, COLORS.mitose.primary);

    ctx.globalAlpha = 0.85;

    switch(phase) {
        case 0:
            drawMitoseProfase(ctx, cx, cy);
            break;
        case 1:
            drawMitoseMetafase(ctx, cx, cy);
            break;
        case 2:
            drawMitoseAnafase(ctx, cx, cy);
            break;
        case 3:
            drawMitoseTelofase(ctx, cx, cy);
            break;
    }

    ctx.globalAlpha = 1;
}

function drawMitoseProfase(ctx, cx, cy) {
    Canvas.drawChromosomesInCircle(ctx, cx, cy, 4, 60, COLORS.mitose.chromosome);
    drawCentrioles(ctx, cx - 45, cy - 70, COLORS.mitose.primary);
    drawCentrioles(ctx, cx + 45, cy + 70, COLORS.mitose.primary);
}

function drawMitoseMetafase(ctx, cx, cy) {
    const chromosomeCount = 4;
    for (let i = 0; i < chromosomeCount; i++) {
        const x = cx - 55 + i * 37;
        Canvas.drawChromosome(ctx, x, cy, 13, 8, 0, COLORS.mitose.chromosome);
    }
    Canvas.drawDashedLine(ctx, cx - 80, cy, cx + 80, cy, COLORS.mitose.accent);
}

function drawMitoseAnafase(ctx, cx, cy) {
    for (let i = 0; i < 4; i++) {
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(cx - 60 + i * 30, cy - 50, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx - 60 + i * 30, cy + 50, 6, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawMitoseTelofase(ctx, cx, cy) {
    drawTelofaseCell(ctx, cx - 65, cy, COLORS.mitose.primary, COLORS.mitose.chromosome);
    drawTelofaseCell(ctx, cx + 65, cy, COLORS.mitose.primary, COLORS.mitose.chromosome);
    drawDivisionLine(ctx, cx, cy, COLORS.mitose.primary);
}

// ================================================================
// FUNÇÕES DE DESENHO - MEIOSE
// ================================================================

function drawMeiosePhase(ctx, phase) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    Canvas.clear(ctx);
    Canvas.drawCellMembrane(ctx, cx, cy, CANVAS_CONFIG.cellRadius, COLORS.meiose.primary);
    Canvas.drawLabel(ctx, ['Prófase I', 'Metáfase I', 'Anáfase I', 'Telófase I'][phase], cx, 35, COLORS.meiose.primary);

    ctx.globalAlpha = 0.85;

    switch(phase) {
        case 0:
            drawMeioseProfase(ctx, cx, cy);
            break;
        case 1:
            drawMeioseMetafase(ctx, cx, cy);
            break;
        case 2:
            drawMeioseAnafase(ctx, cx, cy);
            break;
        case 3:
            drawMeioseTelofase(ctx, cx, cy);
            break;
    }

    ctx.globalAlpha = 1;
}

function drawMeioseProfase(ctx, cx, cy) {
    Canvas.drawChromosome(ctx, cx - 40, cy - 40, 14, 8, -0.4, COLORS.meiose.chromosome1);
    Canvas.drawChromosome(ctx, cx - 40, cy + 40, 14, 8, 0.4, COLORS.meiose.chromosome2);
    Canvas.drawChromosome(ctx, cx + 50, cy - 40, 14, 8, -0.4, COLORS.meiose.chromosome1);
    Canvas.drawChromosome(ctx, cx + 50, cy + 40, 14, 8, 0.4, COLORS.meiose.chromosome2);

    ctx.strokeStyle = COLORS.meiose.accent;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx - 40 - 15, cy - 40);
    ctx.lineTo(cx - 40 + 15, cy + 40);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx + 50 - 15, cy - 40);
    ctx.lineTo(cx + 50 + 15, cy + 40);
    ctx.stroke();

    Canvas.drawLabel(ctx, 'Crossing-Over 🔗', cx, cy + 85, COLORS.meiose.accent, '12px');
}

function drawMeioseMetafase(ctx, cx, cy) {
    Canvas.drawChromosome(ctx, cx - 50, cy, 15, 10, 0, COLORS.meiose.chromosome1);
    Canvas.drawChromosome(ctx, cx + 50, cy, 15, 10, 0, COLORS.meiose.chromosome2);
    Canvas.drawDashedLine(ctx, cx - 80, cy, cx + 80, cy, COLORS.meiose.accent);
}

function drawMeioseAnafase(ctx, cx, cy) {
    Canvas.drawChromosome(ctx, cx - 55, cy - 50, 12, 8, 0, COLORS.meiose.chromosome1);
    Canvas.drawChromosome(ctx, cx + 55, cy - 50, 12, 8, 0, COLORS.meiose.chromosome2);
    Canvas.drawChromosome(ctx, cx - 55, cy + 50, 12, 8, 0, COLORS.meiose.chromosome1);
    Canvas.drawChromosome(ctx, cx + 55, cy + 50, 12, 8, 0, COLORS.meiose.chromosome2);
}

function drawMeioseTelofase(ctx, cx, cy) {
    drawTelofaseCell(ctx, cx - 65, cy, COLORS.meiose.primary, COLORS.meiose.chromosome1);
    drawTelofaseCell(ctx, cx + 65, cy, COLORS.meiose.primary, COLORS.meiose.chromosome2);
    drawDivisionLine(ctx, cx, cy, COLORS.meiose.primary);
}

// ================================================================
// FUNÇÕES AUXILIARES DE DESENHO
// ================================================================

function drawCentrioles(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.85;
}

function drawTelofaseCell(ctx, x, y, borderColor, chromoColor) {
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 45, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = chromoColor;
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        ctx.arc(x - 10 + i * 20, y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 0.85;
}

function drawDivisionLine(ctx, cx, cy, color) {
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.3;
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(cx, cy - 100);
    ctx.lineTo(cx, cy + 100);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 0.85;
}

// ================================================================
// GERENCIADOR DE APLICAÇÃO
// ================================================================

const ComparisonApp = {
    init() {
        const cMitose = document.getElementById('compMitoseCanvas');
        const cMeiose = document.getElementById('compMeioseCanvas');

        if (!cMitose || !cMeiose) return;

        AppState.canvases.mitose = cMitose;
        AppState.canvases.meiose = cMeiose;
        AppState.contexts.mitose = cMitose.getContext('2d');
        AppState.contexts.meiose = cMeiose.getContext('2d');

        this.draw();
    },

    draw() {
        if (AppState.contexts.mitose) {
            drawMitosePhase(AppState.contexts.mitose, AppState.currentPhase);
        }
        if (AppState.contexts.meiose) {
            drawMeiosePhase(AppState.contexts.meiose, AppState.currentPhase);
        }
    },

    nextPhase() {
        AppState.nextPhase();
        this.render();
    },

    prevPhase() {
        AppState.prevPhase();
        this.render();
    },

    setPhase(phase) {
        AppState.setPhase(phase);
        this.render();
    },

    toggleAnimation() {
        AppState.isAnimating = !AppState.isAnimating;

        if (AppState.isAnimating) {
            let phase = 0;
            const animate = () => {
                AppState.setPhase(phase);
                this.draw();
                phase = (phase + 1) % 4;
                AppState.animationTimer = setTimeout(animate, 2000 / AppState.speed);
            };
            animate();
        } else {
            if (AppState.animationTimer) {
                clearTimeout(AppState.animationTimer);
            }
        }

        this.render();
    },

    reset() {
        if (AppState.animationTimer) {
            clearTimeout(AppState.animationTimer);
        }
        AppState.reset();
        this.render();
    },

    render() {
        navigateTo('comparacao');
    }
};

window.initComparacao = () => {
    AppState.init();
    ComparisonApp.init();
};

window.ComparisonApp = ComparisonApp;