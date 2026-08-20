// site/js/colors.js
const systemColors = {
    primary: "#083858",        // Azul-marinho profundo
    secondary: "#083868",      // Azul-petróleo
    dark: "#062A42",           // Azul-marinho escuro
    accent: "#D8C898",         // Dourado champanhe
    textMain: "#333333",
    textLight: "#666666",
    whatsappStart: "#25D366",
    whatsappEnd: "#128C7E"
};

// Aplicar cores via CSS custom properties
function applySystemColors() {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', systemColors.primary);
    root.style.setProperty('--secondary-color', systemColors.secondary);
    root.style.setProperty('--dark-color', systemColors.dark);
    root.style.setProperty('--accent-color', systemColors.accent);
    root.style.setProperty('--text-main', systemColors.textMain);
    root.style.setProperty('--text-light', systemColors.textLight);
}

document.addEventListener('DOMContentLoaded', applySystemColors);