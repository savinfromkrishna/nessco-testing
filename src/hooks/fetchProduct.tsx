export async function fetchProducts() {
    const res = await fetch('https://677df07d94bde1c12529cc71.mockapi.io/api/v1/products/products', {
      next: { tags: ['products'] }
    })
  
    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }
  
    return res.json()
  }
  
  