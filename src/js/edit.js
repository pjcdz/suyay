particlesJS('particles-js', {
  particles: {
    number: { 
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: { value: '#7C5DFA' },
    shape: { 
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.3,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#9277FF',
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 0.4
        }
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
});

function isInputNumber(evt){
    var ch = String.fromCharCode(evt.which);
    
    if(!(/[0-9]/.test(ch))){
        evt.preventDefault();
    }
}

// Fix for iOS Safari viewport height issue
function setVhProperty() {
  // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Run the function on initial load
setVhProperty();

// Run the function on resize
window.addEventListener('resize', () => {
  setVhProperty();
});

// Run the function on orientation change
window.addEventListener('orientationchange', () => {
  // Add a small delay to ensure the browser has fully updated the viewport size
  setTimeout(() => {
    setVhProperty();
  }, 100);
});

window.onload = function() {
    var dniInput = document.getElementsByName('dni')[0];
    var nameInput = document.getElementsByName('name')[0];
    var creditInput = document.getElementsByName('credito')[0];

    function checkDniOnLoad() {
        var dniValue = dniInput ? dniInput.value : null;
        if (dniValue === '0' || dniValue === '') {
            if (nameInput) nameInput.setAttribute('readonly', true);
            if (creditInput) creditInput.setAttribute('readonly', true);
        }
    }

    // Call on page load if these elements exist
    if (dniInput) {
        checkDniOnLoad();
    }
    
    // Set viewport height again after page is fully loaded
    setVhProperty();
}