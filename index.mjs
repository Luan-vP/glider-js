import { Model, Simulation, State, downloadFile } from "mujoco-wasm";

// Load the MuJoCo Module
const mujoco = load_mujoco();

// Set up Emscripten's Virtual File System
mujoco.FS.mount(mujoco.MEMFS, { root: '.' }, '/examples');

// Load in the state from XML
let model       = new mujoco.Model("/examples/humanoid.xml");
let state       = new mujoco.State(model);
let simulation  = new mujoco.Simulation(model, state);