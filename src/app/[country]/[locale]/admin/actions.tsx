'use server'

import { revalidateTag, revalidatePath } from 'next/cache'

export async function revalidateProductsTag() {
  try {
    revalidateTag('products')
    return { success: true, message: 'Products cache has been refreshed using revalidateTag.' }
  } catch (error) {
    console.error('Failed to revalidate tag:', error)
    return { success: false, message: 'Failed to refresh products cache using revalidateTag.' }
  }
}

export async function revalidateProductsPath() {
  try {
    revalidatePath('/')
    return { success: true, message: 'Products cache has been refreshed using revalidatePath.' }
  } catch (error) {
    console.error('Failed to revalidate path:', error)
    return { success: false, message: 'Failed to refresh products cache using revalidatePath.' }
  }
}
