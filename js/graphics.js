export default class Graphics {
    get colors() {
        let colors = {
            shade30: "#a66000",
			shade40: "#ff6c00",
			shade50: "#ffb100"
        };
        return colors
	}

    constructor() {
        this.canvas = null; // Canvas DOM element
        this.context = null; // Canvas context for drawing

		this.canvasHeight = 100;
		this.boxSize = 50;
		this.springInfo = {
            height: 30, // Height of the spring
			numberOfSegments: 12 // Number of segments in the spring.
		};

        this.init(function(){});
    }

    // Return the middle X position of the box
    boxMiddleX(position) {
        let boxSpaceWidth = this.canvas.width - this.boxSize;
        return boxSpaceWidth * (position + 1) / 2 + this.boxSize;
    }

	// Draw spring from the box to the center.
    // Position argument is the box position and varies from -1 to 1.
	// Value 0 corresponds to the central position,
    // while -1 and 1 are the left and right respectively.
    drawSpring(position) { 
		var springEndX = this.boxMiddleX(position) - (this.boxSize / 2),
	 	    springTopY = (this.canvasHeight - this.springInfo.height) / 2,
			springEndY = this.canvasHeight / 2,
			canvasMiddleX = this.canvas.width / 2,
			singleSegmentWidth = (springEndX - canvasMiddleX) / (this.springInfo.numberOfSegments - 1);
		var springGoesUp = true;

		this.context.beginPath();
		this.context.lineWidth = 1;
		this.context.strokeStyle = this.colors.shade40;
		this.context.moveTo(springEndX, springEndY);

		for (let i = 0; i < this.springInfo.numberOfSegments; i++) {
		    var currentSegmentWidth = singleSegmentWidth;
			if (i === 0 || i === this.springInfo.numberOfSegments - 1) {
                currentSegmentWidth /= 2;
            }
        
			springEndX -= currentSegmentWidth;
			springEndY = springTopY;
			if (!springGoesUp) { springEndY += this.springInfo.height; }
			if (i === this.springInfo.numberOfSegments - 1) {
                springEndY = this.canvasHeight / 2;
            }
        
			this.context.lineTo(springEndX, springEndY);
			springGoesUp = !springGoesUp;
		}

	    this.context.stroke();
    }

	// Draw a box at position. Position is a value from -1 to 1.
	// Value 0 corresponds to the central position,
    // while -1 and 1 are the left and right respectively.
    drawBox(position) {
		var startY = Math.floor(
            (this.canvasHeight - this.boxSize) / 2);
		var startX = this.boxMiddleX(position) - this.boxSize / 2;

		// Rectangle
		this.context.beginPath();
		this.context.fillStyle = this.colors.shade50;
		this.context.fillRect(startX, startY,
                              this.boxSize, this.boxSize);

		// Border around rectangle
		this.context.beginPath();
		this.context.lineWidth = 1;
		this.context.strokeStyle = this.colors.shade30;
		this.context.strokeRect(startX + 0.5, startY + 0.5,
                                this.boxSize - 1, this.boxSize - 1);
    }

	// Draw vertical line in the middle
	drawMiddleLine() {
        var middleX = Math.floor(this.canvas.width / 2);

	    this.context.beginPath();
	    this.context.moveTo(middleX, 0);
	    this.context.lineTo(middleX, this.canvas.height);
	    this.context.lineWidth = 2;
	    this.context.strokeStyle = this.colors.shade40;
	    this.context.setLineDash([2,3]);
	    this.context.stroke();
	    this.context.setLineDash([1,0]);
	}

    // Clears everything and draws the whole scene:
    // the line, spring and the box.
    // based on the central position of the box
    drawScene(position) {
	    this.context.clearRect(0, 0,
                               this.canvas.width,
                               this.canvas.height);
		this.drawMiddleLine();
		this.drawSpring(position);
		this.drawBox(position);
	}
	
    hideCanvasNotSupportedMessage() {
		document.getElementById("HarmonicOscillator-notSupportedMessage").style.display ='none';
	}
    
    // Resize canvas to fill the width of container
	fitToContainer() {
        this.canvas.style.width='100%';
		this.canvas.style.height= this.canvasHeight + 'px';
		this.canvas.width  = this.canvas.offsetWidth;
		this.canvas.height = this.canvas.offsetHeight;
	}

    // Create canvas for drawing and call success argument
    init(success) {
        // Find the canvas HTML element
        this.canvas = document.querySelector(".HarmonicOscillator-canvas");

        // Check if the browser supports canvas drawing
        if (!(window.requestAnimationFrame && this.canvas && this.canvas.getContext)) {
            return;
        }

        // Get canvas context for drawing
        this.context = this.canvas.getContext("2d");
        if (!this.context) { return; } // Error, browser does not support canvas

        // If we got to this point it means the browser can draw
        // Hide the old browser message
        this.hideCanvasNotSupportedMessage();

        // Update the size of the canvas
        this.fitToContainer();

        // Execute success callback function
        success();
    }
}
