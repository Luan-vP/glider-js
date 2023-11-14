import * as THREE           from 'three';
import { GUI              } from '../node_modules/three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls    } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { DragStateManager } from './utils/DragStateManager.js';
import { setupGUI, downloadExampleScenesFolder, loadSceneFromURL, getPosition, getQuaternion, toMujocoPos, standardNormal } from './mujocoUtils.js';
import load_mujoco from './node_modules/mujoco-wasm/dist/mujoco_wasm.js';

const mujoco = await load_mujoco();

console.log('index.mjs');

export class MuJoCoViewer {
    constructor(sceneXML) {
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

    }
}