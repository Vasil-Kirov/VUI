#version 410
precision mediump float;

layout (location = 0) in vec3 iPosition;
layout (location = 1) in vec2 iTexCoord;

out vec2 oTexCoord;

void main() {
  gl_Position = vec4(iPosition.xy, 0.0, 1.0);
  oTexCoord = iTexCoord;
}


