import { Group, Vector2, Vector3, Vector4 } from 'three'
import { Mesh } from 'three'

import { degToRand } from '~/utils/degToRand'

interface RepeatsModel {
  // 鼹鼠
  mole: Group
  // 茶舍风扇
  'tea-shop-fan': Group
  // 车站风扇
  'car-station-fan': Group
  // 车站柱子
  'station-sylinder': Mesh
  // 兔子
  rabbit: Group
  // 鸡
  chicken: Group
  // 羊
  sheep: Group
  // 咖啡椅
  'coffee-chair': Mesh
  // 咖啡桌
  'coffee-table': Mesh
  // 咖啡车轮
  'coffee-car-wheel': Group
  // 旋转木马球
  'carousel-ball': Mesh
  // 柱子
  'drop-up-cylinder': Mesh
}

type ExtractProperties<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T]

type ExtractMeshAttr = ExtractProperties<RepeatsModel, Mesh>

export class Repeats {
  private models: RepeatsModel = {
    mole: new Group(),
    'tea-shop-fan': new Group(),
    'car-station-fan': new Group(),
    'station-sylinder': new Mesh(),
    rabbit: new Group(),
    chicken: new Group(),
    sheep: new Group(),
    'coffee-chair': new Mesh(),
    'coffee-table': new Mesh(),
    'coffee-car-wheel': new Group(),
    'carousel-ball': new Mesh(),
    'drop-up-cylinder': new Mesh(),
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
      this.models[name as ExtractMeshAttr] = newModel
    }
  }

  /**
   * 构建重复元素
   */
  build () {
    this.buildMole()
    this.buildTeaShopFan()
    this.buildCarStationFan()
    this.buildRabit()
    this.buildChicken()
    this.buildSheep()
    this.buildCoffeeTable()
    this.buildCoffeeChair()
    this.buildCarStationSylinder()
    this.buildCarouselBall()
    this.buildCoffeeCarWheel()
    this.buildDropUpCylinder()
  }

  /**
   * 构建鼹鼠
   */
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

  /**
   * 构建茶舍风扇
   */
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

  /**
   * 构建车顶风扇
   */
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

  /**
   * 构建车底柱子
   */
  private buildCarStationSylinder () {
    const sylinder = this.models['station-sylinder']
    const gap = 4
    const num = 2
    for (let i = 1; i <= num; ++i) {
      const newSylinder = sylinder.clone()
      newSylinder.translateX(gap * i)
      this.main.add(newSylinder)
    }
  }

  /**
   * 构建兔子
   */
  private buildRabit () {
    const rabbit = this.models.rabbit

    const rabbitMat = [
      new Vector4(12.5582, 12.5105, 0.949029, degToRand(-7.29225)),
      new Vector4(14.517, 12.9141, 0.949029, degToRand(20.2972)),
      new Vector4(15.8362, 14.9528, 0.949029, degToRand(105.298)),
    ]

    for (const r of rabbitMat) {
      const newRabbit = rabbit.clone()
      newRabbit.rotateZ(r.w)
      newRabbit.position.copy(new Vector3(r.x, r.y, r.z))
      this.main.add(newRabbit)
    }
  }

  /**
   * 构建鸡
   */
  private buildChicken () {
    const chicken = this.models.chicken
    const chickenMat = [
      new Vector3(15.0235, 11.1775, 0.505387),
      new Vector3(11.1837, 11.0559, 0.505387),
      new Vector3(16.0103, 12.9867, 0.505387),
      new Vector3(13.3788, 15.3714, 0.505387),
      new Vector3(11.2202, 16.2143, 0.505387),
      new Vector3(11.3025, 14.1174, 0.505387),
      new Vector3(16.3804, 16.6666, 0.505387),
    ]

    for (const c of chickenMat) {
      const newChecken = chicken.clone()
      newChecken.position.copy(new Vector3(c.x, c.y, c.z))
      this.main.add(newChecken)
    }
  }

  /**
   * 构建羊
   */
  private buildSheep () {
    const sheep = this.models.sheep
    const sheepMat = [
      new Vector4(13.8021, 4.19636, 1.62158, degToRand(0)),
      new Vector4(11.4091, 5.0598, 1.62158, degToRand(-290.162)),
      new Vector4(15.2576, 5.87391, 1.62158, degToRand(-227.591)),
      new Vector4(13.7774, 7.67482, 1.62158, degToRand(-349.738)),
      new Vector4(16.1211, 8.39025, 1.62158, degToRand(-225.018)),
      new Vector4(11.6065, 8.66162, 1.62158, degToRand(-349.738)),
    ]
    for (const s of sheepMat) {
      const newSheep = sheep.clone()
      newSheep.rotateZ(s.w)
      newSheep.position.copy(new Vector3(s.x, s.y, s.z))
      this.main.add(newSheep)
    }
  }

  /**
   * 构建咖啡桌
   */
  private buildCoffeeTable () {
    const coffeeTable = this.models['coffee-table']
    const coffeeTableMat = [
      new Vector3(-5.82097, 11.0665, 0.524698),
      new Vector3(-3.39666, 11.0665, 0.524698),
      new Vector3(-5.82097, 15.5753, 0.524698),
      new Vector3(-3.39666, 15.5753, 0.524698),
    ]
    for (const position of coffeeTableMat) {
      const newTable = coffeeTable.clone()
      newTable.position.copy(position)
      this.main.add(newTable)
    }
  }

  /**
   * 构建咖啡椅
   */
  private buildCoffeeChair () {
    const coffeeChair = this.models['coffee-chair']
    const coffeeChairMat = [
      new Vector4(-5.86628, 9.35516, 0.175147, degToRand(0)),
      new Vector4(-3.44198, 9.35516, 0.175147, degToRand(0)),

      new Vector4(-5.86628, 12.7858, 0.175147, degToRand(180)),
      new Vector4(-3.44198, 12.7858, 0.175147, degToRand(180)),

      new Vector4(-5.86628, 13.8639, 0.175147, degToRand(0)),
      new Vector4(-3.44198, 13.8639, 0.175147, degToRand(0)),

      new Vector4(-5.86628, 17.2945, 0.175147, degToRand(180)),
      new Vector4(-3.44198, 17.2945, 0.175147, degToRand(180)),
    ]
    for (const position of coffeeChairMat) {
      const newChair = coffeeChair.clone()
      newChair.position.copy(new Vector3(position.x, position.y, position.z))
      newChair.rotateZ(position.w)
      this.main.add(newChair)
    }
  }

  /**
   * 构建咖啡车轮
   */
  private buildCoffeeCarWheel () {
    const coffeeCarWheel = this.models['coffee-car-wheel'].clone()

    const mat = [
      new Vector2(0, degToRand(180)),
      new Vector2(degToRand(180), 0),
      new Vector2(degToRand(180), degToRand(180)),
    ]

    for (const rotation of mat) {
      const newWheel = coffeeCarWheel.clone()
      newWheel.rotateX(rotation.x).rotateY(rotation.y)
      newWheel.position.set(-9.36434, 13.2031, 0.749157)
      this.main.add(newWheel)
    }
  }

  /**
   * 构建旋转木马球
   */
  private buildCarouselBall () {
    const carouselBall = this.models['carousel-ball']
    const num = 12

    const anglePer = 360 / 12

    // 下排
    for (let i = 0; i < num; ++i) {
      const newCarouselBall = carouselBall.clone()
      newCarouselBall.rotateZ(degToRand(anglePer * i))
      this.main.add(newCarouselBall)
    }

    // 上排
    for (let i = 0; i < num; ++i) {
      const newCarouselBall = carouselBall.clone()
      newCarouselBall.rotateZ(degToRand(anglePer * i)).translateZ(3.4)
      newCarouselBall.scale.set(0.95, 0.95, 0.95)
      this.main.add(newCarouselBall)
    }
  }

  /**
   * 构建下落柱子
   */
  private buildDropUpCylinder () {
    const cylinder = this.models['drop-up-cylinder']
    const gap = 1
    const num = 4
    for (let i = 1; i <= num; ++i) {
      const newCylinder = cylinder.clone()
      newCylinder.translateY(gap * i)
      this.main.add(newCylinder)
    }
  }
}
