import { TextureLoader } from 'three'
import { DRACOLoader, GLTFLoader } from 'three/examples/jsm/Addons.js'

export const enum LoaderTypeEnum {
  GLTF,
  Texture,
}

export interface Resouece {
  name: string
  type: LoaderTypeEnum
  path: string
}

interface OnFileLoadedOptions {
  name: string
  res: any
  total: number
  successTotal: number
  failTotal: number
}

interface LoaderOptions {
  onFinish?: (resources: Record<string, any>)=> void
  onFileLoadSuccess?: (options: OnFileLoadedOptions)=> void
  onFileLoadFail?: (options: OnFileLoadedOptions)=> void
}

export class Loader {
  private gltfLoader: GLTFLoader

  private texture: TextureLoader

  private total = 0

  private successTotal = 0

  private failTotal = 0

  resouece: Record<string, any> = {}

  loaderMap: Record<LoaderTypeEnum, GLTFLoader | TextureLoader>

  constructor (private options: LoaderOptions = {}) {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')

    this.gltfLoader = new GLTFLoader()
    this.gltfLoader.setDRACOLoader(dracoLoader)

    this.texture = new TextureLoader()

    this.loaderMap = {
      [LoaderTypeEnum.GLTF]: this.gltfLoader,
      [LoaderTypeEnum.Texture]: this.texture,
    }
  }

  load (resources: Resouece[]) {
    this.total = resources.length
    for (const resource of resources) {
      this.loadResouece(resource)
    }
  }

  private loadResouece (resource: Resouece) {
    const loader = this.loaderMap[resource.type]

    if (!loader) {
      return
    }

    loader.load(
      resource.path,
      (res) => {
        this.loadSuccess(resource, res)
      },
      undefined,
      (e) => {
        this.loadFail(resource, e)
      },
    )
  }

  private loadSuccess (resource: Resouece, res: any) {
    this.successTotal++
    this.resouece[resource.name] = res

    this.options.onFileLoadSuccess?.({
      name: resource.name,
      res,
      total: this.total,
      successTotal: this.successTotal,
      failTotal: this.failTotal,
    })
    this.loadEnd()
  }

  private loadFail (resource: Resouece, e: any) {
    console.warn(`${resource.name} load fail.`, e)

    this.failTotal++

    this.options.onFileLoadFail?.({
      name: resource.name,
      res: e,
      total: this.total,
      successTotal: this.successTotal,
      failTotal: this.failTotal,
    })
    this.loadEnd()
  }

  private loadEnd () {
    if (this.total === this.successTotal + this.failTotal) {
      this.options.onFinish?.(this.resouece)
    }
  }
}
