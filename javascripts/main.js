document.addEventListener('DOMContentLoaded', function() {
    
    // -------------------------------section 2---------------------------------
    
    const roomBlock = document.querySelector('.example');
    const roomImg = document.querySelector('.roomimg');

    roomBlock.addEventListener('click', function() {
        roomImg.classList.toggle('visible');
    });

    // -------------------------------section 3---------------------------------

    const canvas = document.getElementById('art');
    const clearButton = document.querySelector('.canvas-item-1');
    const changeLineWidthButton = document.querySelector('.canvas-item-2');
    const sizePreviewDiv = document.querySelector('.brush');
    const ctx = canvas.getContext('2d');

    // линии были пиксельные, увеличил разрешение канваса
    const dpi = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpi;
    canvas.height = canvas.clientHeight * dpi;
    ctx.scale(dpi, dpi);

    // закругленные концы и соединения линий
    let isDrawing = false;
    ctx.strokeStyle = 'black';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // возможные размеры линии
    const lineWidths = [2, 5, 10];
    let currentLineWidthIndex = 0;
    ctx.lineWidth = lineWidths[currentLineWidthIndex];

    function updateSizePreview() {
        const size = ctx.lineWidth * 0.4;
        sizePreviewDiv.style.width = `${size}vw`;
        sizePreviewDiv.style.height = `${size}vw`;
    }

    // инициализация размера div
    updateSizePreview();

    // функция для получения правильных координат курсора
    function getCanvasMousePosition(event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: (event.clientX - rect.left) * scaleX / dpi,
            y: (event.clientY - rect.top) * scaleY / dpi
        };
    }

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const { x, y } = getCanvasMousePosition(e);
        ctx.beginPath();
        ctx.moveTo(x, y);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            const { x, y } = getCanvasMousePosition(e);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
        ctx.closePath();
    });

    clearButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    changeLineWidthButton.addEventListener('click', () => {
        currentLineWidthIndex = (currentLineWidthIndex + 1) % lineWidths.length;
        ctx.lineWidth = lineWidths[currentLineWidthIndex];

        updateSizePreview();
    });
  
    // -------------------------------section 4---------------------------------


 })