import { OrmatObject } from './ormat/ormat-object';
import { OrmatFile } from './ormat/ormat-file';
import { OrmatLoader } from './ormat/ormat-loader';

import { World } from './world';
import { Scene, SphereGeometry, Mesh, MeshNormalMaterial } from 'three';

const ormatLoader = new OrmatLoader();

window.addEventListener('DOMContentLoaded', () => {
  const world = new World();
  world.start();

  const scene:Scene = world.scene;

  ormatLoader
  .load('http://localhost:3000/assets/triangle/triangle.ormat')
  // .load('http://localhost:3000/assets/twistfold/twistfold.ormat')
  // .load('http://localhost:3000/assets/crane/crane.ormat')
  .then( (file: OrmatFile) => {
    const ormatObject = new OrmatObject(file);
    scene.add(ormatObject);
    console.log('add', ormatObject);
  });

});



