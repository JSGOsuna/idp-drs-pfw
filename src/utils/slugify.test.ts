import { describe, it, expect } from 'vitest'
import { slugify } from '@/src/utils/slugify'

describe('slugify', () => {
  it('remueve acentos y espacios', () => {
    expect(slugify('Canción Éxito')).toBe('cancion-exito')
  })

  it('reemplaza caracteres no alfanuméricos y recorta', () => {
    expect(slugify('  Hello, World!  ')).toBe('hello-world')
  })

  it('maneja string vacío', () => {
    expect(slugify('')).toBe('')
  })
})
