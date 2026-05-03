<template>
  <canvas
    ref="canvasRef"
    class="w-full h-full border-none block"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, useTemplateRef } from 'vue'

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern

interface GridOffset {
  x: number
  y: number
}

interface Props {
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left'
  speed?: number
  squareSize?: number
  hoverFillColor?: CanvasStrokeStyle
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'right',
  speed: 1,
  squareSize: 40,
  hoverFillColor: '#222'
})

const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef')
const requestRef = ref<number | null>(null)
const numSquaresX = ref<number>(0)
const numSquaresY = ref<number>(0)
const gridOffset = ref<GridOffset>({ x: 0, y: 0 })
const hoveredSquareRef = ref<GridOffset | null>(null)

let ctx: CanvasRenderingContext2D | null = null

const getThemeColors = () => {
  const s = getComputedStyle(document.documentElement)
  return {
    borderColor: s.getPropertyValue('--ui-border').trim() || '#3f3f46',
    bgColor: s.getPropertyValue('--ui-bg').trim() || '#09090b'
  }
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  numSquaresX.value = Math.ceil(canvas.width / props.squareSize) + 1
  numSquaresY.value = Math.ceil(canvas.height / props.squareSize) + 1
}

const drawGrid = () => {
  const canvas = canvasRef.value
  if (!ctx || !canvas) return

  const { borderColor } = getThemeColors()

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const startX = Math.floor(gridOffset.value.x / props.squareSize) * props.squareSize
  const startY = Math.floor(gridOffset.value.y / props.squareSize) * props.squareSize

  for (let x = startX; x < canvas.width + props.squareSize; x += props.squareSize) {
    for (let y = startY; y < canvas.height + props.squareSize; y += props.squareSize) {
      const squareX = x - (gridOffset.value.x % props.squareSize)
      const squareY = y - (gridOffset.value.y % props.squareSize)

      if (
        hoveredSquareRef.value
        && Math.floor((x - startX) / props.squareSize) === hoveredSquareRef.value.x
        && Math.floor((y - startY) / props.squareSize) === hoveredSquareRef.value.y
      ) {
        ctx.fillStyle = props.hoverFillColor
        ctx.fillRect(squareX, squareY, props.squareSize, props.squareSize)
      }

      ctx.strokeStyle = borderColor
      ctx.strokeRect(squareX, squareY, props.squareSize, props.squareSize)
    }
  }
}

const updateAnimation = () => {
  const effectiveSpeed = Math.max(props.speed, 0.1)

  switch (props.direction) {
    case 'right':
      gridOffset.value.x = (gridOffset.value.x - effectiveSpeed + props.squareSize) % props.squareSize
      break
    case 'left':
      gridOffset.value.x = (gridOffset.value.x + effectiveSpeed + props.squareSize) % props.squareSize
      break
    case 'up':
      gridOffset.value.y = (gridOffset.value.y + effectiveSpeed + props.squareSize) % props.squareSize
      break
    case 'down':
      gridOffset.value.y = (gridOffset.value.y - effectiveSpeed + props.squareSize) % props.squareSize
      break
    case 'diagonal':
      gridOffset.value.x = (gridOffset.value.x - effectiveSpeed + props.squareSize) % props.squareSize
      gridOffset.value.y = (gridOffset.value.y - effectiveSpeed + props.squareSize) % props.squareSize
      break
  }

  drawGrid()
  requestRef.value = requestAnimationFrame(updateAnimation)
}

const handleMouseMove = (event: MouseEvent) => {
  const canvas = canvasRef.value
  if (!canvas) return

  const startX = Math.floor(gridOffset.value.x / props.squareSize) * props.squareSize
  const startY = Math.floor(gridOffset.value.y / props.squareSize) * props.squareSize

  const hoveredSquareX = Math.floor((event.clientX + gridOffset.value.x - startX) / props.squareSize)
  const hoveredSquareY = Math.floor((event.clientY + gridOffset.value.y - startY) / props.squareSize)

  if (
    !hoveredSquareRef.value
    || hoveredSquareRef.value.x !== hoveredSquareX
    || hoveredSquareRef.value.y !== hoveredSquareY
  ) {
    hoveredSquareRef.value = { x: hoveredSquareX, y: hoveredSquareY }
  }
}

const handleMouseLeave = () => {
  hoveredSquareRef.value = null
}

const initializeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')
  resizeCanvas()

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseleave', handleMouseLeave)
  window.addEventListener('resize', resizeCanvas)

  requestRef.value = requestAnimationFrame(updateAnimation)
}

const cleanup = () => {
  if (requestRef.value) {
    cancelAnimationFrame(requestRef.value)
    requestRef.value = null
  }

  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseleave', handleMouseLeave)
  window.removeEventListener('resize', resizeCanvas)
}

onMounted(() => {
  initializeCanvas()
})

onUnmounted(() => {
  cleanup()
})

watch(
  [
    () => props.direction,
    () => props.speed,
    () => props.hoverFillColor,
    () => props.squareSize
  ],
  () => {
    cleanup()
    initializeCanvas()
  }
)
</script>
