// script.js - Funcionalidades interactivas para la landing page educativa

// Inicialización cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initScrollToTop();
    initCharts();
    initSearch();
    initTimeline();
    initTechEcosystem();
    initModuleInteractions();
    initAccordions();
    initVideoButtons();
    initExpandButtons();
    initWorkshop();
    initEthicsAccordions();
    initCaseCarousel();
    
    // Detectar desplazamiento para mostrar/ocultar botón de subir
    window.addEventListener('scroll', toggleScrollButton);
});

// ===== Funcionalidad de scroll arriba =====
function initScrollToTop() {
    const scrollButton = document.getElementById('scroll-top');
    
    if (scrollButton) {
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function toggleScrollButton() {
    const scrollButton = document.getElementById('scroll-top');
    if (!scrollButton) return;
    
    if (window.scrollY > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
}

// ===== Funcionalidad de búsqueda =====
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (!searchInput || !searchResults) return;
    
    searchInput.addEventListener('input', debounce(function() {
        const query = searchInput.value.trim().toLowerCase();
        
        // Borrar resultados anteriores
        while (searchResults.firstChild && !searchResults.firstChild.classList?.contains('search-prompt')) {
            searchResults.removeChild(searchResults.firstChild);
        }
        
        // Mostrar mensaje si la consulta es demasiado corta
        const searchPrompt = document.querySelector('.search-prompt');
        if (query.length < 2) {
            searchPrompt.style.display = 'block';
            return;
        }
        
        searchPrompt.style.display = 'none';
        
        // Simular búsqueda (en una implementación real, buscarías en el contenido real)
        const results = performSearch(query);
        
        if (results.length === 0) {
            const noResults = document.createElement('p');
            noResults.className = 'search-prompt';
            noResults.textContent = `No se encontraron resultados para "${query}"`;
            searchResults.appendChild(noResults);
            return;
        }
        
        // Agregar resultados
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            
            resultItem.innerHTML = `
                <h4>${result.title}</h4>
                <p>${result.snippet}</p>
                <span class="result-module">${result.module}</span>
            `;
            
            resultItem.addEventListener('click', function() {
                // Navegar al resultado
                window.location.hash = result.link;
                
                // Cerrar el modal de búsqueda
                document.querySelector('.search-modal').style.display = 'none';
                
                // Actualizar Alpine.js
                const alpineApp = Alpine.getRoot(document.body);
                alpineApp.$data.searchOpen = false;
                alpineApp.$data.activeModule = result.module;
                alpineApp.$data.activeTab = result.tab;
            });
            
            searchResults.appendChild(resultItem);
        });
    }, 300));
}

// Función para simular la búsqueda
function performSearch(query) {
    // Datos de búsqueda simulados
    const searchData = [
        { 
            title: "Desmitificando la Inteligencia Artificial", 
            snippet: "La IA es la capacidad de las máquinas para realizar tareas que normalmente requieren inteligencia humana...",
            module: "module1",
            tab: "tab1",
            link: "#module1" 
        },
        { 
            title: "Cuarta Revolución Industrial", 
            snippet: "Caracterizada por la convergencia de tecnologías digitales, físicas y biológicas...",
            module: "module1",
            tab: "tab2",
            link: "#module1" 
        },
        { 
            title: "Sociedad 5.0", 
            snippet: "Visión japonesa de una sociedad 'súper inteligente' que utiliza la tecnología para resolver desafíos sociales...",
            module: "module1",
            tab: "tab3",
            link: "#module1" 
        },
        { 
            title: "Línea de Tiempo de la IA", 
            snippet: "Explorando la evolución histórica de la IA y su desarrollo hasta nuestros días...",
            module: "module1",
            tab: "tab4",
            link: "#module1" 
        },
        { 
            title: "Ecosistema de Tecnologías Emergentes", 
            snippet: "La IA se integra y potencia con otras tecnologías disruptivas, creando un ecosistema de innovación...",
            module: "module1",
            tab: "tab5",
            link: "#module1" 
        },
        { 
            title: "Transformación Educativa", 
            snippet: "Profundizando en cómo la IA está transformando la educación, destacando tendencias clave...",
            module: "module2",
            tab: "m2tab1",
            link: "#module2" 
        },
        { 
            title: "Caso Duolingo", 
            snippet: "Análisis del caso paradigmático de Duolingo y su enfoque 'AI First'...",
            module: "module2",
            tab: "m2tab2",
            link: "#module2" 
        },
        { 
            title: "El Futuro es Ahora", 
            snippet: "Explorando casos de éxito inspiradores, visionando el futuro cercano y abordando aspectos éticos...",
            module: "module3",
            tab: "tab1",
            link: "#module3" 
        },
        { 
            title: "Preparándonos para el Futuro", 
            snippet: "Reflexionando sobre la urgencia de actuar, identificando oportunidades para Guatemala y el OJ...",
            module: "module4",
            tab: "tab1",
            link: "#module4" 
        }
    ];
    
    // Filtrar resultados que coincidan con la consulta
    return searchData.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.snippet.toLowerCase().includes(query)
    );
}

