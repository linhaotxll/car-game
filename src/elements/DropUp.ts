import gsap from 'gsap'
import { Group } from 'three'

import type { Mesh } from 'three'

export class DropUp {
  static INITIAL_POSITION_Z = -4

  static TARGET_POSITION_Z = 4

  main = new Group()

  transform = { z: DropUp.INITIAL_POSITION_Z }

  private builded = false

  add (model: Mesh) {
    this.main.add(model)
  }

  build () {
    gsap.timeline({ repeat: -1, repeatDelay: 0 })
      .to(this.transform, { z: DropUp.TARGET_POSITION_Z, duration: 1.5 })
      .to(this.transform, { z: DropUp.INITIAL_POSITION_Z, duration: 1 })

    this.builded = true
  }

  render () {
    if (this.builded) {
      this.main.position.z = this.transform.z
    }
  }
}
