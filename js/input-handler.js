export function SetUpInputHandlers(state) {
    // get user inputs
    let massInput = document.getElementById(
        "HarmonicOscillator-mass");
    let springConstantInput = document.getElementById(
        "HarmonicOscillator-springConstant");

    // Set initial values
    massInput.value = state.mass;
    springConstantInput.value = state.springConstant;

    // add input handles
    massInput.addEventListener('input', function() {
        let m = parseFloat(massInput.value);
        if (!isNaN(m)) {
            state.mass = m;
        }
    });
    springConstantInput.addEventListener('input', function() {
        let c = parseFloat(springConstantInput.value);
        if (!isNaN(c)) {
            state.springConstant = c;
        }
    });
}
