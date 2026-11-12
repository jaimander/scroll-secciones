
const container = document.getElementById("scrollContainer");
const sections = [...document.querySelectorAll(".section")];

let currentSection = 0;
let isAnimating = false;

let wheelTimer;
let wheelDelta = 0;

const VELOCITY_THRESHOLD = 35;
const ANIMATION_DURATION = 850;

// Detectar sección actual
function updateCurrentSection() {
  if (isAnimating) return;

  const position = container.scrollTop;

  let closest = 0;
  let minDistance = Infinity;

  sections.forEach((section, index) => {
    const distance = Math.abs(section.offsetTop - position);

    if (distance < minDistance) {
      minDistance = distance;
      closest = index;
    }
  });

  currentSection = closest;
}

// Navegación entre secciones
function goToSection(index) {
  if (
    index < 0 ||
    index >= sections.length ||
    isAnimating
  ) return;

  isAnimating = true;
  currentSection = index;

  container.scrollTo({
    top: sections[index].offsetTop,
    behavior: "smooth"
  });

  setTimeout(() => {
    isAnimating = false;
  }, ANIMATION_DURATION);
}

// Detectar scroll con rueda
container.addEventListener("wheel", (e) => {
  if (isAnimating) {
    e.preventDefault();
    return;
  }

  wheelDelta += e.deltaY;

  clearTimeout(wheelTimer);

  wheelTimer = setTimeout(() => {
    const velocity = Math.abs(wheelDelta);

    if (velocity > VELOCITY_THRESHOLD) {
      if (wheelDelta > 0) {
        goToSection(currentSection + 1);
      } else {
        goToSection(currentSection - 1);
      }
    }

    wheelDelta = 0;
  }, 100);

}, { passive: true });

// Detectar drag táctil
let touchStartY = 0;
let touchStartTime = 0;

container.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
  touchStartTime = Date.now();
}, { passive: true });

container.addEventListener("touchend", (e) => {
  if (isAnimating) return;

  const touchEndY = e.changedTouches[0].clientY;
  const distance = touchStartY - touchEndY;
  const elapsed = Date.now() - touchStartTime;

  const velocity = Math.abs(distance) / Math.max(elapsed, 1);

  if (velocity > 0.6 && Math.abs(distance) > 40) {
    if (distance > 0) {
      goToSection(currentSection + 1);
    } else {
      goToSection(currentSection - 1);
    }
  }
}, { passive: true });

// Actualizar sección durante scroll libre
container.addEventListener("scroll", updateCurrentSection);
