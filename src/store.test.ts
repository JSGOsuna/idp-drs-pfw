import { describe, it, expect, beforeEach } from 'vitest'
import { useStore } from './store'
import { catalogProducts } from './lib/catalog'

beforeEach(() => {
  // reset store state before each test
  useStore.setState({ order: [] })
})

describe('store (Zustand)', () => {
  it('agrega producto al pedido', () => {
    const product = catalogProducts[0]
    useStore.getState().addToOrder(product as any)
    const order = useStore.getState().order
    expect(order.length).toBe(1)
    expect(order[0].id).toBe(product.id)
    expect(order[0].quantity).toBe(1)
  })

  it('incrementa y decrementa cantidad', () => {
    const product = catalogProducts[0]
    useStore.getState().addToOrder(product as any)
    useStore.getState().increseQuantity(product.id)
    let item = useStore.getState().order.find(i => i.id === product.id)!
    expect(item.quantity).toBe(2)

    useStore.getState().decreaseQuantity(product.id)
    item = useStore.getState().order.find(i => i.id === product.id)!
    expect(item.quantity).toBe(1)
  })

  it('remueve item y limpia pedido', () => {
    const product = catalogProducts[0]
    useStore.getState().addToOrder(product as any)
    useStore.getState().removeItem(product.id)
    expect(useStore.getState().order.length).toBe(0)

    useStore.getState().addToOrder(product as any)
    useStore.getState().clearOrder()
    expect(useStore.getState().order.length).toBe(0)
  })
})
