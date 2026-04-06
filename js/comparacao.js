/**
 * CellLab Interativo - Modo Comparacao
 * Sistema de comparacao dinamica entre Mitose e Meiose
 */

const PHASES_EXPLANATION = {
    0: {
        name: 'Profase',
        mitose: {
            steps: [
                { title: 'Condensacao', desc: 'Cromossomos se condensam e se tornam visiveis' },
                { title: 'Desaparecimento Nuclear', desc: 'O nucleo desaparece para dar passagem' },
                { title: 'Formacao de Asters', desc: 'Centrilos se movem para os polos' }
            ]
        },
        meiose: {
            steps: [
                { title: 'Emparelhamento', desc: 'Cromossomos homologos se pareiam (sinapse)' },
                { title: 'Crossing-Over', desc: 'Cromossomos trocam segmentos de DNA!' },
                { title: 'Bivalentes', desc: 'Pares de cromossomos se formam' }
            ]
        }
    },
    1: {
        name: 'Metafase',
        mitose: {
            steps: [
                { title: 'Alinhamento', desc: 'Cromossomos se alinham no equador' },
                { title: 'Fixacao', desc: 'Cada cromossomo se prende as fibras' },
                { title: 'Preparacao', desc: 'Sistema pronto para separacao' }
            ]
        },
        meiose: {
            steps: [
                { title: 'Alinhamento de Pares', desc: 'Pares homologos se alinham' },
                { title: 'Diferenca', desc: 'Alinha PARES, nao individuais' },
                { title: 'Reducao', desc: 'Preparacao para reduzir cromossomos' }
            ]
        }
    },
    2: {
        name: 'Anafase',
        mitose: {
            steps: [
                { title: 'Separacao', desc: 'Cromatides se separam' },
                { title: 'Movimento', desc: 'Cromossomos se movem aos polos' },
                { title: 'Dois Conjuntos', desc: 'Dois conjuntos identicos se formam' }
            ]
        },
        meiose: {
            steps: [
                { title: 'Separacao', desc: 'Homologos se separam' },
                { title: 'Reducao', desc: 'Cada polo recebe metade' },
                { title: 'Variacao', desc: 'Cada grupo e diferente' }
            ]
        }
    },
    3: {
        name: 'Telofase',
        mitose: {
            steps: [
                { title: 'Reforma Nuclear', desc: 'Novo envoltorio se forma' },
                { title: '2 Celulas Identicas', desc: 'Duas celulas irmas iguais' },
                { title: 'Fim', desc: 'Mesmo numero de cromossomos' }
            ]
        },
        meiose: {
            steps: [
                { title: 'Reforma Nuclear', desc: 'Novo envoltorio em cada polo' },
                { title: 'Meiose I Completa', desc: '2 celulas diferentes' },
                { title: 'Proximo Passo', desc: 'Meiose II vem a seguir' }
            ]
        }
    }
};

