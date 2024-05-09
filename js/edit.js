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