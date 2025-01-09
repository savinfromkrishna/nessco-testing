
interface Product {
  id: string
  name: string
  avatar: string
}

async function getProducts() {
  const res = await fetch('https://677df07d94bde1c12529cc71.mockapi.io/api/v1/products/products', 
    { next: {revalidate:36000, tags: ['home'] } }
  )
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  return res.json()
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="py-32">
      <div className="bg-white shadow-md  rounded-lg overflow-hidden">
     
      <div className="p-4">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-600">ID: {product.id}</p>
      </div>
    </div>
    </div>
  )
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

