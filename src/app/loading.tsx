import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <h1 className="flex h-screen items-center justify-center">
      <Loader2 className="h-52 w-52 animate-spin" />
    </h1>
  )
}
