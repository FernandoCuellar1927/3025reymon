const totalImages = 47;  // Número total de imágenes
let currentImage = 0;    // Imagen actual que se está mostrando
let isDragging = false;  // Estado de si el ratón está siendo arrastrado
let startX = 0;          // Posición inicial del cursor o del toque
const imageViewer = document.getElementById('image-viewer');
const imageSlider = document.getElementById('image-slider');

// Función para actualizar la imagen visible sin desvanecimiento
function updateImage(index) {
    const imageIndex = index % totalImages;
    const paddedIndex = imageIndex < 9 ? `0${imageIndex + 1}` : imageIndex + 1;
    imageViewer.src = `images/image${paddedIndex}.jpg`; // Cambio inmediato de imagen
    imageSlider.value = imageIndex;  // Sincroniza el deslizador con la imagen actual
}

// Control de la animación para fluidez
function smoothUpdate() {
    requestAnimationFrame(smoothUpdate);  // Actualiza la imagen constantemente
}

// Inicia la animación
smoothUpdate();

// Evento de arrastre con el ratón
document.querySelector('.viewer-container').addEventListener('mousedown', (event) => {
    isDragging = true;
    startX = event.pageX;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    const deltaX = event.pageX - startX;
    const imageChange = Math.floor(deltaX / 10);  // Ajusta la velocidad de rotación
    currentImage = (currentImage + imageChange + totalImages) % totalImages;
    startX = event.pageX;
    updateImage(currentImage);  // Actualiza la imagen inmediatamente al mover el ratón
});

// Eventos táctiles para dispositivos móviles
document.querySelector('.viewer-container').addEventListener('touchstart', (event) => {
    startX = event.touches[0].pageX;
});

document.addEventListener('touchmove', (event) => {
    const deltaX = event.touches[0].pageX - startX;
    const imageChange = Math.floor(deltaX / 10);
    currentImage = (currentImage + imageChange + totalImages) % totalImages;
    startX = event.touches[0].pageX;
    updateImage(currentImage);  // Actualiza la imagen inmediatamente al tocar
});

// Evento para deslizador
imageSlider.addEventListener('input', (event) => {
    currentImage = parseInt(event.target.value);
    updateImage(currentImage);
});
