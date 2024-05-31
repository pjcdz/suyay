function isInputNumber(evt){
    var ch = String.fromCharCode(evt.which);
    
    if(!(/[0-9]/.test(ch))){
        evt.preventDefault();
    }
    
}

window.onload = function() {
    var dniInput = document.getElementsByName('dni')[0];
    var nameInput = document.getElementsByName('name')[0];
    var creditInput = document.getElementsByName('credito')[0];

    function checkDniOnLoad() {
        var dniValue = dniInput.value;
        if (dniValue === '0' || dniValue === '') {
            nameInput.setAttribute('readonly', true);
            creditInput.setAttribute('readonly', true);
        }
    }

    checkDniOnLoad(); // Call on page load
}

for (let i = 0; i < 50; i++) {
    createStar();
}

function createStar() {
    let star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.animationDuration = (Math.random() * 20 + 20) + 's'; // Duración de animación aleatoria entre 20 y 40 segundos
    star.style.opacity = Math.random();
    star.style.top = Math.random() * 100 + 'vh';
    document.body.appendChild(star);

    star.addEventListener('animationend', function() {
        document.body.removeChild(star);
        createStar();
    });
}