// En script.js, modificar la función initModuleInteractions:
function initModuleInteractions() {
    // Corregir el manejo de eventos para botones de navegación
    const moduleNavButtons = document.querySelectorAll('.nav-prev, .nav-next');
    moduleNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Extraer el módulo objetivo del atributo href o data-target
            const targetModule = this.getAttribute('href').replace('#', '') || 
                                this.getAttribute('data-target');
            // Actualizar el Alpine.js state
            const alpineRoot = Alpine.getRoot(document.body);
            alpineRoot.$data.activeModule = targetModule;
            
            // Asegurar que el contenido se muestre correctamente
            setTimeout(() => {
                adjustContentHeight();
            }, 50);
        });
    });
    
    // El resto del código...
}

function adjustContentHeight() {
    const activeContent = document.querySelector('.tab-pane[style*="display: block"]');
    if (activeContent) {
        const tabContent = activeContent.closest('.tab-content');
        if (tabContent) {
            tabContent.style.minHeight = `${activeContent.offsetHeight}px`;
        }
    }
}

// ===== Inicialización de Línea del Tiempo de IA =====
function initTimeline() {
    const timelineContainer = document.getElementById('ai-timeline');
    if (!timelineContainer) return;
    
    // Datos de la línea de tiempo
    const items = [
        {id: 1, content: 'Inicio de la IA', start: '1956-01-01', title: 'Conferencia de Dartmouth - Término "Inteligencia Artificial" acuñado por John McCarthy', className: 'timeline-item-concept'},
        {id: 2, content: 'Primer Invierno de la IA', start: '1974-01-01', end: '1980-01-01', title: 'Recortes de financiación y escepticismo debido a expectativas no cumplidas', className: 'timeline-item-winter'},
        {id: 3, content: 'Sistemas Expertos', start: '1980-01-01', end: '1987-01-01', title: 'Auge de los sistemas basados en reglas para tareas específicas', className: 'timeline-item-concept'},
        {id: 4, content: 'Segundo Invierno de la IA', start: '1987-01-01', end: '1993-01-01', title: 'Nueva caída del interés y financiación', className: 'timeline-item-winter'},
        {id: 5, content: 'Deep Blue vence a Kasparov', start: '1997-05-11', title: 'El superordenador de IBM derrota al campeón mundial de ajedrez', className: 'timeline-item-milestone'},
        {id: 6, content: 'Machine Learning', start: '2000-01-01', end: '2010-01-01', title: 'Desarrollo de algoritmos que mejoran automáticamente con la experiencia', className: 'timeline-item-concept'},
        {id: 7, content: 'Deep Learning', start: '2012-01-01', title: 'AlexNet marca un punto de inflexión en visión por computadora', className: 'timeline-item-breakthrough'},
        {id: 8, content: 'AlphaGo', start: '2016-03-15', title: 'La IA de DeepMind vence al campeón mundial de Go, un juego extremadamente complejo', className: 'timeline-item-milestone'},
        {id: 9, content: 'GPT-3', start: '2020-06-11', title: '175 mil millones de parámetros, capacidad de generar texto coherente y creativo', className: 'timeline-item-llm'},
        {id: 10, content: 'Generative AI Boom', start: '2022-11-30', title: 'ChatGPT desata el auge de la IA generativa accesible', className: 'timeline-item-llm'},
        {id: 11, content: 'Multimodalidad Avanzada', start: '2023-05-01', title: 'Integración de texto, imagen, audio y video en modelos unificados', className: 'timeline-item-llm'},
        {id: 12, content: 'IA Agéntica', start: '2024-02-01', title: 'Modelos con capacidades autónomas para ejecutar tareas complejas', className: 'timeline-item-llm'},
        {id: 13, content: 'Presente', start: '2025-05-01', title: 'La IA se integra en prácticamente todos los sectores y dispositivos', className: 'timeline-item-current'}
    ];
      
    // Crear grupos para la línea de tiempo
    const groups = [
        {id: 1, content: 'Hitos de la IA'}
    ];
    
    // Configuración de la línea de tiempo
    const options = {
        height: '100%',
        minHeight: '250px',
        maxHeight: '350px',
        zoomable: true,
        stack: false,
        editable: false,
        timeAxis: {scale: 'year', step: 5},
        start: '1950-01-01',
        end: '2025-12-31',
        orientation: 'top',
        showMajorLabels: true,
        showMinorLabels: true,
        groupOrder: 'content'
    };
    
    try {
        const timeline = new vis.Timeline(timelineContainer, items, groups, options);
        // Limpiar mensaje de carga
        timelineContainer.innerHTML = '';
    } catch (err) {
        console.error("Error al inicializar la línea de tiempo:", err);
        timelineContainer.innerHTML = `<p class="error-message">Error al cargar la línea de tiempo: ${err.message}</p>`;
    }
}

