import gsap from 'gsap'
import { Group } from 'three'

import type { Mesh } from 'three'

export class Ship {
  main = new Group()

  private chairs: Mesh[] = []

  private builded = false

  private rotate = 0

  add (model: Mesh) {
    if (model.userData.name === 'ship-chair') {
      this.chairs.push(model)
    } else {
      this.main.add(model)
    }
  }

  build () {
    const defaultShipPosition = this.main.children[0].position.clone()
    const defaultShipChairPosition = this.chairs[0].position.clone()

    this.main.children.forEach((child) => {
      child.position.set(0, 0, 0)
    })
    this.main.position.copy(defaultShipPosition)

    const chairGroup = new Group()
    this.chairs.forEach((child) => {
      child.position.set(0, 0, 0)
      chairGroup.add(child)
    })
    chairGroup.position.copy(defaultShipChairPosition.sub(defaultShipPosition))
    this.main.add(chairGroup)

    const gapX = 0.8
    const gapY = 0.7
    const mat = [3, 5]

    for (let i = 0; i < mat[0]; ++i) {
      for (let j = 0; j < mat[1]; ++j) {
        if (i === 0 && j === 0) {
          continue
        }
        const newChairGroup = chairGroup.clone()
        newChairGroup.translateX(j * gapX).translateY(i * gapY)
        this.main.add(newChairGroup)
      }
    }

    this.builded = true

    gsap.timeline({ repeat: -1 })
      .to(this, { rotate: Math.PI / 4, duration: 1, ease: 'power1.out' })
      .to(this, { rotate: 0, duration: 1, ease: 'power1.in' })
      .to(this, { rotate: -Math.PI / 4, duration: 1, ease: 'power1.out' })
      .to(this, { rotate: 0, duration: 1, ease: 'power1.in' })
  }

  render () {
    if (!this.builded) {
      return
    }

    this.main.rotation.y = this.rotate
  }
}
