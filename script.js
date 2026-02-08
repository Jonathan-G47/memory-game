/* ============================================
   CONFIGURACIÓN DEL JUEGO
   ============================================ */

// Total de cartas (debe ser número par)
const totalCards = 12;

// Arrays para almacenar cartas, seleccionadas y valores usados
let cards = [];
let selectedCards = [];
let valuesUsed = [];

// Plantilla HTML de una carta
const cardTemplate = `
  <div class="card">
    <div class="back"></div>
    <div class="face"></div>
  </div>
`;

/* ============================================
   FUNCIÓN PARA GENERAR VALORES ALEATORIOS
   ============================================ */
function getRandomValue() {
  let value;

  do {
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

/* ============================================
   ACTIVAR UNA CARTA AL HACER CLIC
   ============================================ */
function activate(e) {
  const card = e.currentTarget;

  // Evita seleccionar más de dos cartas o seleccionar la misma
  if (selectedCards.length >= 2 || card.classList.contains('active')) return;

  // Voltea la carta
  card.classList.add('active');

  // Guarda la carta seleccionada
  selectedCards.push(card);

  // Si hay dos cartas seleccionadas, compararlas
  if (selectedCards.length === 2) {
    const [first, second] = selectedCards;

    const firstValue = first.querySelector('.face').textContent;
    const secondValue = second.querySelector('.face').textContent;

    if (firstValue === secondValue) {
      // Coinciden → se quedan activas
      selectedCards = [];
    } else {
      // No coinciden → se voltean después de 1 segundo
      setTimeout(() => {
        first.classList.remove('active');
        second.classList.remove('active');
        selectedCards = [];
      }, 1000);
    }
  }

  // Verificar si el juego terminó
  checkGameComplete();
}

/* ============================================
   VERIFICAR SI TODAS LAS CARTAS ESTÁN ACTIVAS
   ============================================ */
function checkGameComplete() {
  const allActive = cards.every(wrapper =>
    wrapper.querySelector('.card').classList.contains('active')
  );

  if (allActive) {
    setTimeout(() => {
      alert('¡Felicidades! Has completado el juego.');
      resetGame();
    }, 500);
  }
}

/* ============================================
   REINICIAR EL JUEGO
   ============================================ */
function resetGame() {
  document.querySelector('#game').innerHTML = '';
  cards = [];
  selectedCards = [];
  valuesUsed = [];

  generateCards();
}

/* ============================================
   GENERAR TODAS LAS CARTAS
   ============================================ */
function generateCards() {
  for (let i = 0; i < totalCards; i++) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = cardTemplate;

    const card = wrapper.querySelector('.card');

    // Asignar valor aleatorio
    const value = getRandomValue();
    card.querySelector('.face').textContent = value;

    // Evento de clic
    card.addEventListener('click', activate);

    // Guardar y agregar al DOM
    cards.push(wrapper);
    document.querySelector('#game').appendChild(wrapper);
  }
}

/* ============================================
   INICIALIZAR EL JUEGO
   ============================================ */
generateCards();
