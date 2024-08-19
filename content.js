const clickableElements = document.querySelectorAll('a, button, [role="button"], [onclick], input[type="button"], input[type="submit"]');

clickableElements.forEach(element => {
    element.style.outline = '4px solid rgba(255, 0, 0, 1)';
    element.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
    element.style.color = 'white';
    element.style.fontWeight = 'bold';
    element.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.8)';
    element.style.transition = 'outline 0.3s ease, background-color 0.3s ease';

    element.addEventListener('mouseover', () => {
        element.style.outline = '4px solid rgba(255, 255, 0, 1)';
        element.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
        element.style.boxShadow = '0 0 15px rgba(255, 255, 0, 1)';
    });

    element.addEventListener('mouseout', () => {
        element.style.outline = '4px solid rgba(255, 0, 0, 1)';
        element.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
        element.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.8)';
    });
});
