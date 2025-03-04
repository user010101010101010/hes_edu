document.addEventListener('DOMContentLoaded', function() {
    
    // -------------------------------section 2---------------------------------
    
    const korpusa = document.getElementById('korpusa');
    const korpusb = document.getElementById('korpusb');
    const korpusc = document.getElementById('korpusc');
    const korpusd = document.getElementById('korpusd');
    const korpuse = document.getElementById('korpuse');
    const rooma = document.getElementById('rooma');
    const roomb = document.getElementById('roomb');
    const roomc = document.getElementById('roomc');
    const roomd = document.getElementById('roomd');
    const roome = document.getElementById('roome');
    const clickme = document.getElementById('clickme');

    rooma.style.opacity = '0';
    rooma.style.visibility = 'hidden';
    roomb.style.opacity = '0';
    roomb.style.visibility = 'hidden';
    roomc.style.opacity = '0';
    roomc.style.visibility = 'hidden';
    roomd.style.opacity = '0';
    roomd.style.visibility = 'hidden';
    roome.style.opacity = '0';
    roome.style.visibility = 'hidden';
    clickme.style.opacity = '1';
    clickme.style.visibility = 'visible';

    function hideAllExcept(exceptElement) {
        const elements = [rooma, roomb, roomc, roomd, roome, clickme];
        // forEach используется для перебора массива элементов и скрытия всех элементов, кроме указанного
        elements.forEach(element => { 
            if (element !== exceptElement) {
                element.style.opacity = '0';
                element.style.visibility = 'hidden';
            }
        });
    }

    function isElementVisible(element) {
    return element.style.opacity === '1' && element.style.visibility === 'visible';
    }

    korpusa.addEventListener('click', () => {
        if (isElementVisible(rooma)) {
            rooma.style.opacity = '0';
            rooma.style.visibility = 'hidden';
            clickme.style.opacity = '1';
            clickme.style.visibility = 'visible';
        } else {
            hideAllExcept(rooma);
            rooma.style.opacity = '1';
            rooma.style.visibility = 'visible';
            clickme.style.opacity = '0';
            clickme.style.visibility = 'hidden';
        }
    });

    korpusb.addEventListener('click', () => {
        if (isElementVisible(roomb)) {
            roomb.style.opacity = '0';
            roomb.style.visibility = 'hidden';
            clickme.style.opacity = '1';
            clickme.style.visibility = 'visible';
        } else {
            hideAllExcept(roomb);
            roomb.style.opacity = '1';
            roomb.style.visibility = 'visible';
            clickme.style.opacity = '0';
            clickme.style.visibility = 'hidden';
        }
    });

        korpusc.addEventListener('click', () => {
        if (isElementVisible(roomc)) {
            roomc.style.opacity = '0';
            roomc.style.visibility = 'hidden';
            clickme.style.opacity = '1';
            clickme.style.visibility = 'visible';
        } else {
            hideAllExcept(roomc);
            roomc.style.opacity = '1';
            roomc.style.visibility = 'visible';
            clickme.style.opacity = '0';
            clickme.style.visibility = 'hidden';
        }
    });

        korpusd.addEventListener('click', () => {
        if (isElementVisible(roomd)) {
            roomd.style.opacity = '0';
            roomd.style.visibility = 'hidden';
            clickme.style.opacity = '1';
            clickme.style.visibility = 'visible';
        } else {
            hideAllExcept(roomd);
            roomd.style.opacity = '1';
            roomd.style.visibility = 'visible';
            clickme.style.opacity = '0';
            clickme.style.visibility = 'hidden';
        }
    });

        korpuse.addEventListener('click', () => {
        if (isElementVisible(roome)) {
            roome.style.opacity = '0';
            roome.style.visibility = 'hidden';
            clickme.style.opacity = '1';
            clickme.style.visibility = 'visible';
        } else {
            hideAllExcept(roome);
            roome.style.opacity = '1';
            roome.style.visibility = 'visible';
            clickme.style.opacity = '0';
            clickme.style.visibility = 'hidden';
        }
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