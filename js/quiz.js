/**
 * CellLab Interativo - Quiz Interativo (COMPLETO)
 */

const quizState = {
    currentQuestion: 0,
    score: 0,
    answered: false,
    selectedAnswer: null,
    finished: false
};

const quizQuestions = [
    {
        question: "O que é mitose?",
        topic: "Mitose",
        options: [
            { text: "Divisão celular que produz duas células idênticas", correct: true },
            { text: "Divisão celular que produz quatro células diferentes", correct: false },
            { text: "Processo de duplicação do DNA", correct: false },
            { text: "Separação de cromossomos homólogos", correct: false }
        ],
        explanation: "Mitose é a divisão nuclear que resulta em duas células-filhas geneticamente idênticas à célula-mãe."
    },
    {
        question: "Qual é a primeira fase da mitose?",
        topic: "Mitose",
        options: [
            { text: "Metáfase", correct: false },
            { text: "Anáfase", correct: false },
            { text: "Prófase", correct: true },
            { text: "Telófase", correct: false }
        ],
        explanation: "A Prófase é a primeira fase da mitose, onde os cromossomos se condensam e o envoltório nuclear desaparece."
    },
    {
        question: "Na Metáfase, onde se alinham os cromossomos?",
        topic: "Mitose",
        options: [
            { text: "Nos polos da célula", correct: false },
            { text: "No equador da célula (placa metafásica)", correct: true },
            { text: "Na membrana plasmática", correct: false },
            { text: "No núcleo", correct: false }
        ],
        explanation: "Os cromossomos se alinham no equador (placa metafásica) na Metáfase, preparando-se para a separação."
    },
    {
        question: "O que caracteriza a Anáfase?",
        topic: "Mitose",
        options: [
            { text: "Os cromossomos se condensam", correct: false },
            { text: "Os cromossomos se separam e movem para polos opostos", correct: true },
            { text: "O envoltório nuclear se reforma", correct: false },
            { text: "Os cromossomos se emparelham", correct: false }
        ],
        explanation: "Na Anáfase, as cromátides irmãs se separam e se movem para os polos opostos da célula."
    },
    {
        question: "Qual é a principal diferença entre mitose e meiose?",
        topic: "Comparação",
        options: [
            { text: "Mitose produz 2 células idênticas; meiose produz 4 células diferentes", correct: true },
            { text: "Mitose é mais rápida que meiose", correct: false },
            { text: "Meiose não produz divisão celular", correct: false },
            { text: "Mitose produz 4 células e meiose produz 2", correct: false }
        ],
        explanation: "Mitose produce 2 células filhas idênticas (diplóides), enquanto meiose produz 4 células diferentes (haplóides)."
    },
    {
        question: "O que é Meiose?",
        topic: "Meiose",
        options: [
            { text: "Divisão celular que produz gametas", correct: true },
            { text: "Divisão celular de células somáticas", correct: false },
            { text: "Processo de replicação do DNA", correct: false },
            { text: "Fusão de duas células", correct: false }
        ],
        explanation: "Meiose é a divisão celular que produz gametas (espermatozoides e óvulos) com metade dos cromossomos."
    },
    {
        question: "Quantas divisões nucleares ocorrem em meiose?",
        topic: "Meiose",
        options: [
            { text: "Uma", correct: false },
            { text: "Duas (Meiose I e Meiose II)", correct: true },
            { text: "Três", correct: false },
            { text: "Quatro", correct: false }
        ],
        explanation: "A meiose consiste em duas divisões nucleares sucessivas: Meiose I e Meiose II."
    },
    {
        question: "O que é crossing-over?",
        topic: "Meiose",
        options: [
            { text: "Separação de cromossomos", correct: false },
            { text: "Troca de segmentos de DNA entre cromossomos homólogos", correct: true },
            { text: "Replicação do DNA", correct: false },
            { text: "Alinhamento de cromossomos", correct: false }
        ],
        explanation: "Crossing-over é a troca de segmentos de DNA entre cromossomos homólogos durante a Prófase I, criando variação genética."
    },
    {
        question: "Em qual fase da meiose ocorre o crossing-over?",
        topic: "Meiose",
        options: [
            { text: "Metáfase II", correct: false },
            { text: "Anáfase I", correct: false },
            { text: "Prófase I", correct: true },
            { text: "Telófase II", correct: false }
        ],
        explanation: "O crossing-over ocorre durante a Prófase I, quando os cromossomos homólogos se emparelham (sinapse)."
    },
    {
        question: "Qual é o resultado final da meiose?",
        topic: "Meiose",
        options: [
            { text: "Duas células diplóides idênticas", correct: false },
            { text: "Quatro células haplóides diferentes", correct: true },
            { text: "Uma célula poliploide", correct: false },
            { text: "Oito células haplóides", correct: false }
        ],
        explanation: "A meiose resulta em quatro células haplóides (1n) geneticamente diferentes, cada uma com metade dos cromossomos."
    }
];

