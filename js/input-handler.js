export function SetUpInputHandlers(state) {
    // get user inputs
    let boxMassInput = document.getElementById(
        "HarmonicOscillator-boxMass");
    let springConstantInput = document.getElementById(
        "HarmonicOscillator-springConstant");

    // Set initial values
    boxMassInput.value = state.boxMass;
    springConstantInput.value = state.springConstant;

    // add input handles
    boxMassInput.addEventListener('input', function() {
        let m = parseFloat(boxMassInput.value);
        if (!isNaN(m)) {
            state.boxMass = m;
        }
    });
    springConstantInput.addEventListener('input', function() {
        let c = parseFloat(springConstantInput.value);
        if (!isNaN(c)) {
            state.springConstant = c;
        }
    });
}
