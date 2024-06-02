particlesJS('particles-js', {
    particles: {
    number: { value: 200 },
    color: { value: '#000000' },
    shape: { type: 'circle' },
    opacity: {
    value: 1,
    random: true
    },
    size: {
    value: 3,
    random: true
    },
    line_linked: {
    enable: false
    },
    move: {
    speed: 1
    }
},
interactivity: {
    events: {
    onhover: { enable: false },
    onclick: { enable: false }
    }
}
});

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