const AppState = {
    currentPhase: 0,

    init() {
        this.currentPhase = 0;
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
                <div style="width: 80px; height: 5px; background: linear-gradient(90deg, #ea580c, #764ba2); border-radius: 5px;"></div>
                <h2 style="margin: 0;"><i class="fas fa-balance-scale"></i> Comparacao Dinamica</h2>
                <div style="width: 80px; height: 5px; background: linear-gradient(90deg, #764ba2, #059669); border-radius: 5px;"></div>
            </div>
            <p>Veja mitose e meiose lado a lado com suas imagens reais</p>
        </div>
    `;
}

function renderPhaseIndicator() {
    const phase = PHASES_EXPLANATION[AppState.currentPhase];
    return `
        <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%); padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; text-align: center; border: 2px solid rgba(99, 102, 241, 0.2);">
            <h3 style="margin: 0; color: #667eea; font-size: 2rem;">
                <span id="phaseNameLarge">${phase.name}</span>
                <span style="color: var(--gray-400); font-size: 1.5rem;"> / Etapa ${AppState.currentPhase + 1} de 4</span>
            </h3>
        </div>
    `;
}

function renderComparisonView() {
    return `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 3rem; align-items: start;">
            ${renderComparisonColumn('mitose')}
            ${renderComparisonColumn('meiose')}
        </div>
    `;
}

function renderComparisonColumn(type) {
    const isMitose = type === 'mitose';
    const icon = isMitose ? 'fa-circle-notch' : 'fa-dna';
    const title = isMitose ? 'Mitose' : 'Meiose';
    const tag = isMitose ? 'Divisao Somatica' : 'Divisao Germinativa';
    const result = isMitose ? 'IDENTICAS (2n)' : 'DIFERENTES (1n)';
    const resultCount = isMitose ? '2' : '4';
    const steps = isMitose ? 
        PHASES_EXPLANATION[AppState.currentPhase].mitose.steps : 
        PHASES_EXPLANATION[AppState.currentPhase].meiose.steps;

    const imageNames = isMitose ? 
        ['profase', 'metafase', 'anafase', 'telofase'] :
        ['profase1', 'metafase1', 'anafase1', 'telofase1'];

    const imageSrc = `images/${imageNames[AppState.currentPhase]}.png`;
    const primaryColor = isMitose ? '#ea580c' : '#059669';

    return `
        <div style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border-top: 5px solid ${primaryColor}; display: flex; flex-direction: column;">
            
            <div style="background: ${isMitose ? 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)' : 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)'}; padding: 2rem 1.5rem; text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 0.75rem;"><i class="fas ${icon}"></i></div>
                <h3 style="margin: 0.5rem 0; color: ${primaryColor}; font-size: 1.75rem; font-weight: 700;">${title}</h3>
                <div style="display: inline-block; background: rgba(255, 255, 255, 0.6); padding: 0.4rem 0.9rem; border-radius: 25px; font-size: 0.8rem; font-weight: 600; color: ${primaryColor}; border: 1px solid rgba(0,0,0,0.1);">${tag}</div>
            </div>

            <div style="padding: 2rem 1.5rem; background: white; display: flex; align-items: center; justify-content: center; min-height: 450px;">
                <img src="${imageSrc}" alt="${title}" style="width: 100%; height: 400px; object-fit: contain; border-radius: 12px; border: 3px solid ${primaryColor}; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
            </div>

            <div style="padding: 1.5rem 1.5rem; background: linear-gradient(135deg, ${primaryColor}15 0%, ${primaryColor}08 100%); border-top: 2px solid ${primaryColor}; text-align: center;">
                <div style="font-size: 0.75rem; color: ${primaryColor}; text-transform: uppercase; font-weight: 700; margin-bottom: 0.35rem;">Resultado: ${resultCount} celulas</div>
                <div style="font-size: 1rem; font-weight: 700; color: ${primaryColor};">${result}</div>
            </div>

            <div style="padding: 1.5rem; background: white; border-top: 1px solid #f0f0f0;">
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    ${steps.map((step, idx) => `
                        <div style="display: flex; gap: 0.75rem; align-items: flex-start; padding: 0.75rem; background: linear-gradient(135deg, ${primaryColor}08 0%, ${primaryColor}04 100%); border-radius: 8px; border-left: 3px solid ${primaryColor};">
                            <div style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%); color: white; font-weight: 700; font-size: 0.85rem; flex-shrink: 0;">${idx + 1}</div>
                            <div style="flex: 1;">
                                <h4 style="margin: 0 0 0.2rem 0; font-size: 0.85rem; color: #333; font-weight: 700;">${step.title}</h4>
                                <p style="margin: 0; font-size: 0.75rem; color: #666; line-height: 1.3;">${step.desc}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div style="padding: 1.5rem; background: white; border-top: 1px solid #f0f0f0;">
                ${renderCharacteristics(type, primaryColor)}
            </div>
        </div>
    `;
}

function renderCharacteristics(type, primaryColor) {
    const mitoseChars = [
        ['[C]', 'Cromossomos: <strong>Mantem 2n</strong>'],
        ['[R]', 'Tipo: <strong>Equacional</strong>'],
        ['[X]', 'Celulas-filhas: <strong>2</strong>']
    ];
    
    const meioseChars = [
        ['[C]', 'Cromossomos: <strong>Reduz para 1n</strong>'],
        ['[R]', 'Tipo: <strong>Reducional</strong>'],
        ['[X]', 'Celulas-filhas: <strong>4</strong>']
    ];

    const chars = type === 'mitose' ? mitoseChars : meioseChars;

    return chars.map(([icon, text]) => `
        <div style="display: flex; align-items: center; gap: 0.85rem; padding: 0.65rem 0; border-bottom: 1px solid #f0f0f0;">
            <span style="font-size: 1.3rem; font-weight: bold;">${icon}</span>
            <span style="flex: 1; font-size: 0.9rem; color: #555;">${text}</span>
        </div>
    `).join('');
}

function renderControls() {
    const isFirst = AppState.currentPhase === 0;
    const isLast = AppState.currentPhase === 3;

    return `
        <div style="display: flex; justify-content: center; align-items: center; gap: 2.5rem; margin: 2.5rem 0; flex-wrap: wrap;">
            <button type="button" style="padding: 0.875rem 1.75rem; border: none; border-radius: 10px; cursor: ${isFirst ? 'not-allowed' : 'pointer'}; font-weight: 700; transition: all 0.3s; display: flex; align-items: center; gap: 0.65rem; font-size: 0.95rem; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; opacity: ${isFirst ? '0.4' : '1'};" onclick="window.ComparisonApp.prevPhase()">
                <i class="fas fa-chevron-left"></i> Fase Anterior
            </button>

            <div style="display: flex; gap: 1.25rem; justify-content: center; flex-wrap: wrap;">
                ${[0, 1, 2, 3].map(i => `
                    <button type="button" onclick="window.ComparisonApp.setPhase(${i})" style="width: 50px; height: 50px; border-radius: 50%; background: ${i === AppState.currentPhase ? 'linear-gradient(135deg, #667eea 0%, #8b5cf6 100%)' : 'white'}; border: 3px solid ${i === AppState.currentPhase ? '#667eea' : '#ddd'}; display: flex; align-items: center; justify-content: center; cursor: pointer; font-weight: 700; font-size: 1.1rem; color: ${i === AppState.currentPhase ? 'white' : '#999'}; transition: all 0.3s; box-shadow: ${i === AppState.currentPhase ? '0 0 20px rgba(102, 126, 234, 0.4)' : '0 2px 8px rgba(0,0,0,0.1)'}; transform: ${i === AppState.currentPhase ? 'scale(1.2)' : 'scale(1)'};">
                        ${i + 1}
                    </button>
                `).join('')}
            </div>

            <button type="button" style="padding: 0.875rem 1.75rem; border: none; border-radius: 10px; cursor: ${isLast ? 'not-allowed' : 'pointer'}; font-weight: 700; transition: all 0.3s; display: flex; align-items: center; gap: 0.65rem; font-size: 0.95rem; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; opacity: ${isLast ? '0.4' : '1'};" onclick="window.ComparisonApp.nextPhase()">
                Proxima Fase <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;
}

function renderComparisonTable() {
    return `
        <div style="background: white; padding: 2.5rem; border-radius: 16px; margin: 2.5rem 0; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <h3 style="margin: 0 0 2rem 0; color: #667eea; font-size: 1.5rem; font-weight: 700;"><i class="fas fa-chart-bar"></i> Tabela Comparativa Completa</h3>
            <div style="overflow-x: auto; border-radius: 10px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);">
                            <th style="padding: 1.5rem; text-align: left; font-weight: 700; color: #333; border-bottom: 3px solid #667eea; font-size: 0.95rem;">Aspecto</th>
                            <th style="padding: 1.5rem; text-align: left; font-weight: 700; color: #333; border-bottom: 3px solid #ea580c; font-size: 0.95rem;"><i class="fas fa-circle-notch"></i> Mitose</th>
                            <th style="padding: 1.5rem; text-align: left; font-weight: 700; color: #333; border-bottom: 3px solid #059669; font-size: 0.95rem;"><i class="fas fa-dna"></i> Meiose</th>
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
        { aspect: 'Objetivo', mitose: { text: 'Crescimento e Regeneracao', badge: 'orange' }, meiose: { text: 'Producao de Gametas', badge: 'green' }, highlight: true },
        { aspect: 'Fases', mitose: { text: '1 Divisao', badge: null }, meiose: { text: '2 Divisoes', badge: null }, highlight: false },
        { aspect: 'Resultado', mitose: { text: '<strong>2</strong> celulas IDENTICAS', badge: 'orange' }, meiose: { text: '<strong>4</strong> celulas DIFERENTES', badge: 'green' }, highlight: true },
        { aspect: 'Cromossomos', mitose: { text: 'Mantem 2n (diploidе)', badge: null }, meiose: { text: 'Reduz para 1n (haploidе)', badge: null }, highlight: false },
        { aspect: 'Crossing-over', mitose: { text: 'NAO ocorre', badge: 'gray' }, meiose: { text: 'Ocorre na Profase I', badge: 'orange' }, highlight: true },
        { aspect: 'Variacao Genetica', mitose: { text: 'Nenhuma (clones geneticos)', badge: null }, meiose: { text: 'Maxima variacao', badge: null }, highlight: false }
    ];

    return rows.map(row => `
        <tr style="background: ${row.highlight ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)' : 'white'}; border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 1.25rem 1.5rem; color: #333; font-weight: 600;">${row.aspect}</td>
            <td style="padding: 1.25rem 1.5rem; color: #555; font-size: 0.95rem;">${row.mitose.badge ? `<span style="display: inline-block; padding: 0.35rem 0.85rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; background: ${row.mitose.badge === 'orange' ? '#fed7aa' : '#f0fdf4'}; color: ${row.mitose.badge === 'orange' ? '#92400e' : '#047857'}">${row.mitose.text}</span>` : row.mitose.text}</td>
            <td style="padding: 1.25rem 1.5rem; color: #555; font-size: 0.95rem;">${row.meiose.badge ? `<span style="display: inline-block; padding: 0.35rem 0.85rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; background: ${row.meiose.badge === 'green' ? '#d1fae5' : row.meiose.badge === 'orange' ? '#fed7aa' : '#f3f4f6'}; color: ${row.meiose.badge === 'green' ? '#047857' : row.meiose.badge === 'orange' ? '#92400e' : '#666'}">${row.meiose.text}</span>` : row.meiose.text}</td>
        </tr>
    `).join('');
}

function renderDifferencesGrid() {
    const differences = [
        { icon: '(A)', title: 'Objetivo Biologico', mitose: 'Manter corpo funcionando', meiose: 'Criar gametas unicos' },
        { icon: '(P)', title: 'Numero de Celulas', mitose: '2 celulas', meiose: '4 celulas' },
        { icon: '(G)', title: 'Conteudo Genetico', mitose: 'Igual a mae', meiose: 'Unico e diferente' },
        { icon: '(R)', title: 'Recombinacao', mitose: 'Sem variacao', meiose: 'Crossing-over' },
        { icon: '(C)', title: 'Resultado de Cromossomos', mitose: '2n (diploidе)', meiose: '1n (haploidе)' },
        { icon: '(E)', title: 'Relevancia Evolutiva', mitose: 'Manutencao', meiose: 'Evolucao' }
    ];

    return `
        
                ${differences.map(diff => `
                   
                           
                `).join('')}
            </div>
        </div>
    `;
}

function renderTimeline() {
    return `
                    ${[0, 1, 2, 3].map(i => `
                       
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

const ComparisonApp = {
    nextPhase() {
        AppState.nextPhase();
        navigateTo('comparacao');
    },

    prevPhase() {
        AppState.prevPhase();
        navigateTo('comparacao');
    },

    setPhase(phase) {
        AppState.setPhase(phase);
        navigateTo('comparacao');
    },

    reset() {
        AppState.reset();
        navigateTo('comparacao');
    }
};

window.ComparisonApp = ComparisonApp;

window.initComparacao = () => {
    AppState.init();
};