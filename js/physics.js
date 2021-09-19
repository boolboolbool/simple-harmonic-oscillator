export default class Physics {
    // the length of the time increment, in seconds
    static get deltaT() { return 0.016; }

    constructor(boxPosition=1.0, boxVelocity=0.0,
                springConstant=100.0, boxMass=10.0) {
        // Current state of the system
        this.state = {
            /*
                Position of the box:
                0 is when the box is at the center.
                1.0 is the maximum position to the right.
                -1.0 is the maximum position to the left.
            */
            boxPosition: boxPosition,
            boxVelocity: boxVelocity,
            // The mass of the box
            boxMass: boxMass,
            // The higher the value the stiffer the spring
            springConstant: springConstant,
        };
    }
    
    // Returns acceleration (change of velocity) for the given position
    get currentAcceleration() {
        // We are using the equation of motion for the harmonic oscillator:
        // a = -(k/m) * x
        // Where a is acceleration, x is displacement, k is spring
         // constant and m is mass.

        return -(this.state.springConstant / this.state.boxMass) * this.state.boxPosition;
    }

    // Calculates the new velocity: current velocity plus the change.
    get #newBoxVelocity() {
        return this.state.boxVelocity + Physics.deltaT * this.currentAcceleration;
    }

    // Calculates the new position: current position plus the change.
    get #newBoxPosition() {
        var position = this.state.boxPosition + Physics.deltaT * this.state.boxVelocity;
        // cannot exceed min, max threshold
        if (position > 1) { position = 1; }
        else if (position < -1) { position = -1; }

        return position
    }

    // The main function that is called on every animation frame.
    // It calculates and updates the current position and velocity of the box.
    updateBoxState() {
        this.state.boxVelocity = this.#newBoxVelocity;
        this.state.boxPosition = this.#newBoxPosition;
    }
}
