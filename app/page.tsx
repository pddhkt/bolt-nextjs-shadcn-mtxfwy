import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <h1 className="text-4xl font-bold text-white mb-8">Welcome to RideEase</h1>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </div>
  )
}