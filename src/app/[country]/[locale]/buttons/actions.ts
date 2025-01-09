'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateHomeDataTag() {
  try {
    revalidateTag('home')
    return { success: true, message: 'Home data cache has been refreshed using revalidateTag.' }
  } catch (error) {
    console.error('Failed to revalidate home-data tag:', error)
    return { success: false, message: 'Failed to refresh home data cache using revalidateTag.' }
  }
}

export async function revalidateAboutDataTag() {
  try {
    revalidateTag('about')
    return { success: true, message: 'About data cache has been refreshed using revalidateTag.' }
  } catch (error) {
    console.error('Failed to revalidate about-data tag:', error)
    return { success: false, message: 'Failed to refresh about data cache using revalidateTag.' }
  }
}
