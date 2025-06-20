uniform sampler2D u_Texture;
varying vec2 v_Point;

void main(){
  vec4 color = texture(u_Texture, v_Point);
  gl_FragColor = color;
}
