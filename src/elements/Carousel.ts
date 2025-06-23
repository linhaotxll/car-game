import { Group } from 'three'

import { degToRand } from '~/utils/degToRand'

import type { Mesh } from 'three'

export class Carousel {
  static CAROUSEL_NUM = 6

  static SPEED = 0.01

  main = new Group()

  carousels: Mesh[] = []

  rotateZ = 0

  add (model: Mesh) {
    this.main.position.copy(model.position)
    model.position.set(0, 0, 0)
    this.main.add(model)
    this.carousels.push(model)
  }

  build () {
    const anglePer = 360 / Carousel.CAROUSEL_NUM

    for (let i = 1; i < Carousel.CAROUSEL_NUM; ++i) {
      for (let j = 0; j < this.carousels.length; ++j) {
        const model = this.carousels[j]
        const newCarousel = model.clone()
        newCarousel.rotateZ(degToRand(anglePer * i))
        this.main.add(newCarousel)
      }
    }
  }

  render () {
    if (!this.main.children.length) {
      return
    }

    this.rotateZ -= Carousel.SPEED
    this.main.rotation.z = this.rotateZ
  }
}
