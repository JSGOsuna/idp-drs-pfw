import { categories } from '@/prisma/data/categories'
import { employees } from '@/prisma/data/employees'
import { products } from '@/prisma/data/products'

export type CatalogCategory = {
  id: number
  name: string
  slug: string
}

export type CatalogProduct = {
  id: number
  name: string
  price: number
  image: string
  categoryId: number
}

export type CatalogEmployee = {
  id: number
  name: string
  password: string
}

export const catalogCategories: CatalogCategory[] = categories.map((category, index) => ({
  id: index + 1,
  ...category,
}))

export const catalogProducts: CatalogProduct[] = products.map((product, index) => ({
  id: index + 1,
  ...product,
}))

export const catalogEmployees: CatalogEmployee[] = employees.map((employee, index) => ({
  id: index + 1,
  ...employee,
}))

export function getCategoryBySlug(slug: string) {
  return catalogCategories.find((category) => category.slug === slug)
}

export function getProductsByCategorySlug(slug: string) {
  const category = getCategoryBySlug(slug)

  if (!category) {
    return [] as CatalogProduct[]
  }

  return catalogProducts.filter((product) => product.categoryId === category.id)
}

export function findEmployeeByName(name: string) {
  return catalogEmployees.find((employee) => employee.name === name)
}