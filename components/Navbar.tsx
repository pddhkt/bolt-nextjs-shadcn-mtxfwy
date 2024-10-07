import Link from 'next/link'
import React from 'react'

export default function Navbar({
    userInfo,
    }: {
    userInfo: { email: string }
}) {

    console.log(userInfo)

  return (
    <div className="flex bg-black/10 py-2 px-4 justify-center">

      <div className="container flex justify-between">
        <Link href={'/'}> bud</Link>
          
        {userInfo.email}
      </div>
      </div>
  )
}
