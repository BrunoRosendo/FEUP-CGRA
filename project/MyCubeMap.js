import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";
import { toRads } from "./utils.js"


/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap extends CGFobject {
    constructor(scene, textures) {
        if (textures.length > 6) {
            textures = textures.slice(0, 6);
        }
        super(scene);
        this.init(...textures);
    }

    init(top, front, right, back, left, bot) {
        this.quad = new MyQuad(this.scene);

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0, 0, 0, 0);
        this.material.setDiffuse(0, 0, 0, 0);
        this.material.setSpecular(0, 0, 0, 0);
        this.material.setEmission(1, 1, 1, 1);
        this.initTextures(top, front, right, back, left, bot);
    }

    initTextures(top, front, right, back, left, bot) {
        this.botTexture = bot;
        this.backTexture = back;
        this.leftTexture = left;
        this.frontTexture = front;
        this.rightTexture = right;
        this.topTexture = top;
    }

    updateAppliedTexture(textures) {
        this.initTextures(...textures);
    }

    display() {
        this.scene.pushMatrix();
        this.material.apply();

        // Back face
        this.scene.translate(0, 0, -0.5);
        if (this.backTexture) { // apply texture and display quad if defined
            this.backTexture.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.quad.display();
        }

        // Left face
        this.scene.translate(-0.5, 0, 0.5);
        this.scene.rotate(toRads(90), 0, 1, 0);
        if (this.leftTexture) {
            this.leftTexture.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.quad.display();
        }

        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Right face
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(toRads(-90), 0, 1, 0);
        if (this.rightTexture) {
            this.rightTexture.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.quad.display();
        }

        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Front face
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(toRads(180), 0, 1, 0);
        if (this.frontTexture) {
            this.frontTexture.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.quad.display();
        }

        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Bot face
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(toRads(-90), 1, 0, 0);
        if (this.botTexture) {
            this.botTexture.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.quad.display();
        }

        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Top face
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(toRads(90), 1, 0, 0);
        if (this.topTexture) {
            this.topTexture.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.quad.display();
        }
    }
}
