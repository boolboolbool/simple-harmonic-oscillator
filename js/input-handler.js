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
        state.mass = parseFloat(massInput.value);
    });
    springConstantInput.addEventListener('input', function() {
        state.springConstant = parseFloat(
            springConstantInput.value);
    });
}
