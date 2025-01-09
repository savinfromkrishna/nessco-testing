'use server'

import { revalidateTag, revalidatePath } from 'next/cache'

export async function revalidateHomeDataTag() {
  try {
    revalidateTag('home-data')
    return { success: true, message: 'Home data cache has been refreshed using revalidateTag.' }
  } catch (error) {
    console.error('Failed to revalidate home-data tag:', error)
    return { success: false, message: 'Failed to refresh home data cache using revalidateTag.' }
  }
}

export async function revalidateCountryDataTag() {
  try {
    revalidateTag('country-data')
    return { success: true, message: 'Country data cache has been refreshed using revalidateTag.' }
  } catch (error) {
    console.error('Failed to revalidate country-data tag:', error)
    return { success: false, message: 'Failed to refresh country data cache using revalidateTag.' }
  }
}

export async function revalidateAllTags() {
  try {
    revalidateTag('home-data')
    revalidateTag('country-data')
    revalidatePath('/')
    return { success: true, message: 'All data caches have been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate all tags:', error)
    return { success: false, message: 'Failed to refresh all data caches.' }
  }
}

export async function revalidateHomePath() {
  try {
    revalidatePath('/')
    return { success: true, message: 'Home page cache has been refreshed using revalidatePath.' }
  } catch (error) {
    console.error('Failed to revalidate home path:', error)
    return { success: false, message: 'Failed to refresh home page cache using revalidatePath.' }
  }
}

