'use server'

import { revalidateTag, revalidatePath } from 'next/cache'

export async function revalidateHomeDataTag() {
  try {
    revalidateTag('home-data')
    return { success: true, message: 'Home data cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate home-data tag:', error)
    return { success: false, message: 'Failed to refresh home data cache.' }
  }
}

export async function revalidateAboutDataTag() {
  try {
    revalidateTag('about-data')
    return { success: true, message: 'About page data cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate about-data tag:', error)
    return { success: false, message: 'Failed to refresh about page data cache.' }
  }
}

export async function revalidateVisionDataTag() {
  try {
    revalidateTag('vision-data')
    return { success: true, message: 'Vision page data cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate vision-data tag:', error)
    return { success: false, message: 'Failed to refresh vision page data cache.' }
  }
}

export async function revalidateThepinkcityDataTag() {
  try {
    revalidateTag('thepinkcity-data')
    return { success: true, message: 'The Pink City page data cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate thepinkcity-data tag:', error)
    return { success: false, message: 'Failed to refresh The Pink City page data cache.' }
  }
}

export async function revalidateSustainabilityDataTag() {
  try {
    revalidateTag('sustainability-data')
    return { success: true, message: 'Sustainability page data cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate sustainability-data tag:', error)
    return { success: false, message: 'Failed to refresh sustainability page data cache.' }
  }
}

export async function revalidateProjectsDataTag() {
  try {
    revalidateTag('projects-data')
    return { success: true, message: 'Projects page data cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate projects-data tag:', error)
    return { success: false, message: 'Failed to refresh projects page data cache.' }
  }
}

export async function revalidateOurstrengthDataTag() {
  try {
    revalidateTag('ourstrength-data')
    return { success: true, message: 'Our Strength page data cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate ourstrength-data tag:', error)
    return { success: false, message: 'Failed to refresh Our Strength page data cache.' }
  }
}

export async function revalidateOurcompanyDataTag() {
  try {
    revalidateTag('ourcompany-data')
    return { success: true, message: 'Our Company page data cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate ourcompany-data tag:', error)
    return { success: false, message: 'Failed to refresh Our Company page data cache.' }
  }
}

export async function revalidateApplicationDataTag() {
  try {
    revalidateTag('application-data')
    return { success: true, message: 'Application page data cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate application-data tag:', error)
    return { success: false, message: 'Failed to refresh Application page data cache.' }
  }
}

export async function revalidateBlogDataTag() {
  try {
    revalidateTag('blog-data')
    return { success: true, message: 'Blog page data cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate blog-data tag:', error)
    return { success: false, message: 'Failed to refresh Blog page data cache.' }
  }
}

export async function revalidateClienteleDataTag() {
  try {
    revalidateTag('clientele-data')
    return { success: true, message: 'Clientele page data cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate clientele-data tag:', error)
    return { success: false, message: 'Failed to refresh Clientele page data cache.' }
  }
}

export async function revalidateContactDataTag() {
  try {
    revalidateTag('contact-data')
    return { success: true, message: 'Contact page data cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate contact-data tag:', error)
    return { success: false, message: 'Failed to refresh Contact page data cache.' }
  }
}

export async function revalidateFaqDataTag() {
  try {
    revalidateTag('faq-data')
    return { success: true, message: 'FAQ page data cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate faq-data tag:', error)
    return { success: false, message: 'Failed to refresh FAQ page data cache.' }
  }
}

export async function revalidateKnowledgecenterDataTag() {
  try {
    revalidateTag('knowledgecenter-data')
    return { success: true, message: 'Knowledge Center page data cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate knowledgecenter-data tag:', error)
    return { success: false, message: 'Failed to refresh Knowledge Center page data cache.' }
  }
}

export async function revalidateMediaroomDataTag() {
  try {
    revalidateTag('mediaroom-data')
    return { success: true, message: 'Media Room page data cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate mediaroom-data tag:', error)
    return { success: false, message: 'Failed to refresh Media Room page data cache.' }
  }
}

export async function revalidateProductsDataTag() {
  try {
    revalidateTag('products-data')
    return { success: true, message: 'Products page data cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate products-data tag:', error)
    return { success: false, message: 'Failed to refresh Products page data cache.' }
  }
}

export async function revalidateResourcesDataTag() {
  try {
    revalidateTag('resources-data')
    return { success: true, message: 'Resources page data cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate resources-data tag:', error)
    return { success: false, message: 'Failed to refresh Resources page data cache.' }
  }
}

export async function revalidateSupportDataTag() {
  try {
    revalidateTag('support-data')
    return { success: true, message: 'Support page data cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate support-data tag:', error)
    return { success: false, message: 'Failed to refresh Support page data cache.' }
  }
}

