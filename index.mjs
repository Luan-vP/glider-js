import load_mujoco from "./mujoco_wasm/dist/mujoco_wasm.js";

// Load the MuJoCo Module
const mujoco = await load_mujoco();

// Set up Emscripten's Virtual File System
var initialScene = "drop_test.xml";
mujoco.FS.mkdir('/working');
mujoco.FS.mount(mujoco.MEMFS, { root: '.' }, '/working');
mujoco.FS.writeFile("/working/" + initialScene, await(await fetch("./" + initialScene)).text());

// Load in the state from XML
let model       = new mujoco.Model("/working/drop_test.xml");
let state       = new mujoco.State(model);
let simulation  = new mujoco.Simulation(model, state);