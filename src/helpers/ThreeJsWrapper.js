import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color, TextureLoader,
  NearestFilter,
  RepeatWrapping,
  PlaneBufferGeometry,
  MeshPhongMaterial,
  DoubleSide,
  Mesh,
  HemisphereLight,
  DirectionalLight
} from "three";

import { OBJLoader2 } from "three/examples/jsm/loaders/OBJLoader2";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class ThreeJsWrapper {
  /**
   * Initialize the WebGlRenderer and the base scene
   * @public
   * @param {HTMLDivElement} domElement The element where the canvas will be created
   */
  initializeScene = (domElement) => {
    const {width, height} = domElement.getBoundingClientRect();

    const renderer = new WebGLRenderer();
    renderer.setSize(width, height);
    domElement.appendChild(renderer.domElement);

    const camera = this.initCamera({
      fov: 50,
      aspect: width / height,
      near: 0.1,
      far: 100,
      position: { x: 0, y: 10, z: 20 }
    });

    this.initControls(camera, renderer);

    const scene = new Scene();
    scene.background = new Color('black');

    const plane = this.initPlane();
    scene.add(plane);

    const lights = this.addLights()

    lights.forEach((light) => scene.add(light));

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
  }

  /**
   * Initialize the camera
   * @param options
   * @param {number} options.fov
   * @param {number} options.aspect
   * @param {number} options.near
   * @param {number} options.far
   * @param {number} options.position.x
   * @param {number} options.position.y
   * @param {number} options.position.z
   * @return {PerspectiveCamera}
   */
  initCamera = (options = { fov: 50, aspect: 1, near: 0.1, far: 100, position: { x: 0, y: 0, z: 0 } }) => {
    const camera = new PerspectiveCamera(
      options.fov,
      options.aspect,
      options.near,
      options.far
    );

    camera.position.set(
      options.position.x,
      options.position.y,
      options.position.z
    );

    return camera;
  }

  /**
   * Initialize the mouse control of the canvas
   * @private
   * @param {PerspectiveCamera} camera
   * @param {WebGLRenderer} renderer
   */
  initControls = (camera, renderer) => {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 5, 0);
    controls.update();
    controls.addEventListener("change", this.render)
  }

  /**
   * Load a .obj in the scene
   * @private
   * @param {String} objectUrl The current object url
   * @return {Promise<any>}
   */
  async loadObject(objectUrl) {
    const loader = new OBJLoader2();
    return loader.loadAsync(objectUrl)
  }

  /**
   * Resize the renderer
   * @private
   * @param {WebGLRenderer} renderer
   * @return {boolean}
   */
  resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  /**
   * Initialize the "ground" in the scene
   * @private
   * @return {Mesh<PlaneBufferGeometry, MeshPhongMaterial>}
   */
  initPlane() {
    const planeSize = 40;

    const loader = new TextureLoader();
    const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.magFilter = NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new PlaneBufferGeometry(planeSize, planeSize);
    const planeMat = new MeshPhongMaterial({
      map: texture,
      side: DoubleSide,
    });
    const mesh = new Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    return mesh;
  }

  /**
   * Add the lights on the current scene
   * @private
   * @return {(HemisphereLight|DirectionalLight)[]}
   */
  addLights() {
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 1;
    const light = new HemisphereLight(skyColor, groundColor, intensity);

    const color = 0xFFFFFF;
    // const intensity = 1;
    const light2 = new DirectionalLight(color, intensity);
    light2.position.set(0, 10, 0);
    light2.target.position.set(-5, 0, 0);

    return [light, light2]
  }

  /**
   * Update the canvas to jump to the next frame
   * @private
   */
  render = () => {
    if (this.resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }

    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Load the object and add it to the current scene
   * @public
   * @param objectUrl
   * @param materialUrl
   */
  load = (objectUrl, materialUrl) => {
    this.loaded = false;
    this.loadObject(objectUrl).then((obj) => {
      this.scene.add(obj);
      this.currentLoadedAssetUUID = obj.uuid;
      this.loaded = true;
      requestAnimationFrame(this.render);
    });
  }

  /**
   * Dispose of the currently loaded mesh
   * @public
   */
  unload() {
    const object = this.scene?.getObjectByProperty("uuid", this.currentLoadedAssetUUID);
    if (object) {
      object.children[0].geometry.dispose();
      object.children[0].material.dispose();
      this.scene = this.scene.remove(object);
    }
  }

  /**
   * Dispose of the scene and the renderer
   * @public
   */
  unloadAll() {
    if (this.scene && this.renderer) {
      this.scene.dispose()
      this.renderer.dispose()

      this.scene = null;
      this.renderer = null;
    }
  }
}
