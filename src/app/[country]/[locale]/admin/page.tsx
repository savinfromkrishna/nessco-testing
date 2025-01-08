'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { revalidateProductsPath, revalidateProductsTag } from './actions'

export default function AdminPage() {
  const router = useRouter()
  const [isRevalidatingTag, setIsRevalidatingTag] = useState(false)
  const [isRevalidatingPath, setIsRevalidatingPath] = useState(false)

  const handleRevalidateTag = async () => {
    setIsRevalidatingTag(true)
    try {
      const result = await revalidateProductsTag()
      alert(result.message)
      if (result.success) {
        router.refresh()
      }
    } catch (error) {
      console.error('Error during tag revalidation:', error)
      alert('An unexpected error occurred during tag revalidation.')
    } finally {
      setIsRevalidatingTag(false)
    }
  }

  const handleRevalidatePath = async () => {
    setIsRevalidatingPath(true)
    try {
      const result = await revalidateProductsPath()
      alert(result.message)
      if (result.success) {
        router.refresh()
      }
    } catch (error) {
      console.error('Error during path revalidation:', error)
      alert('An unexpected error occurred during path revalidation.')
    } finally {
      setIsRevalidatingPath(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <Link href="/" className="text-blue-500 hover:text-blue-600">
            Back to Products
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Cache Management</h2>
          <div className="space-y-4">
            <button
              onClick={handleRevalidateTag}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
              disabled={isRevalidatingTag}
            >
              {isRevalidatingTag ? 'Revalidating Tag...' : 'Revalidate Tag'}
            </button>
            <button
              onClick={handleRevalidatePath}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
              disabled={isRevalidatingPath}
            >
              {isRevalidatingPath ? 'Revalidating Path...' : 'Revalidate Path'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

