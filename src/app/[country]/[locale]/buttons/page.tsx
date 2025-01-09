'use client'

import { useState } from 'react'
import { revalidateHomeDataTag, revalidateAboutDataTag } from './actions'

export default function ButtonsPage() {
  const [message, setMessage] = useState<string | null>(null)

  const handleRevalidate = async (action: () => Promise<{ success: boolean; message: string }>) => {
    try {
      const result = await action()
      setMessage(result.message)
    } catch (error) {
      setMessage('An error occurred while revalidating.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Revalidation Buttons</h1>
      <div className="space-y-4">
        <button
          onClick={() => handleRevalidate(revalidateHomeDataTag)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Revalidate Home Page
        </button>
        <button
          onClick={() => handleRevalidate(revalidateAboutDataTag)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Revalidate About Page
        </button>
      </div>
      {message && (
        <p className="mt-8 text-gray-600">{message}</p>
      )}
    </div>
  )
}