// ===== Inicialización de gráficos =====
function initCharts() {
    initAIGrowthChart();
}

function initAIGrowthChart() {
    const chartCanvas = document.getElementById('ai-growth-chart');
    if (!chartCanvas) return;
    
    const ctx = chartCanvas.getContext('2d');
    
    // Datos para el gráfico de parámetros
    const parametersData = {
        labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        datasets: [{
            label: 'Parámetros (Billones)',
            data: [0.1, 0.5, 10, 20, 175, 280, 540, 1000, 1750, 2500],
            borderColor: getComputedStyle(document.documentElement).getPropertyValue('--color-primary'),
            backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-primary-light') + '80', // con transparencia
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3
        }]
    };
    
    // Configuración del gráfico
    const config = {
        type: 'line',
        data: parametersData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
                        }
                    }
                }
            }
        }
    };
    
    try {
        window.aiGrowthChart = new Chart(ctx, config);
    } catch (err) {
        console.error("Error al inicializar el gráfico:", err);
        chartCanvas.parentNode.innerHTML = `<p class="error-message">Error al cargar el gráfico: ${err.message}</p>`;
    }
}

// ===== Cambio entre datasets para el gráfico de AI =====
function switchChart(dataset) {
    if (!window.aiGrowthChart) {
        // Si el gráfico no existe aún, inicializarlo
        initAIGrowthChart();
        
        // Esperar 100ms para asegurar la inicialización
        setTimeout(() => {
            updateChartData(dataset);
        }, 100);
    } else {
        updateChartData(dataset);
    };

    if (!window.aiGrowthChart) return;
    
    const chart = window.aiGrowthChart;
    let insightText = "";
    const chartInsights = document.getElementById('chart-insights');
    
    // Variable para cambiar color del gráfico según el conjunto de datos
    let primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
    let lightColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-light') + '80';
    
    if (dataset === 'parameters') {
        chart.data.datasets[0].label = 'Parámetros (Billones)';
        chart.data.datasets[0].data = [0.1, 0.5, 10, 20, 175, 280, 540, 1000, 1750, 2500];
        insightText = '<i class="fas fa-chart-line"></i> Los modelos de IA han crecido de unos pocos millones de parámetros a varios billones en menos de una década. GPT-4 tiene más de 1.76 billones de parámetros estimados.';
        
    } else if (dataset === 'investment') {
        chart.data.datasets[0].label = 'Inversión Global en IA (Miles de Millones $)';
        chart.data.datasets[0].data = [5, 12, 28, 40, 68, 93, 120, 160, 230, 310];
        chart.data.datasets[0].borderColor = '#5E4DB2';
        chart.data.datasets[0].backgroundColor = 'rgba(94, 77, 178, 0.1)';
        primaryColor = '#5E4DB2';
        lightColor = 'rgba(94, 77, 178, 0.1)';
        insightText = '<i class="fas fa-chart-line"></i> La inversión global en tecnologías de IA alcanzó los $310 mil millones en 2025, multiplicándose por más de 60 veces en una década. Este crecimiento refleja la confianza del mercado en el potencial transformador de la IA.';
        
    } else if (dataset === 'adoption') {
        chart.data.datasets[0].label = 'Adopción Empresarial de IA (%)';
        chart.data.datasets[0].data = [10, 15, 23, 35, 47, 56, 65, 73, 80, 87];
        chart.data.datasets[0].borderColor = '#FFAB00';
        chart.data.datasets[0].backgroundColor = 'rgba(255, 171, 0, 0.1)';
        primaryColor = '#FFAB00';
        lightColor = 'rgba(255, 171, 0, 0.1)';
        insightText = '<i class="fas fa-chart-line"></i> Según McKinsey, el 87% de las empresas globales está utilizando alguna forma de IA en 2025, frente a apenas un 10% en 2016. Las aplicaciones más comunes incluyen servicio al cliente, optimización de procesos y análisis predictivo.';
    }
    
    chart.data.datasets[0].borderColor = primaryColor;
    chart.data.datasets[0].backgroundColor = lightColor;
    chart.update();
    
    if (chartInsights) {
        chartInsights.innerHTML = `<p>${insightText}</p>`;
    }
    
    // Actualizar estilos de botones
    const buttons = document.querySelectorAll('.chart-control');
    buttons.forEach(button => {
        if (button.textContent.toLowerCase().includes(dataset)) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// ===== Inicialización del ecosistema tecnológico =====
function initTechEcosystem() {
    const container = document.getElementById('tech-ecosystem-visualization');
    if (!container) return;
    
    // Datos para el gráfico de conexión
    const nodesData = [
        {id: 1, label: "IA", group: 1, value: 40},
        {id: 2, label: "Blockchain", group: 2, value: 25},
        {id: 3, label: "IoT", group: 3, value: 25},
        {id: 4, label: "AR/VR", group: 4, value: 25},
        {id: 5, label: "Computación Cuántica", group: 5, value: 20},
        {id: 6, label: "Big Data", group: 1, value: 30},
        {id: 7, label: "Machine Learning", group: 1, value: 30},
        {id: 8, label: "NLP", group: 1, value: 25},
        {id: 9, label: "Computer Vision", group: 1, value: 25},
        {id: 10, label: "Smart Contracts", group: 2, value: 20},
        {id: 11, label: "Realidad Aumentada", group: 4, value: 20},
        {id: 12, label: "Smart Cities", group: 3, value: 20}
    ];
    
    const edgesData = [
        {from: 1, to: 2, value: 10},
        {from: 1, to: 3, value: 15},
        {from: 1, to: 4, value: 12},
        {from: 1, to: 5, value: 8},
        {from: 1, to: 6, value: 20},
        {from: 1, to: 7, value: 20},
        {from: 1, to: 8, value: 18},
        {from: 1, to: 9, value: 18},
        {from: 2, to: 10, value: 15},
        {from: 3, to: 12, value: 15},
        {from: 4, to: 11, value: 15},
        {from: 2, to: 3, value: 10},
        {from: 3, to: 4, value: 10},
        {from: 4, to: 5, value: 8},
        {from: 5, to: 2, value: 5}
    ];
    
    try {
        // Crear datasets de nodos y conexiones
        const nodes = new vis.DataSet(nodesData);
        const edges = new vis.DataSet(edgesData);
        
        // Datos combinados
        const data = {
            nodes: nodes,
            edges: edges
        };
        
        // Obtener colores de CSS para mantener coherencia con el tema
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
        const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-secondary');
        const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent');
        const successColor = getComputedStyle(document.documentElement).getPropertyValue('--color-success');
        const infoColor = getComputedStyle(document.documentElement).getPropertyValue('--color-info');
        
        // Opciones
        const options = {
            nodes: {
                shape: 'dot',
                scaling: {
                    min: 10,
                    max: 30,
                    label: {
                        min: 8,
                        max: 14,
                        drawThreshold: 5,
                        maxVisible: 20
                    }
                },
                font: {
                    size: 12,
                    face: 'Inter'
                }
            },
            edges: {
                width: 0.15,
                color: {inherit: 'from'},
                smooth: {
                    type: 'continuous'
                }
            },
            physics: {
                stabilization: true,
                barnesHut: {
                    gravitationalConstant: -80,
                    springConstant: 0.001,
                    springLength: 200
                }
            },
            groups: {
                1: {color: {background: primaryColor, border: primaryColor.replace(')', ',0.7)') }, borderWidth: 2},
                2: {color: {background: secondaryColor, border: secondaryColor.replace(')', ',0.7)') }, borderWidth: 2},
                3: {color: {background: successColor, border: successColor.replace(')', ',0.7)') }, borderWidth: 2},
                4: {color: {background: accentColor, border: accentColor.replace(')', ',0.7)') }, borderWidth: 2},
                5: {color: {background: infoColor, border: infoColor.replace(')', ',0.7)') }, borderWidth: 2}
            }
        };
        
        // Inicializar la red
        const network = new vis.Network(container, data, options);
        
        // Limpiar mensaje de carga
        container.querySelector('.loading-placeholder')?.remove();
        
        // Ajustar al cambiar tamaño de ventana
        window.addEventListener('resize', function() {
            network.fit();
        });
        
    } catch (err) {
        console.error("Error al inicializar el ecosistema tecnológico:", err);
        container.innerHTML = `<p class="error-message">Error al cargar la visualización: ${err.message}</p>`;
    }
}

// ===== Inicialización de acordeones =====
function initAccordions() {
    // Esta funcionalidad se maneja principalmente con Alpine.js
    // Pero podemos agregar funcionalidades adicionales aquí si es necesario
}

// ===== Inicializar botones de video =====
function initVideoButtons() {
    const videoBtns = document.querySelectorAll('.play-btn');
    
    videoBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const videoTitle = this.innerHTML.includes('Ver demostración') 
                ? 'Demostración de Integración Multitecnología' 
                : 'Video de tecnología educativa';
                
            alert(`Reproduciendo: ${videoTitle}. En una implementación completa, aquí se abriría un reproductor de video o se cargaría una demostración interactiva.`);
        });
    });
}

