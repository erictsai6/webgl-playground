import * as THREE from 'three';

main();

function main() {
    const canvas = document.querySelector('#c');
    canvas.addEventListener('mousemove', updateMousePosition)

    const renderer = new THREE.WebGLRenderer({canvas});
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const scene = new THREE.Scene();

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // greenish blue
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    let mouseEvent;
    function updateMousePosition(e) {
        mouseEvent = e;
    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time) {
        const canvas = renderer.domElement;
        const canvasWidth = canvas.clientWidth;
        const canvasHeight = canvas.clientHeight;
        if (resizeRendererToDisplaySize(renderer)) {
            camera.aspect = canvasWidth / canvasHeight;
            camera.updateProjectionMatrix();
        }

        if (mouseEvent) {
            const x = (mouseEvent.clientX - canvasWidth) / (canvasWidth / 2);
            const y = (mouseEvent.clientY - canvasHeight) / (canvasHeight / 2);
            cube.rotation.x = y;
            cube.rotation.y = x;
        }
       
        renderer.render(scene, camera);
       
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
}
