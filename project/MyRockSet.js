import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyRock } from './MyRock.js'

export class MyRockSet extends CGFobject {

    constructor(scene, numRocks, radius, maxScale, minScale) {
        super(scene);
        this.radius = radius || 1;
        this.maxScale = maxScale || 0.2;
        this.minScale = minScale || 0.01;
        this.init(numRocks);
    }

    init(numRocks) {
        this.rockMaterial = new CGFappearance(this.scene);
        this.rockMaterial.setAmbient(0.05, 0.05, 0.05, 1.0);
        this.rockMaterial.setDiffuse(0.4, 0.4, 0.4, 1.0);
        this.rockMaterial.setSpecular(0.7, 0.7, 0.7, 1.0);
        this.rockMaterial.setShininess(20);

        // Right now, rocks are floating and possibly overlapping [FIX]
        this.rocks = [];
        for (let i = 0; i < numRocks; ++i) {
            const x = Math.random() * 2 * this.radius - this.radius;
            const maxZ = Math.sqrt(this.radius ** 2 - x**2);

            this.rocks.push({
                visible: true,
                orientation: Math.floor(Math.random() * Math.PI),
                posX: x,
                posY: 0,
                posZ: Math.random() * 2 * maxZ - maxZ,
                scaleX: Math.random() * (this.maxScale - this.minScale) + this.minScale,
                scaleY: Math.random() * (this.maxScale - this.minScale) + this.minScale,
                scaleZ: Math.random() * (this.maxScale - this.minScale) + this.minScale,
                object: new MyRock(this.scene, 16, 8)
            });
        }
    }

    display() {
        this.scene.pushMatrix();
        this.rockMaterial.apply();

        this.rocks.forEach(rock => {
            if (!rock.visible) return;
            this.scene.translate(rock.posX, rock.posY, rock.posZ);
            this.scene.scale(rock.scaleX, rock.scaleY, rock.scaleZ);
            this.scene.rotate(rock.orientation, 0, 1, 0);
            rock.object.display();

            this.scene.popMatrix();
            this.scene.pushMatrix();
        });

        this.scene.defaultAppearance.apply();
    }
}
