#version 410
precision mediump float;

layout (location = 0) in vec2 iPosition;

void main() {
  gl_Position = vec4(iPosition.xy, 0.0, 1.0);
}


