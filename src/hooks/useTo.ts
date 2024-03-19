import { useRouter } from 'vue-router'

export default function useTo(path: string) {
  const router = useRouter()
  router.replace(path)
}
