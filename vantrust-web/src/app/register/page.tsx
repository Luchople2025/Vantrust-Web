'use client'

import Header from '@/components/ui/header'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    rut: '',
    fechaNacimiento: '',
    telefono: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [aceptaTerminos, setAceptaTerminos] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validaciones
    if (Object.values(formData).some(value => !value)) {
      setError('Por favor complete todos los campos')
      return
    }

    if (!validarRut(formData.rut)) {
      setError('RUT inválido')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (!aceptaTerminos) {
      setError('Debe aceptar los términos y condiciones')
      return
    }

    console.log('Registro con:', formData)
  }

  // Función para validar RUT chileno
  const validarRut = (rut: string) => {
    // Implementar validación de RUT
    if (!rut) return false;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Fondo animado */}
      <div 
        className="absolute inset-0 -z-10 w-full h-full"
        style={{
          backgroundImage: 'url("/Animated Shape.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <Header />
      <div className="flex-1 flex items-center justify-center py-8">
        
        <Card className="w-full max-w-md mx-4 bg-white/95 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Crear Cuenta</CardTitle>
            <CardDescription className="text-center">
              Complete sus datos para registrarse
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Nombres */}
              <div className="space-y-2">
                <Label htmlFor="nombres">Nombres</Label>
                <Input
                  id="nombres"
                  name="nombres"
                  type="text"
                  placeholder="Ingrese sus nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  required
                  className="bg-white/70 backdrop-blur-sm"
                />
              </div>

              {/* Apellidos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="apellidoPaterno">Apellido Paterno</Label>
                  <Input
                    id="apellidoPaterno"
                    name="apellidoPaterno"
                    type="text"
                    placeholder="Primer apellido"
                    value={formData.apellidoPaterno}
                    onChange={handleChange}
                    required
                    className="bg-white/70 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellidoMaterno">Apellido Materno</Label>
                  <Input
                    id="apellidoMaterno"
                    name="apellidoMaterno"
                    type="text"
                    placeholder="Segundo apellido"
                    value={formData.apellidoMaterno}
                    onChange={handleChange}
                    required
                    className="bg-white/70 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* RUT */}
              <div className="space-y-2">
                <Label htmlFor="rut">RUT</Label>
                <Input
                  id="rut"
                  name="rut"
                  type="text"
                  placeholder="12.345.678-9"
                  value={formData.rut}
                  onChange={handleChange}
                  required
                  className="bg-white/70 backdrop-blur-sm"
                />
              </div>

              {/* Fecha de Nacimiento */}
              <div className="space-y-2">
                <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                <Input
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  required
                  className="bg-white/70 backdrop-blur-sm"
                />
              </div>

              {/* Teléfono */}
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="+56 9 1234 5678"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="bg-white/70 backdrop-blur-sm"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nombre@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white/70 backdrop-blur-sm"
                />
              </div>

              {/* Contraseña */}
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="bg-white/70 backdrop-blur-sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Confirmar Contraseña */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="bg-white/70 backdrop-blur-sm"
                />
              </div>

              {/* Términos y Condiciones */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terminos" 
                  checked={aceptaTerminos}
                  onCheckedChange={(checked) => setAceptaTerminos(checked as boolean)}
                />
                <label
                  htmlFor="terminos"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Acepto los términos y condiciones
                </label>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full">
                Crear Cuenta
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                ¿Ya tienes una cuenta? {' '}
                <Link href="/login" className="text-primary hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}