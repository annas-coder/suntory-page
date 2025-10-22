const wrapper = document.querySelector('.honeycomb');
const frameRate = 2;
const minScale = .7;
const maxScale = 1.4;
const scaleRange = maxScale - minScale;
let lastFrame;
let isMouseOverGrid = false;

// this helper function stolen from a hero on stackoverflow
function dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
    }
}

function animateChildren(parent, origin) {
    const cells = document.querySelectorAll('.cell');
    const childrenWithDistances = [];

    cells.forEach(cell => {
        const r = cell.getBoundingClientRect();
        const childX = r.left + r.width / 2;
        const childY = r.top + r.height / 2;
        const distanceX = origin.x - childX;
        const distanceY = origin.y - childY;
        const hypot = Math.hypot(distanceX, distanceY);

        cell.distance = Math.round(hypot);
        childrenWithDistances.push(cell);
    })

    childrenWithDistances.sort(dynamicSort('distance')).reverse();

    childrenWithDistances.forEach((cell, index) => {
        const relativeAmt = (index / childrenWithDistances.length) * scaleRange;
        cell.style.setProperty('--scale', minScale + relativeAmt);
    });
}

// Mouse enter event for honeycomb grid
wrapper.addEventListener('mouseenter', function() {
    isMouseOverGrid = true;
});

// Mouse leave event for honeycomb grid
wrapper.addEventListener('mouseleave', function() {
    isMouseOverGrid = false;
    // Reset all cells to default scale and remove any hover effects
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.setProperty('--scale', '1');
        cell.classList.remove('hovered');
    });
});

// Mouse move event - only when over the grid
wrapper.addEventListener('mousemove', function (e) {
    if (!isMouseOverGrid) return;
    
    // Always show corner indicators when cursor is over the grid
    const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
    const cellUnderCursor = elementUnderCursor?.closest('.cell');
    
    // Remove hovered class from all cells first
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('hovered');
    });
    
    // Add hovered class to the cell under cursor (for corner indicators)
    if (cellUnderCursor) {
        cellUnderCursor.classList.add('hovered');
    }
    
    requestAnimationFrame(function (thisFrame) {
        if (thisFrame - lastFrame > frameRate) {
            const screenCenter = {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            }
            const moveX = e.x - screenCenter.x;
            const moveY = e.y - screenCenter.y;

            wrapper.style.setProperty('--x', moveX / 10 + '%');
            wrapper.style.setProperty('--y', moveY / 10 + '%');

            animateChildren(wrapper, e);
        }
        lastFrame = thisFrame;
    })
})

document.body.addEventListener('scroll', function (e) {
    const screenCenter = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    }
    animateChildren(wrapper, screenCenter);
})

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(2);
            opacity: 0.6;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes clickPulse {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(1.5);
            opacity: 0.8;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
    
    @keyframes professionalGlow {
        0% {
            filter: drop-shadow(0 0 0 3px #4A90E2);
        }
        50% {
            filter: drop-shadow(0 0 8px #4A90E2);
        }
        100% {
            filter: drop-shadow(0 0 0 3px #4A90E2);
        }
    }
    
    /* Professional hover system */
    .cell {
        will-change: transform, border, box-shadow;
    }
    
    .cell.hovered {
        z-index: 10;
    }
`;
document.head.appendChild(style);
