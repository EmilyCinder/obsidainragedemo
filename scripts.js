document.addEventListener("DOMContentLoaded", () => {
    // Initialize SVG for dynamic border effect
    const svgNS = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(svgNS, "svg");
    svg.setAttributeNS(null, "style", "position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10;");
    svg.setAttributeNS(null, "id", "dynamic-border");

    // Define filter for pixelation and additional effects
    let filter = document.createElementNS(svgNS, "filter");
    filter.setAttributeNS(null, "id", "pixelate-filter");

    // Create fractal noise for pixelation effect
    let feTurbulence = document.createElementNS(svgNS, "feTurbulence");
    feTurbulence.setAttributeNS(null, "type", "fractalNoise");
    feTurbulence.setAttributeNS(null, "baseFrequency", "0.8");
    feTurbulence.setAttributeNS(null, "numOctaves", "3");
    feTurbulence.setAttributeNS(null, "result", "noise");

    // Displacement map to create pixelated effect
    let feDisplacementMap = document.createElementNS(svgNS, "feDisplacementMap");
    feDisplacementMap.setAttributeNS(null, "in", "SourceGraphic");
    feDisplacementMap.setAttributeNS(null, "in2", "noise");
    feDisplacementMap.setAttributeNS(null, "scale", "20");
    feDisplacementMap.setAttributeNS(null, "xChannelSelector", "R");
    feDisplacementMap.setAttributeNS(null, "yChannelSelector", "G");

    // Additional filter effects (e.g., blur, composite)
    let feGaussianBlur = document.createElementNS(svgNS, "feGaussianBlur");
    feGaussianBlur.setAttributeNS(null, "stdDeviation", "2");
    feGaussianBlur.setAttributeNS(null, "result", "blur");

    let feComposite = document.createElementNS(svgNS, "feComposite");
    feComposite.setAttributeNS(null, "in", "SourceGraphic");
    feComposite.setAttributeNS(null, "in2", "blur");
    feComposite.setAttributeNS(null, "operator", "atop");

    // Build the filter with all effects
    filter.appendChild(feTurbulence);
    filter.appendChild(feDisplacementMap);
    filter.appendChild(feGaussianBlur);
    filter.appendChild(feComposite);
    svg.appendChild(filter);
    document.body.appendChild(svg);

    // Create a square for the border effect
    let rect = document.createElementNS(svgNS, "rect");
    rect.setAttributeNS(null, "x", "0");
    rect.setAttributeNS(null, "y", "0");
    rect.setAttributeNS(null, "width", "100%");
    rect.setAttributeNS(null, "height", "100%");
    rect.setAttributeNS(null, "fill", "none");
    rect.setAttributeNS(null, "stroke", "red");
    rect.setAttributeNS(null, "stroke-width", "10"); // Adjust stroke width as needed
    rect.setAttributeNS(null, "filter", "url(#pixelate-filter)");
    svg.appendChild(rect);

    // Animation logic for the dynamic border effect
    let toggle = true;
    setInterval(() => {
        rect.style.filter = toggle ? 'url(#pixelate-filter)' : 'none';
        toggle = !toggle;
    }, 3000);  // Change every 3 seconds
});