function renderQuiz() {
    if (quizState.finished) {
        return renderQuizResults();
    }

    const question = quizQuestions[quizState.currentQuestion];

    return `
        <div class="quiz">
            <div class="quiz-container">
                <!-- Progresso -->
                <div class="quiz-progress">
                    <div class="progress-info">
                        <span class="progress-title">Progresso do Quiz</span>
                        <span class="progress-count">${quizState.currentQuestion + 1}/${quizQuestions.length}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${((quizState.currentQuestion + 1) / quizQuestions.length) * 100}%"></div>
                    </div>
                </div>

                <!-- Pergunta -->
                <div class="quiz-card">
                    <div class="question-header">
                        <h3>${question.question}</h3>
                        <span class="question-topic">${question.topic}</span>
                    </div>

                    <!-- Opções -->
                    <div class="options-container">
                        ${question.options.map((option, index) => `
                            <div class="option ${quizState.selectedAnswer === index ? 'selected' : ''}" onclick="selectQuizAnswer(${index})">
                                <div class="option-radio"></div>
                                <div class="option-text">
                                    <div class="option-label">${String.fromCharCode(65 + index)}. ${option.text}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Feedback -->
                    <div class="feedback ${quizState.answered ? (question.options[quizState.selectedAnswer].correct ? 'correct' : 'incorrect') : ''} ${quizState.answered ? 'show' : ''}">
                        <h4>
                            <i class="fas fa-${question.options[quizState.selectedAnswer]?.correct ? 'check-circle' : 'times-circle'}"></i>
                            ${question.options[quizState.selectedAnswer]?.correct ? 'Correto!' : 'Incorreto!'}
                        </h4>
                        <p>${question.explanation}</p>
                    </div>

                    <!-- Botões -->
                    <div class="quiz-buttons">
                        ${quizState.currentQuestion > 0 ? `
                            <button class="quiz-btn quiz-btn-back" onclick="previousQuizQuestion()">
                                <i class="fas fa-chevron-left"></i> Anterior
                            </button>
                        ` : ''}

                        ${!quizState.answered ? `
                            <button class="quiz-btn quiz-btn-submit" onclick="submitQuizAnswer()" ${quizState.selectedAnswer === null ? 'disabled' : ''}>
                                Verificar <i class="fas fa-check"></i>
                            </button>
                        ` : `
                            ${quizState.currentQuestion < quizQuestions.length - 1 ? `
                                <button class="quiz-btn quiz-btn-next" onclick="nextQuizQuestion()">
                                    Próxima <i class="fas fa-chevron-right"></i>
                                </button>
                            ` : `
                                <button class="quiz-btn quiz-btn-submit" onclick="finishQuiz()">
                                    Finalizar <i class="fas fa-flag-checkered"></i>
                                </button>
                            `}
                        `}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderQuizResults() {
    const percentage = Math.round((quizState.score / quizQuestions.length) * 100);
    let message = '';
    let emoji = '';

    if (percentage === 100) {
        message = 'Perfeito! Você domina mitose e meiose! 🌟';
        emoji = '🏆';
    } else if (percentage >= 80) {
        message = 'Excelente! Você tem um ótimo conhecimento! 🎉';
        emoji = '😄';
    } else if (percentage >= 60) {
        message = 'Bom! Você aprendeu bem! 👍';
        emoji = '😊';
    } else if (percentage >= 40) {
        message = 'Você acertou alguns! Revise os conteúdos. 📚';
        emoji = '🤔';
    } else {
        message = 'Que tal revisar e tentar novamente? 💪';
        emoji = '😅';
    }

    return `
        <div class="quiz">
            <div class="quiz-container">
                <div class="quiz-results show">
                    <div class="results-score">
                        <div class="results-circle">${percentage}%</div>
                        <p class="results-percentage">de acurácia</p>
                    </div>

                    <h2 class="results-title">${emoji} ${message}</h2>
                    <p class="results-message">Você acertou ${quizState.score} de ${quizQuestions.length} perguntas!</p>

                    <div class="results-details">
                        <div class="results-detail">
                            <div class="results-detail-label">Total de Acertos</div>
                            <div class="results-detail-value">${quizState.score}</div>
                        </div>
                        <div class="results-detail">
                            <div class="results-detail-label">Questões</div>
                            <div class="results-detail-value">${quizQuestions.length}</div>
                        </div>
                        <div class="results-detail">
                            <div class="results-detail-label">Percentual</div>
                            <div class="results-detail-value">${percentage}%</div>
                        </div>
                    </div>

                    <div class="results-buttons">
                        <button class="quiz-btn quiz-btn-next" onclick="restartQuiz()">
                            <i class="fas fa-redo"></i> Refazer Quiz
                        </button>
                        <button class="quiz-btn quiz-btn-back" onclick="navigateTo('home')">
                            <i class="fas fa-home"></i> Voltar ao Início
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function selectQuizAnswer(index) {
    if (!quizState.answered) {
        quizState.selectedAnswer = index;
        navigateTo('quiz'); // Atualiza renderização
    }
}

function submitQuizAnswer() {
    const question = quizQuestions[quizState.currentQuestion];
    if (question.options[quizState.selectedAnswer].correct) {
        quizState.score++;
    }
    quizState.answered = true;
    navigateTo('quiz');
}

function nextQuizQuestion() {
    if (quizState.currentQuestion < quizQuestions.length - 1) {
        quizState.currentQuestion++;
        quizState.answered = false;
        quizState.selectedAnswer = null;
        navigateTo('quiz');
    }
}

function previousQuizQuestion() {
    if (quizState.currentQuestion > 0) {
        quizState.currentQuestion--;
        quizState.answered = false;
        quizState.selectedAnswer = null;
        navigateTo('quiz');
    }
}

function finishQuiz() {
    quizState.finished = true;
    navigateTo('quiz');
}

function restartQuiz() {
    quizState.currentQuestion = 0;
    quizState.score = 0;
    quizState.answered = false;
    quizState.selectedAnswer = null;
    quizState.finished = false;
    navigateTo('quiz');
}

window.initQuiz = () => {
    // Quiz não precisa de inicialização especial
};
window.selectQuizAnswer = selectQuizAnswer;
window.submitQuizAnswer = submitQuizAnswer;
window.nextQuizQuestion = nextQuizQuestion;
window.previousQuizQuestion = previousQuizQuestion;
window.finishQuiz = finishQuiz;
window.restartQuiz = restartQuiz;