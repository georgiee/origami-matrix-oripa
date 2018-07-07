import { OrmatFile } from './ormat-file';
import { Object3D, Geometry, Vector3, Face3, ShaderMaterial, DoubleSide } from 'three';
import { Scene, SphereGeometry, Mesh, MeshNormalMaterial } from 'three';

import fragmentShader from './shaders/simple-material.fs';
import vertexShader from './shaders/simple-material.vs';

export class OrmatObject extends Object3D {
  constructor(public file: OrmatFile) {
    super();
    this.test();
    this.build();
  }

  test() {
    const geometry = new SphereGeometry( 50, 32, 32 );
    const material = new MeshNormalMaterial( );
    const sphere = new Mesh( geometry, material );

    this.add( sphere );
  }

  build() {
    console.log('build ormat object: ', this.file);

    const geometry = new Geometry();
    const { file } = this;

    const vertices = file.vertices.map(vertex =>
      new Vector3(
        vertex[2]/*folded x*/,
        vertex[3]/*folded y*/
      )
    );

    const faces = file.faces.map((facedata:any) => (
      new Face3(facedata[0], facedata[1], facedata[2])
    ));

    geometry.vertices = vertices;
    geometry.faces = faces;
    geometry.computeFaceNormals();

    // const material = new MeshNormalMaterial( );
    const material = new ShaderMaterial( {
      vertexShader: (vertexShader as any),
      fragmentShader: (fragmentShader as any),
      side: DoubleSide
    } );
    const ormatObject = new Mesh( geometry, material );

    this.add(ormatObject);
  }

}