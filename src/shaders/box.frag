#version 410
precision mediump float;

out vec4 OutColor;

in vec2 oTexCoord;

uniform sampler2D Tex;
uniform vec4 Color;
uniform vec2 BoxSize;
uniform float TopRound;
uniform float BotRound;
uniform float DarkenT;

float roundedBoxSDF(vec2 Position, vec2 HalfSize) {
	float Round = TopRound;
	if (oTexCoord.y < 0.5)
		Round = BotRound;

	Position = abs(Position) - HalfSize + Round;
    return length(max(Position,0.0))+min(max(Position.x, Position.y), 0.0)-Round;
}

void main() {
	vec2 Position = oTexCoord * BoxSize;
	Position -= BoxSize * 0.5;

	float t = (oTexCoord.x+(1-oTexCoord.y)) / 2;
    vec4 base = vec4(Color.rgb * mix(1.0, 0.7, t * DarkenT), Color.a);
    vec4 col = base * texture(Tex, oTexCoord);

	float dst = roundedBoxSDF(Position, BoxSize * 0.5);

	float aa = fwidth(dst);
    float Alpha = 1.0 - smoothstep(-aa, aa, dst);

    OutColor = vec4(col.rgb, col.a * Alpha);
}
