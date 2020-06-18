import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color, TextureLoader, NearestFilter,
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
  initializeScene = (domElement) => {

    const {width, height} = domElement.getBoundingClientRect();

    const renderer = new WebGLRenderer();
    renderer.setSize(width, height);
    domElement.appendChild(renderer.domElement);

    const fov = 50;
    const aspect = width / height;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 5, 20);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 5, 0);
    controls.update();

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

  async loadObject(objectUrl) {
    const loader = new OBJLoader2();
    return loader.loadAsync(objectUrl)
  }

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

  render = () => {
    if (this.resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }

    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.render);
  }

  load = (objectUrl, materialUrl) => {
    this.loaded = false;
    this.loadObject(objectUrl).then((obj) => {
      this.scene.add(obj);
      this.currentLoadedAssetUUID = obj.uuid;
      this.loaded = true;
      requestAnimationFrame(this.render);
    });
  }

  unload() {
    const object = this.scene?.getObjectByProperty("uuid", this.currentLoadedAssetUUID);
    if (object) {
      object.children[0].geometry.dispose();
      object.children[0].material.dispose();
      this.scene = this.scene.remove(object);
    }
  }

  unloadAll() {
  }
}
