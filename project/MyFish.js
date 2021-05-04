import { CGFobject, CGFappearance, CGFshader } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { MyTriangle } from './MyTriangle.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
import { toRads } from './utilities/algebra.js';

export class MyFish extends CGFobject {

    tailFrequency = 1;
    tailSpeedFrequency = 0;
    finFrequency = 1.5;

    constructor(scene) {
        super(scene);
        this.init();
    }

    init() {
        this.t = 0;

        this.sphere = new MySphere(this.scene, 10, 10);
        this.tail = new MyTriangle(this.scene);
        this.mohawk = new MyTriangle(this.scene);
        this.finLeft = new MyTriangleSmall(this.scene);
        this.finRight = new MyTriangleSmall(this.scene);
        this.leftEye = new MySphere(this.scene, 5, 5);
        this.rightEye = new MySphere(this.scene, 5, 5);

        this.bodyShader = new CGFshader(this.scene.gl, "shaders/fishBody.vert", "shaders/fishBody.frag");

        this.initMaterials();
    }

    initMaterials() {
        this.redMaterial = new CGFappearance(this.scene);
        this.redMaterial.setAmbient(0.8, 0.1, 0.1, 1.0);
        this.redMaterial.setDiffuse(0.8, 0.1, 0.1, 1.0);
        this.redMaterial.setSpecular(0.9, 0.1, 0.1, 1.0);
        this.redMaterial.setShininess(20.0);

        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeMaterial.setAmbient(1.0, 1.0, 1.0, 1);
        this.eyeMaterial.setDiffuse(1.0, 1.0, 1.0, 1);
        this.eyeMaterial.setSpecular(1.0, 1.0, 1.0, 1);
        this.eyeMaterial.setShininess(120);
        this.eyeMaterial.loadTexture('./images/fish/eye.png');  // change image

        this.bodyMaterial = new CGFappearance(this.scene);
        this.bodyMaterial.setAmbient(1.0, 1.0, 1.0, 1);
        this.bodyMaterial.setDiffuse(1.0, 1.0, 1.0, 1);
        this.bodyMaterial.setSpecular(1.0, 1.0, 1.0, 1);
        this.bodyMaterial.setShininess(120);
        this.bodyMaterial.loadTexture('./images/fish/body.jpg');
    }

    update(t, speed, turnLeft, turnRight) {
        this.t = t / 150;
        this.tailSpeedFrequency = speed;
        this.turnLeft = turnLeft;
        this.turnRight = turnRight;
    }

    enableNormalViz() {
        this.sphere.enableNormalViz();
        this.tail.enableNormalViz();
        this.mohawk.enableNormalViz();
        this.finLeft.enableNormalViz();
        this.finRight.enableNormalViz();
        this.leftEye.enableNormalViz();
        this.rightEye.enableNormalViz();
    }

    disableNormalViz() {
        this.sphere.disableNormalViz();
        this.tail.disableNormalViz();
        this.mohawk.disableNormalViz();
        this.finLeft.disableNormalViz();
        this.finRight.disableNormalViz();
        this.leftEye.disableNormalViz();
        this.rightEye.disableNormalViz();
    }

    display() {
        this.scene.pushMatrix();

        // Sphere
        this.scene.scale(0.8, 0.8, 1.2);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.bodyMaterial.apply();
        this.scene.setActiveShader(this.bodyShader);
        this.sphere.display();
        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Tail
        this.scene.translate(0, 0, -2);

        const tailAngle = toRads(20) * Math.sin(this.t * (this.tailFrequency + 10 * this.tailSpeedFrequency));
        this.scene.translate(0, 0, 1);
        this.scene.rotate(tailAngle, 0, 1, 0);
        this.scene.translate(0, 0, -1);

        this.scene.rotate(-Math.PI / 4, 1, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.6, 0.6, .6);
        this.redMaterial.apply();
        this.tail.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Left Fin
        const finAngle = toRads(20) * Math.sin(this.t * this.finFrequency);

        this.scene.translate(0.9, -0.4, -0.1);
        this.scene.rotate(Math.PI / 6, 0, 0, 1);

        if (!this.turnLeft) {
            this.scene.translate(0, 0.3, 0);
            this.scene.rotate(finAngle, 0, 0, 1);
            this.scene.translate(0, -0.3, 0);
        }

        this.scene.rotate(3 * Math.PI / 4, 1, 0, 0)
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.5, 0.5, .5);
        this.finLeft.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Right Fin
        this.scene.translate(-0.9, -0.4, -0.1);
        this.scene.rotate(-Math.PI / 6, 0, 0, 1);

        if (!this.turnRight) {
            this.scene.translate(0, 0.3, 0);
            this.scene.rotate(-finAngle, 0, 0, 1);
            this.scene.translate(0, -0.3, 0);
        }

        this.scene.rotate(3 * Math.PI / 4, 1, 0, 0)
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.5, 0.5, .5);
        this.finRight.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Mohawk
        this.scene.translate(0, 1.05, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.3, 0.3, 0.3);
        this.mohawk.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Left Eye
        this.scene.translate(0.6, 0.1, .7);
        this.scene.rotate(toRads(120), 0, 1, 0);
        this.scene.scale(0.15, 0.15, 0.15);
        this.eyeMaterial.apply();
        this.leftEye.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Right Eye
        this.scene.translate(-0.6, 0.1, .7);
        this.scene.scale(0.15, 0.15, 0.15);
        this.rightEye.display();

        this.scene.defaultAppearance.apply();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.popMatrix();
    }
}
