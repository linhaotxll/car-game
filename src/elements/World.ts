import { AxesHelper, Scene, SRGBColorSpace, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

import { Camera } from './Camera'
import { Carousel } from './Carousel'
import { DropTower } from './DropTower'
import { DropUp } from './DropUp'
import { FerrisWheel } from './FerrisWheel'
import { Repeats } from './Repeats'
import { Ship } from './Ship'
import { Windmill } from './Windmill'

import { createMapcatMaterial } from '~/materials/matcap'

interface WorldOptions {
  canvas: HTMLCanvasElement
}

export class World {
  scene = new Scene()

  renderder!: WebGLRenderer

  camera!: Camera

  dropTower = new DropTower()

  ferrisChair = new FerrisWheel()

  dropUp = new DropUp()

  carousel = new Carousel()

  windmill = new Windmill()

  ship = new Ship()

  canvas: HTMLCanvasElement

  canvasWidth: number

  canvasHeight: number

  repeats = new Repeats()

  constructor (options: WorldOptions) {
    this.canvas = options.canvas
    this.canvasWidth = this.canvas.clientWidth
    this.canvasHeight = this.canvas.clientHeight

    if (import.meta.env.DEV) {
      this.initialAxesHelper()
    }

    this.initialCamera()
    this.initialRenderer()
    this.initialOrbitControls()
  }

  build (resources: Record<string, any>) {
    // 地图场景
    const playground = resources['model-playground'].scene

    // 对地图场景里的每个元素进行遍历处理
    const models = [...playground.children]

    for (const model of models) {
      const data = model.userData

      // console.log(data.name, model)

      // 处理 matcap 元素，进行贴图
      if (data.matcap) {
        model.material = createMapcatMaterial(resources[`matcap-${data.matcap}`])
      }

      // if (data['shadow-color']) {
      //   console.log(model)
      // }

      // 处理可重复元素
      if (this.repeats.contains(data.name)) {
        this.repeats.add(data.name, model)
      }

      // 处理风车
      if (data.name === 'windmill') {
        this.windmill.add(model)
      }

      // 旋转木马
      if (data.name === 'carousel-rotation') {
        this.carousel.add(model)
      }

      // 海盗船
      if (data.name.includes('ship')) {
        this.ship.add(model)
      }

      // 跳楼机
      if (data.name.includes('drop-rotation')) {
        this.dropTower.add(model)
      }

      // 升降机
      if (data.name === 'drop-up-seat') {
        this.dropUp.add(model)
      }

      // 摩天轮
      if (data.name.includes('ferris')) {
        this.ferrisChair.add(model)
      }
    }

    this.scene.add(playground)

    // 构建重复元素
    this.repeats.build()
    this.scene.add(this.repeats.main)

    // 构建旋转木马
    this.carousel.build()
    this.scene.add(this.carousel.main)

    // 构建海盗船
    this.ship.build()
    this.scene.add(this.ship.main)

    // 构建跳楼机
    this.dropTower.build()
    this.scene.add(this.dropTower.main)

    // 构建升降机
    this.dropUp.build()
    this.scene.add(this.dropUp.main)

    // 构建摩天轮
    this.ferrisChair.build()
    this.scene.add(this.ferrisChair.main)
  }

  private render () {
    // console.log(111, this.scene.children)
    this.renderder.render(this.scene, this.camera.main)

    this.windmill.render()
    this.carousel.render()
    this.ship.render()
    this.dropTower.render()
    this.dropUp.render()
    this.ferrisChair.render()
  }

  private initialRenderer () {
    const renderer = this.renderder = new WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
      alpha: true,
    })
    renderer.setSize(this.canvasWidth, this.canvasHeight)
    renderer.outputColorSpace = SRGBColorSpace
    renderer.setAnimationLoop(this.render.bind(this))
  }

  private initialCamera () {
    this.camera = new Camera(this.canvasWidth, this.canvasHeight)
    this.scene.add(this.camera.main)
  }

  private initialAxesHelper () {
    const axesHelper = new AxesHelper(50)
    this.scene.add(axesHelper)
  }

  private initialOrbitControls () {
    const control = new OrbitControls(this.camera.main, this.canvas)

    control.addEventListener('change', () => {
      // console.log(this.camera.main.position)
    })

    if (import.meta.env.PROD) {
      control.enabled = false
    }
  }
}
