import { create } from 'zustand'
import { OrderItem } from './types'
import type { CatalogProduct } from '@/src/lib/catalog'

interface Store {
    order: OrderItem[]
    addToOrder: (product: CatalogProduct) => void
    increseQuantity: (id: CatalogProduct['id']) => void
    decreaseQuantity: (id: CatalogProduct['id']) => void
    removeItem: (id: CatalogProduct['id']) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {
        
        const {categoryId, image, ...data} = product
        let order : OrderItem[] = []
        if(get().order.find( item => item.id === product.id )) {
            order = get().order.map( item => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity)
            } : item )
        
        } else { 
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }

        set(() => ({ 
            order 
        }) )
    },
    increseQuantity: (id) => {
        set((state) => ({
            order: state.order.map( item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item )
        }))
    },
    decreaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map( item => item.id === id ? {
                ...item,
                quantity: item.quantity - 1,
                subtotal: item.price * (item.quantity - 1)
            } : item )
        }))
    },
    removeItem: (id) => {
        set((state) => ({
            order: state.order.filter( item => item.id !== id )
        }))
    },
    clearOrder: () => {
        set(() => ({ order: [] }))
    }
}))    