import type { Mesh } from 'three'

export class Windmill {
  private windmill: Mesh | undefined

  private rotateX: number = 0

  static SPEED = 0.03

  add (model: Mesh) {
    this.windmill = model
  }

  render () {
    if (this.windmill) {
      this.rotateX += Windmill.SPEED
      this.windmill.rotation.x = this.rotateX
    }
  }
}
