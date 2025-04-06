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
  // Delay the execution to ensure we get the final size after iOS UI elements appear/disappear
  setTimeout(setVhProperty, 100);
});

// Run the function on orientation change
window.addEventListener('orientationchange', () => {
  // Add a small delay to ensure the browser has fully updated the viewport size
  setTimeout(setVhProperty, 200);
});

// Fix for 100vh issue in iOS by monitoring scroll position
let lastScrollPosition = 0;
window.addEventListener('scroll', () => {
  const currentScrollPosition = window.scrollY;
  
  // If user is scrolling down and past a threshold
  if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 50) {
    // iOS may be showing/hiding address bar, readjust the height
    setTimeout(setVhProperty, 100);
  }
  
  lastScrollPosition = currentScrollPosition;
});

// Handle iOS keyboard appearance
document.addEventListener('focusin', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
    // When keyboard appears, allow the natural scroll behavior
    document.body.classList.add('keyboard-open');
    // Scroll to the input element to ensure it's visible
    setTimeout(() => {
      e.target.scrollIntoView({behavior: 'smooth', block: 'center'});
    }, 300);
  }
});

document.addEventListener('focusout', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
    // When keyboard disappears, restore the fixed height
    document.body.classList.remove('keyboard-open');
    setTimeout(setVhProperty, 100);
  }
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
    
    // Apply iOS specific adjustments
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
        document.body.classList.add('ios-device');
        
        // Fix for iOS event delegation issues with focusable elements
        document.addEventListener('touchstart', function(){}, {passive: true});
    }
}