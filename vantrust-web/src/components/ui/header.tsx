'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Verificar si estamos en páginas de autenticación
  const isAuthPage = ['/login', '/crear-cuenta'].includes(pathname)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <img 
                src="/vnt-logo.svg" 
                alt="Vantrust Logo" 
                className="h-10 w-auto"
              />
            </Link>

            <nav className="hidden md:flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Inicio
              </Link>
              <Link href="/quienes-somos" className="text-gray-600 hover:text-gray-900">
                Servicios
              </Link>
              <Link href="/servicios" className="text-gray-600 hover:text-gray-900">
                {/*+href sin utilizar */}
              </Link>
              <Link href="/contacto" className="text-gray-600 hover:text-gray-900">
                {/* aqui igual */}
              </Link>
            </nav>
          </div>
          
          {/* Botones de autenticación - solo se muestran si no estamos en páginas de auth */}
          {!isAuthPage && (
            <div className="hidden md:flex space-x-2">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/crear-cuenta">Crear Cuenta</Link>
              </Button>
            </div>
          )}
          
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-900">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Inicio
            </Link>
            <Link href="/quienes-somos" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Quienes Somos
            </Link>
            <Link href="/servicios" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Servicios
            </Link>
            <Link href="/contacto" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Contacto
            </Link>
            {/* Botones de autenticación en móvil - solo si no estamos en páginas de auth */}
            {!isAuthPage && (
              <div className="space-y-1 pt-2">
                <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  Login
                </Link>
                <Link href="/crear-cuenta" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  Crear Cuenta
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header