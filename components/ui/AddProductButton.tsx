"use client"

import type { CatalogProduct } from "@/src/lib/catalog"
import { useStore } from "@/src/store"

type AddProductButtonProps = {
    product: CatalogProduct
}

export default function AddProductButton({product}: AddProductButtonProps) {
    const addToOrder = useStore((state) => state.addToOrder)

    return (
        <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
            onClick={() => addToOrder(product)}>
            Agregar
        </button>
    )
}