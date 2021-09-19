export default class Physics {
    // the length of the time increment, in seconds
    static get deltaT() { return 0.016; }

    constructor(position=1.0, velocity=0.0,
                springConstant=100.0, mass=10.0) {
        // Current state of the system
        this.state = {
            /*
                Position of the box:
                0 is when the box is at the center.
                1.0 is the maximum position to the right.
                -1.0 is the maximum position to the left.
            */
            boxPosition: position,
            velocity: velocity,
            // The higher the value the stiffer the spring
            springConstant: springConstant,
            // The mass of the box
            mass: mass
        };
    }
    
    // Returns acceleration (change of velocity) for the given position
    get currentAcceleration() {
        // We are using the equation of motion for the harmonic oscillator:
        // a = -(k/m) * x
        // Where a is acceleration, x is displacement, k is spring
         // constant and m is mass.

        return -(this.state.springConstant / this.state.mass) * this.state.boxPosition;
    }

    // Calculates the new velocity: current velocity plus the change.
    get newVelocity() {
        return this.state.velocity + Physics.deltaT * this.currentAcceleration;
    }

    // Calculates the new position: current position plus the change.
    get newPosition() {
        var position = this.state.boxPosition + Physics.deltaT * this.state.velocity;
        // cannot exceed min, max threshold
        if (position > 1) { position = 1; }
        else if (position < -1) { position = -1; }

        return position
    }

    // The main function that is called on every animation frame.
    // It calculates and updates the current position of the box.
    updateBoxPosition() {
        this.state.velocity = this.newVelocity;
        this.state.boxPosition = this.newPosition;
    }
}
