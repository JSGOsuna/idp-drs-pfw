import ProductCard from "@/components/ui/ProductCard"
import { getProductsByCategorySlug, getCategoryBySlug } from "@/src/lib/catalog"
import { notFound } from "next/navigation"

async function getProducts(category:string) {
  return getProductsByCategorySlug(category)
}
export default async function OrderPage({params}: {params: Promise<{category:string}>}) {
  const { category } = await params
  const categoryData = getCategoryBySlug(category)

  if (!categoryData) {
    notFound()
  }

  const products = await getProducts(category)
  return (
<>
    <h1 className="text-2xl my-10">
      {categoryData.name}
    </h1>
    <div className="custom-scrollbar overflow-y-auto max-h-[70vh] pr-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
      {products.map( product =>(
        <ProductCard
          key={product.id}
          product={product}
        />
      )

      )}
      </div>
    </div>
    </>
  )
}