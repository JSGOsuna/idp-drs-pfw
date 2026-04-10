import type { CatalogCategory } from '@/src/lib/catalog'
import Image from "next/image"
import Link from "next/link"

type CategoryIconProps = {
  category: CatalogCategory
}
export default function CategoryIcon({category}:CategoryIconProps) {
  return (
    <Link className="flex items-center gap-4 border-t border-gray-200 last-of-type:border-b hover:bg-gray-300 px-6 py-4 cursor-pointer" href={`/order/${category.slug}`}>
        <div className="w-16 h-16 relative">
          <Image
            fill
            src={`/icon_${category.slug}.svg`}
            alt="Imagen Categoria"
          />
        </div>
       {category.name}
    </Link>
  )
}