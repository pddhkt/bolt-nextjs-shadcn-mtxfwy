"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john@example.com')
  const { toast } = useToast()

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically call an API to update the user's profile
    console.log('Updating profile with:', { name, email })
    toast({
      title: "Profile updated.",
      description: "Your profile has been successfully updated.",
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleUpdateProfile} className="w-full max-w-md space-y-4 bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Your Profile</h2>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <Button type="submit" className="w-full">Update Profile</Button>
      </form>
    </div>
  )
}