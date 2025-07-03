import { Color, ShaderMaterial } from 'three'

import fragmentShader from '~/shaders/ground-shadow/fragment.glsl?raw'
import vertexShader from '~/shaders/ground-shadow/vertex.glsl?raw'

import type { Texture } from 'three'

const COLOR_NAME_MAP: Record<string, string> = {
  brown: '#692c02',
  beige: '#9b5d2b',
  yellow: '#6c530b',
  green: '#424715',
  blue: '#2e4c5b',
}

export function createGroundShadow (texture: Texture, colorName: string) {
  const color = COLOR_NAME_MAP[colorName]

  return new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTexture: { value: texture },
      u_color: { value: new Color(color) },
    },
  })
}
