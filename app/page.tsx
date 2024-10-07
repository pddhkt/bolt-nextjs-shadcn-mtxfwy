import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getUserInfo } from '@/server/users'
import { BookingForm } from './booking/_components/BookingForm'

export default async function Home() {
    const userInfo = await getUserInfo()


  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl font-bold text-white mb-8">Welcome to RideEase</h1>
      {userInfo ? (
        <BookingForm />
    ) :    <AuthSection />}
   
    </div>
  )
}


function AuthSection() {
    return (
        <div className="flex items-center space-x-4">
            <Button asChild>
                <Link href="/signup">Sign Up</Link>
            </Button>
            <Button asChild variant="secondary">
                <Link href="/login">Login</Link>
            </Button>
        </div>
    )
}