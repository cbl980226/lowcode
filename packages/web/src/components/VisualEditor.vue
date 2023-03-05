<template>
  <div h-full w-full flex items-center justify-center bg-cyan>
    <div
      relative
      w-2xl
      h-2xl
      p-2
      bg-white
      id="visual-editor"
      ref="visualEditor"
      @dragover.prevent
      @drop="dropComponent"
    >
      <component
        border="1 blue dashed"
        v-for="component in componentList.value"
        :is="loadComponent(component.name)"
        :key="component.id"
        :ref="component.id"
        :id="component.id"
        :name="component.name"
        :width="component.width"
        :height="component.height"
        :x="component.x"
        :y="component.y"
        :style="{
          position: 'absolute',
          top: component.y + 'px',
          left: component.x + 'px',
          width: component.width + 'px',
          height: component.height + 'px'
        }"
        :draggable="true"
        @dragover.prevent
        @dragstart="startDraggingComponent($event, component.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// wip
import { defineAsyncComponent, reactive, ref } from 'vue'
import { useElementBounding } from '@vueuse/core'

const visualEditor = ref(null)
const offsetX = ref(0)
const offsetY = ref(0)

function loadComponent(name: string) {
  return defineAsyncComponent({
    loader: () => import(`@/components/component-pool/${name}.vue`),
    onError: err => console.error(err)
  })
}

interface Component {
  id: string
  name: string
  width: number
  height: number
  x: number
  y: number
}

const componentList = reactive<{ value: Component[] }>({
  value: [
    {
      id: 'text-component-1',
      name: 'TextComponent',
      width: 200,
      height: 200,
      x: 0,
      y: 0
    }
  ]
})

function startDraggingComponent(event: DragEvent, id: string) {
  event.dataTransfer?.setData('text/plain', id)
  offsetX.value = event.offsetX
  offsetY.value = event.offsetY
}

function dropComponent(event: DragEvent) {
  const id = event.dataTransfer?.getData('text/plain')
  if (!id) return
  const component = componentList.value.find(component => component.id == id)
  if (!component) return

  const visualEditorRect = useElementBounding(visualEditor)
  const visualEditorX = visualEditorRect.x.value
  const visualEditorY = visualEditorRect.y.value

  const componentX = event.clientX - visualEditorX - offsetX.value
  const componentY = event.clientY - visualEditorY - offsetY.value
  component.x = componentX
  component.y = componentY
}
</script>

<style scoped>
#visual-editor {
  box-shadow: 0px 0px 10px 2px black;
}
</style>
