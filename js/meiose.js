/**
 * CellLab Interativo - Simulação de Meiose (COMPLETO E CORRIGIDO)
 */

const meioseState = {
    phases1Current: 0,
    phases2Current: 0,
    speed: 1
};

function renderMeiose() {
    return `
        <div class="meiose">
            <div class="meiose-container">

                <div class="meiose-header">
                    <h2><i class="fas fa-dna"></i> Meiose Interativa</h2>
                    <p>Explore as fases da divisão celular meiótica</p>
                </div>

                <div class="meiose-divisions">

                
                    <!-- MEIOSE I -->
                    <div class="division-container">
                        <h3>Meiose I</h3>

                        <div class="subfase-tabs">
                            <div class="subfase-tab active" onclick="goToMeiosePhase(0,1)">Prófase I</div>
                            <div class="subfase-tab" onclick="goToMeiosePhase(1,1)">Metáfase I</div>
                            <div class="subfase-tab" onclick="goToMeiosePhase(2,1)">Anáfase I</div>
                            <div class="subfase-tab" onclick="goToMeiosePhase(3,1)">Telófase I</div>
                        </div>

                        <div class="image-box">
                            <h4 id="meiose1PhaseName">Prófase I</h4>
                            <img id="meiose1PhaseImage" src="images/profase1.png">
                            <p id="meiose1PhaseDesc"></p>
                        </div>
                    </div>

                    <!-- MEIOSE II -->
                    <div class="division-container">
                        <h3>Meiose II</h3>

                        <div class="subfase-tabs">
                            <div class="subfase-tab active" onclick="goToMeiosePhase(0,2)">Prófase II</div>
                            <div class="subfase-tab" onclick="goToMeiosePhase(1,2)">Metáfase II</div>
                            <div class="subfase-tab" onclick="goToMeiosePhase(2,2)">Anáfase II</div>
                            <div class="subfase-tab" onclick="goToMeiosePhase(3,2)">Telófase II</div>
                        </div>

                        <div class="image-box">
                            <h4 id="meiose2PhaseName">Prófase II</h4>
                            <img id="meiose2PhaseImage" src="images/profase2.png">
                            <p id="meiose2PhaseDesc"></p>
                        </div>


                    </div>

                </div>
<!-- Resultado Final --> <div class="meiose-result"> <h3><i class="fas fa-check-circle"></i> Resultado Final</h3> <p>Meiose produz 4 células haplóides (com metade dos cromossomos), cada uma geneticamente ÚNICA!</p> <div class="result-cells"> <div class="result-cell">1n ♀</div> <div class="result-cell">1n ♂</div> <div class="result-cell">1n ♀</div> <div class="result-cell">1n ♂</div> </div> </div> <!-- Cards educacionais --> <div class="meiose-education"> <div class="education-card"> <h4><i class="fas fa-dna"></i> Variação Genética</h4> <p>Através do crossing-over e segregação aleatória, meiose cria diversidade genética. Nenhuma célula é igual!</p> </div> <div class="education-card"> <h4><i class="fas fa-mars-and-venus"></i> Reprodução Sexual</h4> <p>Meiose produz gametas. A fusão de dois gametas haplóides forma um zigoto diplóide.</p> </div> <div class="education-card"> <h4><i class="fas fa-book"></i> vs Mitose</h4> <p>Mitose = 2 células idênticas. Meiose = 4 células diferentes com metade dos cromossomos.</p>
            </div>
        </div>
    `;
}

/* ===========================
   ESTILO PADRONIZADO IMAGENS
=========================== */
function applyImageStyle(img) {
    if (!img) return;

    img.style.width = "100%";
    img.style.maxWidth = "500px";
    img.style.height = "300px";
    img.style.objectFit = "contain";
    img.style.margin = "0 auto";
    img.style.display = "block";
    img.style.background = "#f9f9f9";
    img.style.borderRadius = "10px";
}

