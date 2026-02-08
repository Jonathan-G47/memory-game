// Número total de cartas (deben ser pares para formar parejas)
const totalCards = 12;

// Arrays para almacenar las cartas, las seleccionadas y los valores ya usados
let cards = [];
let selectedCards = [];
let valuesUsed = [];

// Contador de movimientos para controlar el turno del jugador
let currentMove = 0;

// Plantilla HTML de una carta (corregida con clases bien escritas)
const cardTemplate = `
  <div class="card">
    <div class="back"></div>
    <div class="face"></div>
  </div>
`;

// Función para generar un valor aleatorio entre 1 y totalCards/2
function getRandomValue() {
  let value;
  do {
    // Genera un número entre 1 y totalCards/2
    value = Math.floor(Math.random() * (totalCards / 2)) + 1;
    // Cuenta cuántas veces se ha usado ese valor
    const count = valuesUsed.filter(v => v === value).length;
    // Solo permite dos repeticiones por valor
    if (count < 2) {
      valuesUsed.push(value);
      break;
    }
  } while (true);
  return value;
}

// Función para activar una carta cuando se hace clic
function activate(e) {
  const card = e.currentTarget;

  // Si ya hay dos cartas activas, no permite más clics
  if (selectedCards.length >= 2 || card.classList.contains('active')) return;

  // Activa la carta visualmente
  card.classList.add('active');

  // Guarda la carta seleccionada
  selectedCards.push(card);

  // Si hay dos cartas seleccionadas, verifica si coinciden
  if (selectedCards.length === 2) {
    const [first, second] = selectedCards;

    // Compara el contenido de las caras
    const firstValue = first.querySelector('.face').textContent;
    const secondValue = second.querySelector('.face').textContent;

    if (firstValue === secondValue) {
      // Si coinciden, las deja activas y limpia el array
      selectedCards = [];
    } else {
      // Si no coinciden, espera 1 segundo y las voltea
      setTimeout(() => {
        first.classList.remove('active');
        second.classList.remove('active');
        selectedCards = [];
      }, 1000);
    }
  }

  // Verifica si el juego está completo
  checkGameComplete();
}

// Función para verificar si todas las cartas están activas (juego terminado)
function checkGameComplete() {
  const allActive = cards.every(card => card.querySelector('.card').classList.contains('active'));
  if (allActive) {
    setTimeout(() => {
      alert('¡Felicidades! Has completado el juego.');
      resetGame();
    }, 500);
  }
}

// Función para reiniciar el juego
function resetGame() {
  // Limpia todo
  document.querySelector('#game').innerHTML = '';
  cards = [];
  selectedCards = [];
  valuesUsed = [];
  currentMove = 0;

  // Vuelve a generar las cartas
  generateCards();
}

// Función principal para generar todas las cartas
function generateCards() {
  for (let i = 0; i < totalCards; i++) {
    // Crea un contenedor para la carta
    const wrapper = document.createElement('div');
    wrapper.innerHTML = cardTemplate;

    // Accede al elemento .card dentro del contenedor
    const card = wrapper.querySelector('.card');

    // Genera un valor aleatorio para la cara
    const value = getRandomValue();
    card.querySelector('.face').textContent = value;

    // Agrega el evento de clic
    card.addEventListener('click', activate);

    // Agrega la carta al array y al DOM
    cards.push(wrapper);
    document.querySelector('#game').appendChild(wrapper);
  }
}

// Inicializa el juego al cargar la página
generateCards();
