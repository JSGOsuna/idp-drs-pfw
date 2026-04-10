import { catalogCategories } from "@/src/lib/catalog"
import CategoryIcon from "../ui/CategoryIcon"

async function getCategories(){
  return catalogCategories
}

const OrderSidebar = async () => {
  const categories = await getCategories()
  return (
    <aside className="w-full bg-white/90 border-b shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3 flex items-center gap-3 overflow-x-auto">
          {categories.map(category => (
            <CategoryIcon 
              key={category.id}
              category={category}
            />
          ))}
        </nav>
    </aside>
  )
}

export default OrderSidebar