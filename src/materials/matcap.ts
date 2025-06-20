import { ShaderMaterial } from 'three'

import fragmentShader from '~/shaders/matcap/fragment.glsl?raw'
import vertexShader from '~/shaders/matcap/vertex.glsl?raw'

import type { Texture } from 'three'

export function createMapcatMaterial (texture: Texture) {
  return new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      u_Texture: { value: texture },
    },
  })
}