export async function revalidateCountryDataTag() {
  try {
    revalidateTag('country-data')
    return { success: true, message: 'Country data cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate country-data tag:', error)
    return { success: false, message: 'Failed to refresh country data cache.' }
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
    return { success: true, message: 'Home page cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate home path:', error)
    return { success: false, message: 'Failed to refresh home page cache.' }
  }
}

export async function revalidateAboutPath() {
  try {
    revalidatePath('/about')
    return { success: true, message: 'About page cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate about path:', error)
    return { success: false, message: 'Failed to refresh about page cache.' }
  }
}

export async function revalidateVisionPath() {
  try {
    revalidatePath('/about/vision')
    return { success: true, message: 'Vision page cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate vision path:', error)
    return { success: false, message: 'Failed to refresh vision page cache.' }
  }
}

export async function revalidateThepinkcityPath() {
  try {
    revalidatePath('/about/the-pink-city')
    return { success: true, message: 'The Pink City page cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate the-pink-city path:', error)
    return { success: false, message: 'Failed to refresh The Pink City page cache.' }
  }
}

export async function revalidateSustainabilityPath() {
  try {
    revalidatePath('/about/sustainability')
    return { success: true, message: 'Sustainability page cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate sustainability path:', error)
    return { success: false, message: 'Failed to refresh sustainability page cache.' }
  }
}

export async function revalidateProjectsPath() {
  try {
    revalidatePath('/about/projects')
    return { success: true, message: 'Projects page cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate projects path:', error)
    return { success: false, message: 'Failed to refresh projects page cache.' }
  }
}

export async function revalidateOurstrengthPath() {
  try {
    revalidatePath('/about/our-strength')
    return { success: true, message: 'Our Strength page cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate our-strength path:', error)
    return { success: false, message: 'Failed to refresh Our Strength page cache.' }
  }
}

export async function revalidateOurcompanyPath() {
  try {
    revalidatePath('/about/our-company')
    return { success: true, message: 'Our Company page cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate our-company path:', error)
    return { success: false, message: 'Failed to refresh Our Company page cache.' }
  }
}

export async function revalidateApplicationPath() {
  try {
    revalidatePath('/application')
    return { success: true, message: 'Application page cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate application path:', error)
    return { success: false, message: 'Failed to refresh Application page cache.' }
  }
}

export async function revalidateBlogPath() {
  try {
    revalidatePath('/blog')
    return { success: true, message: 'Blog page cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate blog path:', error)
    return { success: false, message: 'Failed to refresh Blog page cache.' }
  }
}

export async function revalidateClientelePath() {
  try {
    revalidatePath('/clientele')
    return { success: true, message: 'Clientele page cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate clientele path:', error)
    return { success: false, message: 'Failed to refresh Clientele page cache.' }
  }
}

export async function revalidateContactPath() {
  try {
    revalidatePath('/contact')
    return { success: true, message: 'Contact page cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate contact path:', error)
    return { success: false, message: 'Failed to refresh Contact page cache.' }
  }
}

export async function revalidateFaqPath() {
  try {
    revalidatePath('/faq')
    return { success: true, message: 'FAQ page cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate faq path:', error)
    return { success: false, message: 'Failed to refresh FAQ page cache.' }
  }
}

export async function revalidateKnowledgecenterPath() {
  try {
    revalidatePath('/knowledgecenter')
    return { success: true, message: 'Knowledge Center page cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate knowledgecenter path:', error)
    return { success: false, message: 'Failed to refresh Knowledge Center page cache.' }
  }
}

export async function revalidateMediaroomPath() {
  try {
    revalidatePath('/media-room')
    return { success: true, message: 'Media Room page cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate media-room path:', error)
    return { success: false, message: 'Failed to refresh Media Room page cache.' }
  }
}

export async function revalidateProductsPath() {
  try {
    revalidatePath('/products')
    return { success: true, message: 'Products page cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate products path:', error)
    return { success: false, message: 'Failed to refresh Products page cache.' }
  }
}

export async function revalidateResourcesPath() {
  try {
    revalidatePath('/resources')
    return { success: true, message: 'Resources page cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate resources path:', error)
    return { success: false, message: 'Failed to refresh Resources page cache.' }
  }
}

export async function revalidateSupportPath() {
  try {
    revalidatePath('/support')
    return { success: true, message: 'Support page cache has been refreshed.' }
  } catch (error) {
    console.error('Failed to revalidate support path:', error)
    return { success: false, message: 'Failed to refresh Support page cache.' }
  }
}

