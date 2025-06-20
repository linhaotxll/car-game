import { PerspectiveCamera, Vector3 } from 'three'

const DEFAULT_POSITION = {
  // TODO:
  default: new Vector3(1, -1, 1).normalize(),
}

export class Camera {
  main!: PerspectiveCamera

  constructor (width: number, height: number) {
    const camera = this.main = new PerspectiveCamera(
      40,
      width / height,
      0.1,
      1000,
    )

    // Z 轴朝上
    camera.up.set(0, 0, 1)
    camera.lookAt(0, 0, 0)
    // camera.position.copy(DEFAULT_POSITION.default.multiplyScalar(100))
    camera.position.set(50, -50, 50)
  }
}
