/**
 * CellLab Interativo - Sistema de Navegação Principal
 * Gerencia a navegação entre as diferentes telas e componentes
 */

// Estado global da aplicação
const appState = {
    currentPage: 'home',
    user: {
        score: 0,
        completed: []
    }
};

// Elementos DOM
const app = document.getElementById('app');

/**
 * Renderiza o layout base com navbar
 */
function renderLayout() {
    return `
        <nav class="navbar">
            <div class="navbar-brand" onclick="navigateTo('home')">
                <i class="fas fa-dna"></i>
                <span>CellLab Interativo</span>
            </div>
            <ul class="navbar-nav" id="navMenu"></ul>
        </nav>
        <div id="pageContent"></div>
    `;
}

/**
 * Atualiza o menu de navegação
 */
function updateNavigation() {
    const navMenu = document.getElementById('navMenu');
    const pages = [
        { id: 'home', label: 'Início', icon: 'fas fa-home' },
        { id: 'mitose', label: 'Mitose', icon: 'fas fa-cell-division' },
        { id: 'meiose', label: 'Meiose', icon: 'fas fa-dna' },
        { id: 'comparacao', label: 'Comparação', icon: 'fas fa-balance-scale' },
        { id: 'quiz', label: 'Quiz', icon: 'fas fa-question-circle' }
    ];

    navMenu.innerHTML = pages.map(page => `
        <li>
            <span class="nav-link ${appState.currentPage === page.id ? 'active' : ''}" 
                  onclick="navigateTo('${page.id}')"
                  title="${page.label}">
                <i class="${page.icon}"></i> ${page.label}
            </span>
        </li>
    `).join('');
}

/**
 * Navega para uma página específica
 */
function navigateTo(page) {
    // Atualiza o estado
    appState.currentPage = page;

    // Atualiza a navegação
    updateNavigation();

    // Renderiza a página correspondente
    const pageContent = document.getElementById('pageContent');
    let content = '';

    switch(page) {
        case 'home':
            content = renderHome();
            break;
        case 'mitose':
            content = renderMitose();
            break;
        case 'meiose':
            content = renderMeiose();
            break;
        case 'comparacao':
            content = renderComparacao();
            break;
        case 'quiz':
            content = renderQuiz();
            break;
        default:
            content = renderHome();
    }

    pageContent.innerHTML = content;

    // Scroll para o topo
    window.scrollTo(0, 0);

    // Carrega scripts específicos da página
    loadPageScript(page);
}

/**
 * Carrega e executa scripts específicos da página
 */
function loadPageScript(page) {
    setTimeout(() => {
        switch(page) {
            case 'mitose':
                if (typeof initMitose === 'function') {
                    initMitose();
                }
                break;
            case 'meiose':
                if (typeof initMeiose === 'function') {
                    initMeiose();
                }
                break;
            case 'comparacao':
                if (typeof initComparacao === 'function') {
                    initComparacao();
                }
                break;
            case 'quiz':
                if (typeof initQuiz === 'function') {
                    initQuiz();
                }
                break;
        }
    }, 100);
}

/**
 * Inicializa a aplicação
 */
function initApp() {
    app.innerHTML = renderLayout();
    navigateTo('home');
    
    // Log de inicialização
    console.log('🧬 CellLab Interativo iniciado com sucesso!');
}

// Inicia a aplicação quando o DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

/**
 * Função auxiliar para criar elementos com atributos
 */
function createElement(tag, options = {}) {
    const element = document.createElement(tag);
    
    if (options.classes) {
        element.className = options.classes;
    }
    
    if (options.id) {
        element.id = options.id;
    }
    
    if (options.html) {
        element.innerHTML = options.html;
    }
    
    if (options.text) {
        element.textContent = options.text;
    }
    
    if (options.attributes) {
        Object.entries(options.attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }
    
    if (options.events) {
        Object.entries(options.events).forEach(([event, handler]) => {
            element.addEventListener(event, handler);
        });
    }
    
    return element;
}

/**
 * Utilitário para animar elementos
 */
function animateElement(element, animation, duration = 600) {
    element.style.animation = `${animation} ${duration}ms ease-out`;
    element.addEventListener('animationend', () => {
        element.style.animation = '';
    }, { once: true });
}

/**
 * Utilitário para formatar texto
 */
function formatText(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
}

// Exportar funções globais para uso em outros scripts
window.navigateTo = navigateTo;
window.animateElement = animateElement;
window.formatText = formatText;
window.createElement = createElement;