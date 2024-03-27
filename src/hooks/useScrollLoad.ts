import { ref, onMounted, onUnmounted } from 'vue'
import { throttle } from '@/utils'

export default () => {
  const app = document.querySelector('#app') as Element
  const isNearBottom = () =>
    app.scrollHeight - app.scrollTop - app.clientHeight < app.clientHeight

  const counter = ref(1)

  const handle = throttle(() => isNearBottom() && (counter.value += 1), 300)

  onMounted(() => app.addEventListener('scroll', handle))
  onUnmounted(() => app.removeEventListener('scroll', handle))

  return { counter }
}
