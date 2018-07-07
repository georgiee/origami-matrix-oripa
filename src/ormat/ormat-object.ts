import { OrmatFile } from './ormat-file';
import { Object3D, Geometry, Vector3, Face3, ShaderMaterial, DoubleSide, PlaneBufferGeometry, Color, MeshBasicMaterial, FaceColors, BufferGeometry, BufferAttribute, Float32BufferAttribute } from 'three';
import { Scene, SphereGeometry, Mesh, MeshNormalMaterial } from 'three';

import fragmentShader from './shaders/simple-material.fs';
import vertexShader from './shaders/simple-material.vs';
import value from '*.json';

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
    const faceColors = [
      0xff0000,
      0x00ff00,
      0x0000ff
    ]

    const faces = file.faces.map((facedata:any, index:number) => {
      const face = new Face3(facedata[0], facedata[1], facedata[2]);
      face.color =  new Color(faceColors[index % faceColors.length]);
      return face;
    });


    geometry.vertices = vertices;
    geometry.faces = faces;
    geometry.computeFaceNormals();

    const geometryBuffered = new BufferGeometry();
    geometryBuffered.fromGeometry(geometry)

    let ff = new Float32Array(faces.length*3);
    //per 3 vertices we have the same face index
    ff = ff.map((value, index) => {
      console.log(index - index%3)
      return (index - index%3)/3;
    })

    const faceBufferAttribute = new BufferAttribute( ff, 1 )
    geometryBuffered.addAttribute( 'faceindex', faceBufferAttribute );


    faceBufferAttribute.onUpload( event => {
      console.log('uploaded');
    });

    const material = new MeshBasicMaterial({
      vertexColors: FaceColors
    } );
    const material2 = new ShaderMaterial( {
      defines: {
        FOO: 15,
        BAR: true
      },
      uniforms: {
        time: { value: 1.0 },
      },
      vertexShader: (vertexShader as any),
      fragmentShader: (fragmentShader as any),
      // side: DoubleSide,
      transparent: true
    } );
    const ormatObject = new Mesh( geometryBuffered, material2 );

    this.add(ormatObject);

    // const plane = new PlaneBufferGeometry( window.innerWidth, window.innerHeight );
    // const bufferObject = new Mesh( plane, material );
    // this.add(bufferObject);

  }

}