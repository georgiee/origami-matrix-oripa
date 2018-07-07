#include <packing>

uniform sampler2D texture;
varying vec2 vUV;
varying float currentFace;
void main() {
  if ( currentFace == 1.0 ){
    gl_FragColor = vec4(1,0,0,0.5);
  }else{
    gl_FragColor = vec4(0,1,0,0.5);
  }
}