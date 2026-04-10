import type { CatalogProduct } from "@/src/lib/catalog";

export type OrderItem = Pick<CatalogProduct, 'id' | 'name' | 'price'> & {
    quantity: number
    subtotal: number
}