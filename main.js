import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


const scene = new THREE.Scene();
// creating and positioning the camera
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.x = 50; camera.position.y = 10;

 // adding light to the scene
 const light = new THREE.DirectionalLight({color: 0xFFFFFF, intensity: 100});
 light.position.set(1, 0, 0); 
 scene.add(light);

 // adding light to the scene
 const ambientLight = new THREE.AmbientLight(0xffffff, 1);
 ambientLight.position.set(1, 0, 0); // position the light
 scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Ground Plane
const PlaneGeometry = new THREE.PlaneGeometry( 25, 25, 2);

const PlaneMaterial = new THREE.MeshPhongMaterial( {color: 0x2f4f32, side: THREE.DoubleSide} );

const plane = new THREE.Mesh( PlaneGeometry, PlaneMaterial );
plane.position.set( 0, 0,0);
plane.receiveShadow = true;
plane.rotation.x = Math.PI / 2;
scene.add( plane );


// Creating a loader for the glTF/GLB file
const loader = new GLTFLoader();
const building = new URL('./eastern_avenue_sewage_pumping_station.glb', import.meta.url);

 //LOADING HOUSE MODEL
loader.load(building.href, function (Object) {
               Object.scene.position.set(0, -4, 5);
               Object.scene.scale.set(0.2, 0.2, 0.2);
              scene.add(Object.scene);
            }, undefined, function (error) {
              console.error(error);
            },  

  function (xhr) {
    // Called while loading is in progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function ( err ) {
    // Called if there's an error loading the glTF/GLB file
    console.log( err);
   
  }
);


// creating the controls
const controls = new OrbitControls(camera, renderer.domElement);

const controls2 = new PointerLockControls(camera, renderer.domElement);
let clock = new THREE.Clock();
scene.add(controls2.getObject());

document.addEventListener('click', () => {
  controls2.lock();
});

let keyboard = [];
addEventListener('keydown', (e)=>{
   keyboard[e.key] = true;
});
addEventListener('keyup', (e)=>{
   keyboard[e.key] = false;
});

function processKeyboard(delta){
   let speed = 5;
   let actualSpeed = speed * delta;
   if(keyboard['w']){
      controls2.moveForward(actualSpeed);
   }
   if(keyboard['s']){
      controls2.moveForward(-actualSpeed);
   }
   if(keyboard['d']){
      controls2.moveRight(actualSpeed);
   }
   if(keyboard['a']){
      controls2.moveRight(-actualSpeed);
   }
}


function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    let delta = clock.getDelta();
    processKeyboard(delta);
}
animate();