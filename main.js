
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

var Key = {
  _pressed: {},

  A: 65,
  W: 87,
  D: 68,
  S: 83,
  SPACE: 32,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};


var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 3200;


    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(200, 200, 200);
    material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);


    document.body.appendChild(renderer.domElement);

}

function animate() {

    requestAnimationFrame(animate);
    var speedX = 0, speedY = 0;
    var speed = 10;
    if (Key.isDown(Key.A)) {
        speedX = -1 * speed;
    }
    if (Key.isDown(Key.D)) {
        speedX = speed;
    } 
    if (Key.isDown(Key.S)) {
        speedY = -1 * speed;
    } 
    if (Key.isDown(Key.W)) {
        speedY = speed;
    }
  
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    mesh.position.y += speedY;
    mesh.position.x += speedX;

    renderer.render(scene, camera);

}