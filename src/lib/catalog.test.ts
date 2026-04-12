import { describe, it, expect } from 'vitest'
import { getCategoryBySlug, getProductsByCategorySlug, findEmployeeByName, catalogProducts } from './catalog'

describe('catalog helpers', () => {
  it('obtiene categoria por slug', () => {
    const cat = getCategoryBySlug('guitarra')
    expect(cat).toBeDefined()
    expect(cat?.slug).toBe('guitarra')
  })

  it('obtiene productos por slug de categoria', () => {
    const products = getProductsByCategorySlug('guitarra')
    expect(Array.isArray(products)).toBe(true)
    expect(products.length).toBeGreaterThan(0)
    // todos los productos devueltos deben pertenecer a la categoria
    const categoryId = products[0].categoryId
    products.forEach((p) => expect(p.categoryId).toBe(categoryId))
  })

  it('encuentra empleado por nombre', () => {
    const emp = findEmployeeByName('Jorge Guerrero')
    expect(emp).toBeDefined()
    expect(emp?.password).toBe('1190776')
  })
})
