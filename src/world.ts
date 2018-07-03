import { OrbitControls } from './orbit-controls';
import { fromEvent, Observable, BehaviorSubject } from 'rxjs';
import { auditTime, map } from 'rxjs/operators';
import { PerspectiveCamera } from 'three';
import { Camera } from 'three';
import { WebGLRenderer } from 'three';
import { Scene } from 'three';
import { AxesHelper } from 'three';

type Size =  {
  width: number;
  height: number;
}

export class World {
  private worldSize: Size = { width: 100, height: 100};
  private _el: HTMLElement;
  private _camera: Camera;
  private _renderer: WebGLRenderer;
  private _scene: Scene;
  private _controls: OrbitControls;
  public resize$: Observable<Size>;

  constructor() {
    this.init();
  }

  init() {
    this.attachElement();
    this.createRenderer();
    this.createScene();
    this.createCamera();
    this.createControls();

    this.resize$ = this.createResizeStream();
  }

  public start() {
    this.update();

    this.resize$
    .subscribe((size: Size) => {
      this.resize(size);
    });
  }

  private createRenderer() {
    const renderer = new WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( this.worldSize.width, this.worldSize.height );

    this._el.appendChild( renderer.domElement );
    this._renderer = renderer;
  }

  private createCamera() {
    const camera = new PerspectiveCamera( 30, this.aspect, 1, 15000 );
    camera.position.set( 0, 0, 1600 );

    this._camera = camera;
  }

  private createScene() {
    this._scene = new Scene();
    this._scene.add( new AxesHelper( 250 ) );
  }

  private createControls() {
    this._controls = new OrbitControls(this._camera, this._renderer.domElement);
  }

  private attachElement() {
    this._el = document.createElement( 'div' );
    document.body.appendChild( this._el );
  }

  private render() {
    this._renderer.clear();
    this._renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    this._renderer.render( this._scene, this._camera );
  }

  private resize(worldSize: Size) {
    this.worldSize = worldSize;

    this._renderer.setSize( worldSize.width, worldSize.height );
    this._renderer.setViewport(0, 0, worldSize.width, worldSize.height);

    const perspectiveCamera = this._camera as THREE.PerspectiveCamera;
    perspectiveCamera.aspect = this.aspect;
    perspectiveCamera.updateProjectionMatrix();
  }

  private update() {
    const step = () => {
      this.render();
      requestAnimationFrame(step);
    }
    step();
  }

  private createResizeStream(): Observable<Size> {

    const getWindowSize = function(){
      return {width: window.innerWidth, height: window.innerHeight};
    };

    const stream = new BehaviorSubject(getWindowSize());

    fromEvent(window, 'resize')
    .pipe(
      auditTime(500),
      map(() => getWindowSize())
    )
    .subscribe(stream);

    return stream.asObservable();
  }
  get aspect() {
    return this.worldSize.width / this.worldSize.height;
  }

  get scene() {
    return this._scene;
  }
}