// ===== Utilidades =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Agregar a script.js:
function initExpandButtons() {
    const expandButtons = document.querySelectorAll('.btn-expand');
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.content-card');
            const content = card.querySelector('.expanded-content');
            const isExpanded = content.classList.contains('visible');
            
            // Toggle visibility
            if (isExpanded) {
                content.classList.remove('visible');
                this.innerHTML = '<span>Explorar más</span><i class="fas fa-chevron-down"></i>';
            } else {
                content.classList.add('visible');
                this.innerHTML = '<span>Ver menos</span><i class="fas fa-chevron-up"></i>';
            }
        });
    });
}

// También llamar a esta función en el DOMContentLoaded

function updateChartData(dataset) {
    if (!window.aiGrowthChart) return;
    
    const chart = window.aiGrowthChart;
    let insightText = "";
    const chartInsights = document.getElementById('chart-insights');
    
    // Actualizar gráficos según el dataset seleccionado
    // [Resto del código existente]
    
    // Asegurar actualización
    chart.update();
    
    // Actualizar los estilos de botones correctamente
    const buttons = document.querySelectorAll('.chart-control');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.textContent.toLowerCase().includes(dataset)) {
            button.classList.add('active');
        }
    });
}


function initWorkshop() {
    // Este código solo se ejecutará si existe un elemento con workshop-container
    if (!document.querySelector('.workshop-container')) return;
    
    // Inicialización específica de workshop
    const workshopSteps = document.querySelectorAll('.progress-item');
    workshopSteps.forEach(step => {
        step.addEventListener('click', function() {
            // Obtener el número de paso de su contenido o atributo data
            const stepNumber = parseInt(this.querySelector('.progress-number').textContent);
            
            // Actualizar el estado en Alpine.js
            const alpineComp = Alpine.closestComponent(this);
            if (alpineComp) {
                alpineComp.activeStep = stepNumber;
            }
        });
    });
}

