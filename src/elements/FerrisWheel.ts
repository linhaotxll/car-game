import { Group } from 'three'
import { degToRad } from 'three/src/math/MathUtils.js'

import type { Mesh } from 'three'

export class FerrisWheel {
  static ROTATE_SPEED = 0.01

  static RADIUS = 5

  private builded = false

  private ferrisWheelChair: Mesh[] = []

  private ferrieWheelChairs: Group[] = []

  private rotate = 0

  private bodyGroup = new Group()

  main = new Group()

  add (model: Mesh) {
    if (model.userData.name === 'ferris-chair') {
      this.ferrisWheelChair.push(model)
    } else {
      this.bodyGroup.add(model)
    }
  }

  build () {
    const defaultFerrisWheelPosition = this.bodyGroup.children[0].position.clone()
    this.bodyGroup.children.forEach((child) => {
      child.position.set(0, 0, 0)
    })
    this.main.position.copy(defaultFerrisWheelPosition)
    this.bodyGroup.position.set(0, 0, 0)

    this.main.add(this.bodyGroup)

    // 摩天轮吊箱组合
    const defaultChairPosition = this.ferrisWheelChair[0].position.clone()
    const chairGroup = new Group()
    this.ferrisWheelChair.forEach((child) => {
      child.position.set(0, 0, 0)
      chairGroup.add(child)
    })
    this.ferrieWheelChairs.push(chairGroup)
    chairGroup.position.copy(defaultChairPosition.sub(defaultFerrisWheelPosition))
    this.main.add(chairGroup)

    // 创建多个吊箱
    const num = 12
    for (let i = 1; i < num; ++i) {
      const newChairGroup = chairGroup.clone()
      this.main.add(newChairGroup)
      this.ferrieWheelChairs.push(newChairGroup)
    }

    this.builded = true
  }

  private renderChairPosition () {
    const length = this.ferrieWheelChairs.length
    const anglePer = 360 / length
    for (let i = 0; i < length; ++i) {
      const angle = anglePer * i
      const rad = degToRad(angle) - this.rotate
      const x = FerrisWheel.RADIUS * Math.cos(rad)
      const z = FerrisWheel.RADIUS * Math.sin(rad)
      this.ferrieWheelChairs[i].position.x = x
      this.ferrieWheelChairs[i].position.z = z
    }
  }

  render () {
    if (this.builded) {
      this.rotate += FerrisWheel.ROTATE_SPEED
      this.bodyGroup.rotation.y = this.rotate
      this.renderChairPosition()
    }
  }
}
