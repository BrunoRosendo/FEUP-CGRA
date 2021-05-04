import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyFish } from "./MyFish.js";
import { MySeaFloor } from "./MySeaFloor.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from './MyRockSet.js';
import { MyPier } from "./MyPier.js";
import { MyWaterSurface } from "./MyWaterSurface.js";
import { MyMovingObject } from "./MyMovingObject.js";


/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {

    turnSpeed = 0.1;
    moveSpeed = 0.005;

    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        // Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);

        this.enableTextures(true);

        // MyCubeMap textures
        this.skyTextures = [
            new CGFtexture(this, './images/demo_cubemap/top.png'),
            new CGFtexture(this, './images/demo_cubemap/front.png'),
            new CGFtexture(this, './images/demo_cubemap/right.png'),
            new CGFtexture(this, './images/demo_cubemap/back.png'),
            new CGFtexture(this, './images/demo_cubemap/left.png'),
            new CGFtexture(this, './images/demo_cubemap/bottom.png')
        ];

        // https://www.nicepng.com/ourpic/u2q8o0t4i1w7q8y3_desert-skybox-texture-png/
        this.mountainTextures = [
            new CGFtexture(this, './images/mountain_cubemap/top.png'),
            new CGFtexture(this, './images/mountain_cubemap/front.png'),
            new CGFtexture(this, './images/mountain_cubemap/right.png'),
            new CGFtexture(this, './images/mountain_cubemap/back.png'),
            new CGFtexture(this, './images/mountain_cubemap/left.png'),
            new CGFtexture(this, './images/mountain_cubemap/bottom.png')
        ];

        this.coordTextures = [
            new CGFtexture(this, './images/test_cubemap/py.png'),
            new CGFtexture(this, './images/test_cubemap/nz.png'),
            new CGFtexture(this, './images/test_cubemap/px.png'),
            new CGFtexture(this, './images/test_cubemap/pz.png'),
            new CGFtexture(this, './images/test_cubemap/nx.png'),
            new CGFtexture(this, './images/test_cubemap/ny.png')
        ];

        this.waterTextures = [
            new CGFtexture(this, './images/underwater_cubemap/top.jpg'),
            new CGFtexture(this, './images/underwater_cubemap/front.jpg'),
            new CGFtexture(this, './images/underwater_cubemap/right.jpg'),
            new CGFtexture(this, './images/underwater_cubemap/back.jpg'),
            new CGFtexture(this, './images/underwater_cubemap/left.jpg'),
            new CGFtexture(this, './images/underwater_cubemap/bottom.jpg')
        ];

        this.cubeMaptextures = [this.coordTextures, this.skyTextures, this.mountainTextures, this.waterTextures];
        this.selectedTexture = 3;
        this.textureIds = { 'Coords': 0, 'Sky': 1, 'Mountain': 2, 'Water': 3};

        this.scaleFactor = 0.5;
        this.speedFactor = 1.0;

        // Initialize scene objects
        this.axis = new CGFaxis(this);
        this.mycubemap = new MyCubeMap(this, this.cubeMaptextures[this.selectedTexture]);
        this.fish = new MyMovingObject(this, new MyFish(this));
        this.floor = new MySeaFloor(this, 20, 50, 1.0, 0.7, 3, 0, -13);
        this.rock = new MyRock(this, 16, 8, 3);
        this.rockSet = new MyRockSet(this, 10, 1, 0.2, 0.01);
        this.pier = new MyPier(this, 15, 20, 10, 0, -3, 0);
        this.waterSurf = new MyWaterSurface(this, 50);

        this.defaultAppearance = new CGFappearance(this);
        this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0, 0, 0, 1);
        this.defaultAppearance.setShininess(120);

        this.rockMaterial = new CGFappearance(this);
        this.rockMaterial.setAmbient(0.05, 0.05, 0.05, 1.0);
        this.rockMaterial.setDiffuse(0.4, 0.4, 0.4, 1.0);
        this.rockMaterial.setSpecular(0.7, 0.7, 0.7, 1.0);
        this.rockMaterial.setShininess(20);


        // Objects connected to MyInterface
        this.displayAxis = false;
        this.displayMyCubeMap = true;
        this.displayFloor = true;
        this.displayFish = true;
        this.displayRock = true;
        this.displayRockSet = true;
        this.displayPier = true;
        this.displayWaterSurface = true;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setAmbient(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(1.8, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0, 0, 0, 1);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        t = t * this.speedFactor;
        this.checkKeys();
        this.fish.update(t);
        this.waterSurf.update(t);
    }

    updateMyCubeMapTexture() {
        this.mycubemap.updateAppliedTexture(this.cubeMaptextures[this.selectedTexture]);
    }

    checkKeys() {
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            this.fish.accelerate(this.moveSpeed);
        }

        if (this.gui.isKeyPressed("KeyS")) {
            this.fish.accelerate(-this.moveSpeed);
        }

        if (this.gui.isKeyPressed("KeyA")) {
            this.fish.turn(this.turnSpeed);
        }

        if (this.gui.isKeyPressed("KeyD")) {
            this.fish.turn(-this.turnSpeed);
        }

        if (this.gui.isKeyPressed("KeyR")) {
            this.fish.reset();
        }

        if (this.gui.isKeyPressed("KeyP")) {
            this.fish.ascend();
        }

        if (this.gui.isKeyPressed("KeyL")) {
            this.fish.descend();
        }

    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        this.pushMatrix();


        this.defaultAppearance.apply();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        if (this.displayMyCubeMap) {
            this.translate(this.camera.position[0], this.camera.position[1], this.camera.position[2]);
            this.scale(500, 500, 500);
            this.mycubemap.display();
        }

        this.loadIdentity();
        this.applyViewMatrix();

        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.pushMatrix();

        // ---- BEGIN Primitive drawing section
        if (this.displayFloor) {
            this.floor.display();
            this.popMatrix();
            this.pushMatrix();
        }

        if (this.displayFish) {
            this.translate(0, 3, 0);
            this.fish.display();
            this.translate(0, -3, 0);
            this.popMatrix();
            this.pushMatrix();
        }

        if (this.displayRock) {
            this.translate(5, 0.5, 3);
            this.scale(0.7, 0.7, 0.7);

            this.rockMaterial.apply();
            this.rock.display();
            this.defaultAppearance.apply();
            this.popMatrix();
            this.pushMatrix();
        }

        if (this.displayRockSet) {
            this.translate(-2, 0, -2);
            this.rockSet.display();
            this.popMatrix();
            this.pushMatrix();
        }
        
        if (this.displayPier) {
            this.pier.display();
            this.popMatrix();
            this.pushMatrix();
        }

        if(this.displayWaterSurface){
            this.translate(0, 10, 0);
            this.waterSurf.display();
            this.popMatrix();
            this.pushMatrix();
        }

        this.setActiveShader(this.defaultShader);

        // ---- END Primitive drawing section
    }
}