import { NextResponse } from 'next/server'
import { findEmployeeByName } from '@/src/lib/catalog'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, password } = body || {}
    const userName = String(name || '').trim()
    const userPassword = String(password || '')

    if (!userName || !userPassword) {
      return NextResponse.json({ error: 'Faltan credenciales' }, { status: 400 })
    }

    const employee = findEmployeeByName(userName)

    if (!employee) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 })
    }

    // Nota: los datos de seed actual usan contraseñas en texto plano.
    // En producción debes guardar contraseñas hasheadas (bcrypt) y compararlas.
    if (employee.password !== userPassword) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 })
    }

    const payload = { id: employee.id, name: employee.name }

    // Por ahora devolvemos el empleado sin contraseña. En lugar de esto
    // deberías crear una sesión segura (NextAuth o JWT + cookie HTTP-only).
    return NextResponse.json({ ok: true, employee: payload })
  } catch (err) {
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 })
  }
}
