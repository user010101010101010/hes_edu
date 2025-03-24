document.addEventListener('DOMContentLoaded', () => {
  interactiveMap()
  canvasDraw()
  bookSelection()
  addBRtoH1()
  window.addEventListener('resize', addBRtoH1())
})
    
    // -------------------------------section 2---------------------------------
    
    function interactiveMap() {

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
    }

    // -------------------------------section 3---------------------------------

    function canvasDraw() {

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
    ctx.strokeStyle = '#FE5001';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // возможные размеры линии
    const lineWidths = [2, 5, 10];
    let currentLineWidthIndex = 0;
    ctx.lineWidth = lineWidths[currentLineWidthIndex];

    function updateSizePreview() {
        const size = ctx.lineWidth * 0.5;
        sizePreviewDiv.style.width = `${size}vw`;
        sizePreviewDiv.style.height = `${size}vw`;
    }

    // инициализация размера div
    updateSizePreview();

    function getCanvasPosition(event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        let clientX, clientY;
        
        if (event.type.includes('touch')) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        
        return {
            x: (clientX - rect.left) * scaleX / dpi,
            y: (clientY - rect.top) * scaleY / dpi
        };
    }

    // Обработчики для мыши
    function startDrawing(e) {
        isDrawing = true;
        const { x, y } = getCanvasPosition(e);
        ctx.beginPath();
        ctx.moveTo(x, y);
        e.preventDefault(); // Предотвращаем обработку браузером
    }

    function draw(e) {
        if (isDrawing) {
            const { x, y } = getCanvasPosition(e);
            ctx.lineTo(x, y);
            ctx.stroke();
            e.preventDefault(); // Предотвращаем обработку браузером
        }
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.closePath();
    }

    // Добавляем обработчики для мыши
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Добавляем обработчики для касаний
    canvas.addEventListener('touchstart', (e) => {
        startDrawing(e);
        // Предотвращаем прокрутку страницы при рисовании
        if (e.cancelable) {
            e.preventDefault();
        }
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
        draw(e);
        // Предотвращаем прокрутку страницы при рисовании
        if (e.cancelable) {
            e.preventDefault();
        }
    }, { passive: false });

    canvas.addEventListener('touchend', stopDrawing);

    // Обработчики кнопок
    clearButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    changeLineWidthButton.addEventListener('click', () => {
        currentLineWidthIndex = (currentLineWidthIndex + 1) % lineWidths.length;
        ctx.lineWidth = lineWidths[currentLineWidthIndex];
        updateSizePreview();
    });

    // Предотвращаем стандартное поведение касания на всем документе
    document.addEventListener('touchstart', (e) => {
        if (e.target === canvas) {
            e.preventDefault();
        }
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
        if (e.target === canvas) {
            e.preventDefault();
        }
    }, { passive: false });
    }
  
    // -------------------------------section 4---------------------------------

    function bookSelection() {
            const books = document.querySelectorAll('.academy-book, .grivastikus-book, .kafedra-book, .ippo-book');
    const container = document.querySelector('.razvorot-container');
    const razvorots = document.querySelectorAll('.academy-razvorot, .grivastikus-razvorot, .kafedra-razvorot, .ippo-razvorot');
    const textInBox = document.querySelector('.container-p')

    books.forEach(book => {
        book.addEventListener('dragstart', dragStart);
        book.addEventListener('dragend', dragEnd);
    });

    container.addEventListener('dragover', dragOver);
    container.addEventListener('drop', drop);

    razvorots.forEach(razvorot => {
        razvorot.addEventListener('dblclick', () => {
            razvorot.style.display = 'none'; 
        });
    });

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.classList[0]);
        textInBox.classList.add('dragstart')

        container.classList.add('drag-over');
    }

    function dragEnd() {
        container.classList.remove('drag-over');
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const bookClass = event.dataTransfer.getData('text/plain'); 
        const razvorotClass = bookClass.replace('-book', '-razvorot'); 
        const razvorot = document.querySelector(`.${razvorotClass}`); 

        razvorots.forEach(r => r.style.display = 'none');
        razvorot.style.display = 'block';

        container.classList.remove('drag-over');
    }
    }
    // -------------------------------adaptive---------------------------------
    
    function addBRtoH1() {
  const h1 = document.querySelector('.foreground h1')

  setInterval(() => {
    if (window.innerWidth < 770) {
      h1.innerHTML = 'HORSE.<br> EDU'
    } else {
      h1.innerHTML = 'HORSE.EDU'
    }
  }, 1000)
}