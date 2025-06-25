/** 项目内的样式，最好放在重置样式后，uno.css前  */
import './styles/index.scss'

/** 引入uno.css，不引入不生效 */
import 'uno.css'

import { createApp } from 'vue'

import App from '~/App.vue'

async function bootstrap () {
  const app = createApp(App)

  app.mount('#root')
}

bootstrap()
// Scene setup

// const scene = new THREE.Scene()
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// const renderer = new THREE.WebGLRenderer()
// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

// // Define constants
// const NUM_CHAIRS = 12
// const RADIUS = 5

// // Create chairs
// const chairs = []
// const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
// const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 })

// for (let i = 0; i < NUM_CHAIRS; i++) {
//   const chair = new THREE.Mesh(geometry, material)
//   chairs.push(chair)
//   scene.add(chair)
// }

// camera.position.z = 10

// const axes = new THREE.AxesHelper(100)
// scene.add(axes)

// let rotation = 0

// // console.log(THREE.OrbitControls)
// const control = new OrbitControls(camera, document.body)

// // Animation loop
// function animate () {
//   requestAnimationFrame(animate)

//   // Update rotation
//   rotation += 0.003

//   // Position each chair around a circle
//   for (let i = 0; i < NUM_CHAIRS; i++) {
//     const chair = chairs[i]
//     const angle = (Math.PI * 2 / NUM_CHAIRS) * i - 0
//     const x = RADIUS * Math.cos(angle)
//     const z = RADIUS * Math.sin(angle)
//     chair.position.set(x, 0, z)
//   }

//   renderer.render(scene, camera)
// }

// animate()