// Inicialización de acordeones éticos
function initEthicsAccordions() {
    // Si Alpine.js está manejando esto, solo verificamos que los elementos existan
    const ethicsItems = document.querySelectorAll('.ethics-item-header');
    if (ethicsItems.length === 0) return;
    
    // Verificamos si Alpine.js está funcionando correctamente
    let alpineWorking = false;
    ethicsItems.forEach(item => {
        if (item.hasAttribute('x-on:click') || item.hasAttribute('@click')) {
            alpineWorking = true;
        }
    });
    
    // Si Alpine.js no está funcionando, implementamos la funcionalidad manualmente
    if (!alpineWorking) {
        ethicsItems.forEach(item => {
            item.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const chevron = this.querySelector('.fas');
                
                // Toggle el contenido
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    chevron.classList.remove('fa-chevron-up');
                    chevron.classList.add('fa-chevron-down');
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                    chevron.classList.remove('fa-chevron-down');
                    chevron.classList.add('fa-chevron-up');
                }
            });
        });
    }
}

// Inicialización del carrusel de casos judiciales
function initCaseCarousel() {
    const carousel = document.querySelector('.case-studies-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.case-slide');
    const indicators = carousel.querySelectorAll('.indicator');
    const prevButton = carousel.querySelector('.carousel-prev');
    const nextButton = carousel.querySelector('.carousel-next');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    // Función para mostrar un slide específico
    function showSlide(index) {
        // Ocultar todos los slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Mostrar el slide actual
        slides[index].classList.add('active');
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    // Event listeners para botones y indicadores
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) newIndex = slides.length - 1;
            showSlide(newIndex);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) newIndex = 0;
            showSlide(newIndex);
        });
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
        });
    });
}

// Llamar a las funciones de inicialización
// Inicialización de acordeones éticos
function initEthicsAccordions() {
    // Si Alpine.js está manejando esto, solo verificamos que los elementos existan
    const ethicsItems = document.querySelectorAll('.ethics-item-header');
    if (ethicsItems.length === 0) return;
    
    // Verificamos si Alpine.js está funcionando correctamente
    let alpineWorking = false;
    ethicsItems.forEach(item => {
        if (item.hasAttribute('x-on:click') || item.hasAttribute('@click')) {
            alpineWorking = true;
        }
    });
    
    // Si Alpine.js no está funcionando, implementamos la funcionalidad manualmente
    if (!alpineWorking) {
        ethicsItems.forEach(item => {
            item.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const chevron = this.querySelector('.fas');
                
                // Toggle el contenido
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    chevron.classList.remove('fa-chevron-up');
                    chevron.classList.add('fa-chevron-down');
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                    chevron.classList.remove('fa-chevron-down');
                    chevron.classList.add('fa-chevron-up');
                }
            });
        });
    }
}