/* ===========================
   DADOS DAS FASES
=========================== */
const meioseInfo = {
    phase1: [
        { name: 'Prófase I', desc: 'É a fase em que os cromossomos homólogos se unem e trocam partes entre si, garantindo variabilidade genética.' },
        { name: 'Metáfase I', desc: 'pares de cromossomos homólogos se alinham no centro da célula.' },
        { name: 'Anáfase I', desc: 'cromossomos homólogos são separados e puxados para polos opostos.' },
        { name: 'Telófase I', desc: 'formam-se duas células haploides com cromossomos ainda duplicados.' }
    ],
    phase2: [
        { name: 'Prófase II', desc: 'cromossomos se condensam novamente e o fuso se reorganiza.' },
        { name: 'Metáfase II', desc: 'cromossomos se alinham individualmente no centro da célula.' },
        { name: 'Anáfase II', desc: 'cromátides-irmãs se separam e vão para polos opostos.' },
        { name: 'Telófase II', desc: 'formam-se quatro células haploides geneticamente diferentes.' }
    ]
};

/* ===========================
   INICIALIZAÇÃO
=========================== */
function initMeiose() {
    updateMeioseImage(0,1);
    updateMeioseImage(0,2);

    applyImageStyle(document.getElementById('meiose1PhaseImage'));
    applyImageStyle(document.getElementById('meiose2PhaseImage'));
}

/* ===========================
   ATUALIZA IMAGENS
=========================== */
function updateMeioseImage(phase, division) {

    const names1 = ['profase1','metafase1','anafase1','telofase1'];
    const names2 = ['profase2','metafase2','anafase2','telofase2'];

    if (division === 1) {
        const img = document.getElementById('meiose1PhaseImage');
        const name = document.getElementById('meiose1PhaseName');
        const desc = document.getElementById('meiose1PhaseDesc');

        img.src = `images/${names1[phase]}.png`;
        name.textContent = meioseInfo.phase1[phase].name;
        desc.textContent = meioseInfo.phase1[phase].desc;

    } else {
        const img = document.getElementById('meiose2PhaseImage');
        const name = document.getElementById('meiose2PhaseName');
        const desc = document.getElementById('meiose2PhaseDesc');

        img.src = `images/${names2[phase]}.png`;
        name.textContent = meioseInfo.phase2[phase].name;
        desc.textContent = meioseInfo.phase2[phase].desc;
    }
}

/* ===========================
   CONTROLES
=========================== */
function goToMeiosePhase(phase, division) {

    if (division === 1) {
        meioseState.phases1Current = phase;

        document.querySelectorAll('.division-container:nth-child(1) .subfase-tab')
            .forEach((tab,i)=>tab.classList.toggle('active', i===phase));

    } else {
        meioseState.phases2Current = phase;

        document.querySelectorAll('.division-container:nth-child(2) .subfase-tab')
            .forEach((tab,i)=>tab.classList.toggle('active', i===phase));
    }

    updateMeioseImage(phase, division);
}

function nextMeiosePhase(division) {
    if (division === 1 && meioseState.phases1Current < 3)
        goToMeiosePhase(meioseState.phases1Current + 1,1);

    if (division === 2 && meioseState.phases2Current < 3)
        goToMeiosePhase(meioseState.phases2Current + 1,2);
}

function resetMeiose1() { goToMeiosePhase(0,1); }
function resetMeiose2() { goToMeiosePhase(0,2); }

/* ===========================
   GLOBAL (IMPORTANTE)
=========================== */
window.renderMeiose = renderMeiose;
window.initMeiose = initMeiose;
window.goToMeiosePhase = goToMeiosePhase;
window.nextMeiosePhase = nextMeiosePhase;
window.resetMeiose1 = resetMeiose1;
window.resetMeiose2 = resetMeiose2;

/* ===========================
   COMO USAR (IMPORTANTE)
=========================== */

// EXEMPLO:
function carregarMeiose() {
    const container = document.getElementById("app");

    container.innerHTML = renderMeiose();

    requestAnimationFrame(() => {
        initMeiose();
    });
}