//detect screen size
function logScreenSize() {
  const width = window.innerWidth;
  return width
}
// Add an event listener to detect changes in screen size
window.addEventListener('resize', logScreenSize);
console.log(logScreenSize())

// Function to detect the browser
function detectBrowser() {
    const userAgent = navigator.userAgent;
if (userAgent.indexOf("Firefox") > -1) {
    return "firefox";
  } else if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1) {
    return "chrome";
  } else if (userAgent.indexOf("Safari") > -1) {
    return "safari";
  } else if (userAgent.indexOf("MSIE") > -1 || !!document.documentMode) {
    return "ie"; // IE 10 or older
  } else if (!!window.StyleMedia) {
    return "edge"; // Edge
  } else {
    return "unknown";
  }
}

// Function to apply the class based on the browser
function applyBrowserClass() {
  const browser = detectBrowser();
  const size = logScreenSize();

  if (browser === "firefox" && size >= 700) {
    document.querySelector('.containerA').removeAttribute('id');
    document.querySelector('.containerB').removeAttribute('id');
    document.querySelector('.containerC').removeAttribute('id');
    document.querySelector('.containerD').removeAttribute('id');
    const elementA = document.querySelector(".containerA")
    const elementB = document.querySelector(".containerB")
    const elementC = document.querySelector(".containerC")
    const elementD = document.querySelector(".containerD")
    transit(elementA)
    transitB(elementB)
    transitB(elementC)
    transitB(elementD)
    
    } else if (browser === "chrome") {
      
    } else if (browser === "safari") {
      
    } else if (browser === "ie") {
    const elementA = document.querySelector(".containerA")
    const elementB = document.querySelector(".containerB")
    const elementC = document.querySelector(".containerC")
    const elementD = document.querySelector(".containerD")
    transit(elementA)
    transitB(elementB)
    transitB(elementC)
    transitB(elementD)
    
  } else if (browser === "edge") {
    
  } else {
    
  }
}

// Apply the class when the document is ready
document.addEventListener("DOMContentLoaded", applyBrowserClass);

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        logScreenSize();
    }, 250);
});


function transit(element){
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4
  };
    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('amazingB');
        } else {
          entry.target.classList.remove('amazingB');
        }
        });
        };
        
        let observer = new IntersectionObserver(callback, options);
        if (element) {
          observer.observe(element);
      
      }
    
  
}
function transitB(element){
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4
  };
    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fadeAlpha');
        } else {
          entry.target.classList.remove('fadeAlpha');
        }
        });
        };
        let observer = new IntersectionObserver(callback, options);
        if (element) {
          observer.observe(element);
      }
}

// const element = document.querySelector('.containerA'); // Select the single element
// const options = {
//   root: null,
//   rootMargin: '0px',
//   threshold: 0.4
// };

// const callback = (entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('amazingB');
//     } else {
//       entry.target.classList.remove('amazingB');
//     }
//   });
// };

// let observer = new IntersectionObserver(callback, options);

// if (element) {
//   observer.observe(element);

// }