import * as THREE           from 'three';
import { GUI              } from '../node_modules/three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls    } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { DragStateManager } from './utils/DragStateManager.js';
import { setupGUI, downloadExampleScenesFolder, loadSceneFromURL, getPosition, getQuaternion, toMujocoPos, standardNormal } from './mujocoUtils.js';
import load_mujoco from './node_modules/mujoco-wasm/dist/mujoco_wasm.js';

const mujoco = await load_mujoco();

console.log('index.mjs');

export class MuJoCoViewer {
    constructor() {
        this.mujoco = mujoco;

        // Load in the state from XML
        this.model = new mujoco.Model(sceneXML);
        this.state = new mujoco.State(this.model);
        this.simulaion = new mujoco.Simulation(this.model, this.state);

        this.model.scene = new THREE.Scene();
        this.scene.name = 'scene';

        this.updateGUICallbacks = [];

        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.001, 1000 );
        this.camera.name = 'PerspectiveCamera';
        this.camera.position.set(0, 0, 3);
        this.scene.add(this.camera);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.shadowMap.enabled = true;
        this.renderer.setAnimationLoop( this.render.bind(this) );

        this.container.appendChild( this.renderer.domElement );

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 0.7, 0);
        this.controls.panSpeed = 2;
        this.controls.zoomSpeed = 1;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.10;
        this.controls.screenSpacePanning = true;
        this.controls.update();

        window.addEventListener('resize', this.onWindowResize.bind(this));

        this.dragStateManager = new DragStateManager(this.scene, this.renderer, this.camera, this.container.parentElement, this.controls);
    }

    
}