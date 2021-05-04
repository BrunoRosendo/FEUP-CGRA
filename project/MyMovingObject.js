export class MyMovingObject {

    minHeight = 0;
    maxHeight = 2;

    constructor(scene, object) {
        this.scene = scene;
        this.object = object;
        this.reset();
    }
    initBuffers() {
        this.object.initBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity) {
        this.object.updateBuffers(complexity);
    }

    update(t) {
        this.position[0] += this.scene.speedFactor * Math.sin(this.orientation) * this.velocity;
        this.position[1] += this.scene.speedFactor * this.verticalVelocity;
        if (this.position[1] < this.minHeight) {
            this.position[1] = this.minHeight;
        }
        if (this.position[1] > this.maxHeight) {
            this.position[1] = this.maxHeight;
        }
        this.position[2] += this.scene.speedFactor * Math.cos(this.orientation) * this.velocity;

        this.object.update(t);
    }

    turn(val) {
        this.orientation += val;
    }

    accelerate(val) {
        this.velocity += val;
    }

    ascend() {
        this.verticalVelocity = this.maxHeight / 100;
    }

    descend() {
        this.verticalVelocity = -this.maxHeight / 100;
    }

    reset() {
        this.velocity = 0;
        this.verticalVelocity = 0;
        this.position = [0, this.maxHeight, 0];
        this.orientation = 0;
    }

    display() {
        // // Animate based on user input
        this.scene.translate(...this.position);
        this.scene.rotate(this.orientation, 0, 1, 0);

        // Put the object in the right position. May change with the type of object
        // this.scene.translate(0, 0, -0.5);
        // this.scene.rotate(Math.PI / 2, 1, 0, 0);

        this.object.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

    }
}


