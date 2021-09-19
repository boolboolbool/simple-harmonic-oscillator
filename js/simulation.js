import Physics from './physics.js';
import Graphics from './graphics.js';

export default class Simulation {
    constructor() {
        console.log('Constructing simulation...');
        this.physics = new Physics();
        this.graphics = new Graphics();
        console.log('Simulation constructed!');
        
        // Redraw the scene if page is resized
        window.addEventListener('resize', function(event) {
            this.graphics.fitToContainer();
            this.graphics.drawScene(this.physics.state.boxPosition);
        });
        
    }
}

var simulation = new Simulation();

const animate = () => {
    console.log('updating box position...');
    simulation.physics.updateBoxPosition();
    console.log('box position: ', simulation.physics.state.boxPosition);
    console.log('drawing scene...');
    simulation.graphics.drawScene(simulation.physics.state.boxPosition);
    console.log('reanimation request...');
    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);
