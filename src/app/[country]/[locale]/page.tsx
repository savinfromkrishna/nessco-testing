import { fetchProducts } from '@/hooks/fetchProduct'
import Link from 'next/link'

export default async function Home() {
  const products = await fetchProducts()

  return (
    <div className="container py-32 px-16 mx-auto p-4">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product: any) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-sm text-gray-500">{product.subheader}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

