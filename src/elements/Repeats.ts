import { Group, Vector3 } from 'three'

import type { Mesh } from 'three'

interface RepeatsModel {
  mole: Group
  'tea-shop-fan': Group
  'car-station-fan': Group
}

export class Repeats {
  private models: RepeatsModel = {
    mole: new Group(),
    'tea-shop-fan': new Group(),
    'car-station-fan': new Group(),
  }

  private modelKeys: string[]

  main = new Group()

  constructor () {
    this.modelKeys = Object.keys(this.models)
  }

  contains (name: string) {
    return this.modelKeys.includes(name)
  }

  add (name: keyof RepeatsModel, model: Mesh) {
    const newModel = model.clone()
    if (this.models[name] instanceof Group) {
      newModel.position.copy(new Vector3(0, 0, 0))
      this.models[name].add(newModel)
    } else {
      // Mesh
    }
  }

  build () {
    this.buildMole()
    this.buildTeaShopFan()
    this.buildCarStationFan()
  }

  private buildMole () {
    // 左下角的老鼠并设置初始位置
    const mole = this.models.mole
    mole.position.set(14.7923, -14.8635, 1.96653)
    // 间距
    const gap = 2
    // 排列，2 行 2 列
    const mat = [2, 2]
    for (let i = 0; i < mat[0]; ++i) {
      for (let j = 0; j < mat[1]; ++j) {
        if (i === 0 && j === 0) {
          continue
        }
        this.main.add(
          mole.clone().translateX(-i * gap).translateY(j * gap),
        )
      }
    }
  }

  private buildTeaShopFan () {
    // 左上角的风扇并设置初始位置
    const teaShopFan = this.models['tea-shop-fan']
    teaShopFan.position.set(-6.01082, -10.8145, 2.09206)
    const gap = 1.7
    const mat = [2, 2]
    for (let i = 0; i < mat[0]; ++i) {
      for (let j = 0; j < mat[1]; ++j) {
        if (i === 0 && j === 0) {
          continue
        }
        this.main.add(
          teaShopFan.clone().translateX(j * gap).translateY(i * gap),
        )
      }
    }
  }

  private buildCarStationFan () {
    const carStationFan = this.models['tea-shop-fan']
    carStationFan.position.set(-11.5902, 20.8363, 6.09009)
    const gap = 2.2
    for (let i = 0; i < 4; ++i) {
      this.main.add(
        carStationFan.clone().translateX(i * gap),
      )
    }
  }
}
