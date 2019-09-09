import * as THREE from 'three';
const MAX_DISTANCE = 100;
const TEST_SPEED = 0.01;

export class Bullet {
    constructor(x, y, trajectory, speed) {
        this.x = x * TEST_SPEED;
        this.y = y * TEST_SPEED;
        this.z = 0;
        
        this.trajectory = trajectory;
        this.speed = speed || (Math.random() * 0.08);

        const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);

        const material = new THREE.MeshPhongMaterial({color: 0xe60b83});  
        this.model = new THREE.Mesh(geometry, material);
    }

    next() {
        this.model.position.x += this.x;
        this.model.position.y += this.y;
        this.model.position.z += this.speed;
    }

    invalid() {
        return this.x > MAX_DISTANCE || this.y > MAX_DISTANCE || this.z > MAX_DISTANCE
    }
}