<script setup lang="ts">
import { RESOURCE_LIST } from './constant/resource'
import { World } from './elements/World'
import { Loader } from './utils/Loader'

// 引入three.js库
const container = useTemplateRef<HTMLCanvasElement>('container')

// const { width: containerWidth, height: containerHeight } = useElementSize(container)

onMounted(initial)

function initial () {
  if (!container.value) {
    return
  }

  const world = new World({
    canvas: container.value,
  })

  const loader = new Loader({
    onFinish (resources) {
      world.build(resources)
    },
  })

  loader.load(RESOURCE_LIST)
}

// let box: Mesh
// let boxBody: Body
// let world: World
// let scene: Scene
// let camera: Camera
// let renderer: WebGLRenderer

// const initialY = 5

// // 地面大小
// const plane = [10, 0.1, 10]

// function initWorld () {
//   world = new World({
//     gravity: new Vec3(0, -9.82, 0),
//     allowSleep: true,
//   })

//   world.broadphase = new SAPBroadphase(world)

//   // 地面材质
//   const groundMaterial = new Material('groundMaterial')

//   // 盒子材质
//   const boxMaterial = new Material('boxMaterial')

//   // 默认接触材质
//   const defaultContactMaterial = new ContactMaterial(
//     groundMaterial,
//     boxMaterial,
//     {
//       friction: 0.2,
//       restitution: 0,
//     },
//   )

//   world.addContactMaterial(defaultContactMaterial)

//   // 地面刚体
//   const groundBody = new Body({
//     // mass: 0,
//     type: Body.STATIC,
//     shape: new Box(new Vec3(...plane)),
//     material: groundMaterial,
//     position: new Vec3(0, 0, 0),
//   })
//   groundBody.quaternion.setFromEuler(-Math.PI * 2, 0, 0)
//   // groundBody.quaternion.setFromAxisAngle(
//   //   new Vec3(1, 0, 0),
//   //   0.1,
//   // )
//   world.addBody(groundBody)

//   // 箱子刚体
//   boxBody = new Body({
//     mass: 1,
//     position: new Vec3(0, initialY, 0),
//     shape: new Sphere(1),
//     material: boxMaterial,
//     type: Body.DYNAMIC,
//   })
//   world.addBody(boxBody)
// }

// function initThree () {
//   scene = new Scene()

//   const axesHelper = new AxesHelper(100)
//   scene.add(axesHelper)

//   const groundPlane = new Mesh(
//     new BoxGeometry(...plane.map(item => item * 2)),
//     new MeshBasicMaterial(),
//   )
//   groundPlane.rotateX(0)
//   scene.add(groundPlane)

//   box = new Mesh(
//     new SphereGeometry(1),
//     new MeshBasicMaterial({ color: 0xFF0000 }),
//   )
//   box.position.set(0, initialY, 0)
//   scene.add(box)

//   // debugger
//   camera = new PerspectiveCamera(
//     45,
//     containerWidth.value / containerHeight.value,
//     1,
//     2000,
//   )

//   camera.position.set(20, 20, 20)
//   scene.add(camera)

//   renderer = new WebGLRenderer({ antialias: true })
//   renderer.setSize(containerWidth.value, containerHeight.value)
//   renderer.outputColorSpace = SRGBColorSpace

//   const control = new OrbitControls(camera, renderer.domElement)
//   control.addEventListener('change', () => {
//     renderThree()
//   })
// }

// function renderThree () {
//   renderer.render(scene, camera)
// }

// onMounted(() => {
//   initThree()
//   initWorld()

//   container.value?.appendChild(renderer.domElement)

//   update()
// })

// function update () {
//   world.step(1.0 / 60)
//   box.position.copy(boxBody.position)
//   renderThree()

//   if (boxBody.sleepState === BODY_SLEEP_STATES.SLEEPING) {
//     console.log('Box is currently sleeping.')
//   } else {
//     console.log(`Box velocity: ${boxBody.velocity.toString()}, Angular velocity: ${boxBody.angularVelocity.toString()}`)
//   }

//   requestAnimationFrame(update)
// }

// // 手动将箱子置入睡眠状态
// setTimeout(() => {
//   if (boxBody.velocity.lengthSquared() < 0.1 && boxBody.angularVelocity.lengthSquared() < 0.1) {
//     console.log('Box is now sleeping.')
//     boxBody.sleep()
//   }
// }, 3000) // 3秒后检查并置入睡眠状态

// // 创建一个场景
// const scene = new THREE.Scene()

// // 创建一个相机
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// camera.position.z = 5

// // 创建一个WebGL渲染器
// const renderer = new THREE.WebGLRenderer()
// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

// // 创建一个几何体
// const geometry = new THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)

// // 定义一个向量
// const vector = new THREE.Vector3(3, 4, 0)

// // 输出原始向量及其长度
// console.log('Original Vector:', vector.toArray())
// console.log('Length of Original Vector:', vector.length())

// // 归一化向量
// vector.normalize()

// // 输出归一化后的向量及其长度
// console.log('Normalized Vector:', vector.toArray())
// console.log('Length of Normalized Vector:', vector.length())

// // 渲染循环
// function animate () {
//   requestAnimationFrame(animate)
//   cube.rotation.x += 0.01
//   // cube.rotation.y += 0.01
//   renderer.render(scene, camera)
// }

// animate()

// // 创建一个场景
// const scene = new THREE.Scene()

// // 创建一个相机，并设置其位置
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// camera.position.set(200, 300, 200)

// // 设置相机的 up 向量为 (0, 0, 1)
// camera.up.set(0, 0, 1)
// camera.lookAt(0, 0, 0)

// // 更新相机的方向矩阵
// // camera.updateMatrixWorld()

// const axerHelper = new THREE.AxesHelper(150)
// scene.add(axerHelper)

// // 创建一个WebGL渲染器
// const renderer = new THREE.WebGLRenderer()
// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

// // 创建一个几何体
// // const geometry = new THREE.BoxGeometry()
// // const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
// // const cube = new THREE.Mesh(geometry, material)
// // scene.add(cube)

// // const geometry =
// const cube = new THREE.Mesh(
//   new THREE.CylinderGeometry(2, 5, 40, 32),
//   new THREE.MeshBasicMaterial({ color: 0xFF0000 }),
// )
// scene.add(cube)

// const control = new OrbitControls(camera, renderer.domElement)

// // 渲染循环
// function animate () {
//   requestAnimationFrame(animate)
//   // cube.rotation.x += 0.01
//   // cube.rotation.y += 0.01
//   renderer.render(scene, camera)
// }

// animate()
</script>

<template>
  <div h-full w-full bg-gradient-to-b class="from-#edab79 to-#f0a66d">
    <canvas ref="container" block h-full w-full></canvas>
  </div>
</template>
