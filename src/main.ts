import { World } from './world';
import { Scene, SphereGeometry, Mesh, MeshNormalMaterial } from 'three';

window.addEventListener('DOMContentLoaded', () => {
  const world = new World();
  world.start();

  const scene:Scene = world.scene;
  const geometry = new SphereGeometry( 50, 32, 32 );
  const material = new MeshNormalMaterial( );
  const sphere = new Mesh( geometry, material );

  scene.add( sphere );
});