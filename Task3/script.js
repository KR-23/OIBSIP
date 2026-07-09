const tempInput = document.getElementById('tempInput');
const unitRadios = document.querySelectorAll('input[name="unit"]');
const convertBtn = document.getElementById('convertBtn');
const resultSection = document.getElementById('resultSection');
const resultValue = document.getElementById('resultValue');
const resultUnit = document.getElementById('resultUnit');
const errorMessage = document.getElementById('errorMessage');
const kelvinToggle = document.getElementById('kelvinToggle');
const kelvinResult = document.getElementById('kelvinResult');
const kelvinValue = document.getElementById('kelvinValue');

/**
 * Get the currently selected unit
 * @returns {string} - 'celsius' or 'fahrenheit'
 */
function getSelectedUnit() {
    return document.querySelector('input[name="unit"]:checked').value;
}

/**
 * Validate if the input is a valid number
 * @param {string} value - The input value to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateInput(value) {
    return value !== '' && !isNaN(value) && isFinite(value);
}

/**
 * Convert temperature and display results
 */
function convertTemperature() {
    const value = parseFloat(tempInput.value);
    const unit = getSelectedUnit();

    // Clear previous error
    errorMessage.classList.remove('show');
    resultSection.style.display = 'none';

    // Validate input
    if (!validateInput(value)) {
        errorMessage.classList.add('show');
        return;
    }

    let celsius, fahrenheit, kelvin;

    // Perform conversion based on selected unit
    if (unit === 'celsius') {
        celsius = value;
        fahrenheit = (celsius * 9/5) + 32;
        kelvin = celsius + 273.15;
        resultValue.textContent = fahrenheit.toFixed(2);
        resultUnit.textContent = '°F';
    } else {
        fahrenheit = value;
        celsius = (fahrenheit - 32) * 5/9;
        kelvin = celsius + 273.15;
        resultValue.textContent = celsius.toFixed(2);
        resultUnit.textContent = '°C';
    }

    // Show result section
    resultSection.style.display = 'flex';

    // Show Kelvin if toggle is enabled
    if (kelvinToggle.checked) {
        kelvinValue.textContent = kelvin.toFixed(2);
        kelvinResult.classList.add('show');
    }
}

/**
 * Convert button click handler
 */
convertBtn.addEventListener('click', convertTemperature);

/**
 * Allow conversion on Enter key press
 */
tempInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        convertTemperature();
    }
});

/**
 * Kelvin toggle change handler
 */
kelvinToggle.addEventListener('change', () => {
    if (kelvinToggle.checked && resultSection.style.display === 'flex') {
        // Show Kelvin result if result is already displayed
        const value = parseFloat(tempInput.value);
        const unit = getSelectedUnit();
        let celsius;

        // Convert to Celsius first
        if (unit === 'celsius') {
            celsius = value;
        } else {
            celsius = (value - 32) * 5/9;
        }

        const kelvin = celsius + 273.15;
        kelvinValue.textContent = kelvin.toFixed(2);
        kelvinResult.classList.add('show');
    } else {
        // Hide Kelvin result
        kelvinResult.classList.remove('show');
    }
});

/**
 * Clear error message when user starts typing
 */
tempInput.addEventListener('input', () => {
    errorMessage.classList.remove('show');
});
