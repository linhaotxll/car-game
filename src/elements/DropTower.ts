import gsap from 'gsap'
import { Group, type Mesh } from 'three'
import { degToRad } from 'three/src/math/MathUtils.js'

export class DropTower {
  static INITIAL_POSITION_Z = 3

  static TARGET_POSITION_Z = 8

  private dropTowerChairs: Mesh[] = []

  private builded = false

  private transform = {
    rotate: 0,
    z: DropTower.INITIAL_POSITION_Z,
  }

  main = new Group()

  add (model: Mesh) {
    if (model.userData.name === 'drop-rotation-chair') {
      this.dropTowerChairs.push(model)
    } else {
      this.main.add(model)
    }
  }

  build () {
    // 跳楼机除椅子外，清空所有零件位置，并将 main 设置为跳楼机初始位置
    const defaultDropTowerPosition = this.main.children[0].position.clone()
    this.main.children.forEach((child) => {
      child.position.set(0, 0, 0)
    })
    this.main.position.copy(defaultDropTowerPosition)

    // 将椅子部件添加进 Group，并设置 Group 初始位置为椅子部件默认位置
    const chairGroup = new Group()
    const defaultChairPosition = this.dropTowerChairs[0].position.clone()
    this.dropTowerChairs.forEach((child) => {
      child.position.set(0, 0, 0)
      chairGroup.add(child)
    })
    chairGroup.position.copy(defaultChairPosition.sub(defaultDropTowerPosition))
    this.main.add(chairGroup)

    // 创建 11 把椅子
    const num = 11
    const anglePer = 360 / num
    for (let i = 0; i < num; ++i) {
      const newChair = chairGroup.clone()
      newChair.rotateZ(degToRad(i * anglePer))
      this.main.add(newChair)
    }

    // 添加旋转和位移动画
    gsap.timeline({ repeat: -1 })
      .to(this.transform, { z: DropTower.TARGET_POSITION_Z, rotate: Math.PI, ease: 'power1.out', duration: 1.2 })
      .to(this.transform, { z: DropTower.INITIAL_POSITION_Z, rotate: -Math.PI, ease: 'power1.out', duration: 1.2 })

    this.builded = true
  }

  render () {
    if (this.builded) {
      this.main.rotation.z = this.transform.rotate
      this.main.position.z = this.transform.z
    }
  }
}
