'use client'
    
import { useEffect, useState } from 'react'
import TablaCRUD from '@/components/ui/tablaCRUD'
import Header from '@/components/ui/header'
import Footer from '@/components/ui/footer'

export default function DinamicTablePage() {
  // Estado para almacenar los datos del JSON
  const [datos, setDatos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Función para cargar los datos del JSON
    const cargarDatos = async () => {
      try {
        const response = await fetch('/RV OTROS.json')  // la carpeta en public
        const data = await response.json()
        setDatos(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error al cargar los datos:', error)
        setIsLoading(false)
      }
    }

    cargarDatos()
  }, [])

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Fondo animado con burbujitas */}
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
        {isLoading ? (
          <div>Cargando datos...</div>
        ) : (
          <div className="w-full max-w-7xl mx-auto px-4">
            <TablaCRUD data={datos} titulo="RV OTROS" />
          </div>
        )}
      </div>
            
      <Footer />
    </div>
  )
}