import React from 'react'
import { useRouter } from 'hooks/useRouter'

const NotFound = () => {
  const router = useRouter()

  return (
    <>
      Page Not Found for location <code>{router.pathname}</code>
    </>
  )
}

export default NotFound
