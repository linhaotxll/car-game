varying vec2 v_Point;


void main(){
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  vec3 n = mat3(modelViewMatrix) * normal;
  n = normalize(n);

  v_Point.x = n.x * 0.5 + 0.5;
  v_Point.y = n.y * 0.5 + 0.5;
}
