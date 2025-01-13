"use client"

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import Header from '@/components/ui/header'
import Footer from "@/components/ui/footer"


/* Interfaz Cliente, crear obj*/

interface Cliente {
  ID_CLIENTE: number
  IDENTIFICADOR_CLIENTE: number
  NOMBRE: string
  FECHA_ASIGNACION: string
  COMISION: number
  ID_ASESOR: number
}

export default function ClienteCRUDTable() {
  const [clientes, setClientes] = useState<Cliente[]>([
    { ID_CLIENTE: 1, IDENTIFICADOR_CLIENTE: 101, NOMBRE: "John Doe", FECHA_ASIGNACION: "2023-01-15", COMISION: 500, ID_ASESOR: 201 },
    { ID_CLIENTE: 2, IDENTIFICADOR_CLIENTE: 102, NOMBRE: "Jane Smith", FECHA_ASIGNACION: "2023-02-20", COMISION: 750, ID_ASESOR: 202 },
  ])

  const [nextId, setNextId] = useState(3) //**Controla el próximo ID único con +1

  const [formData, setFormData] = useState<Cliente>({
    ID_CLIENTE: 0,
    IDENTIFICADOR_CLIENTE: 0,
    NOMBRE: "",
    FECHA_ASIGNACION: "",
    COMISION: 0,
    ID_ASESOR: 0
  })

  const [editingId, setEditingId] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === "COMISION" || name === "IDENTIFICADOR_CLIENTE" || name === "ID_ASESOR" 
        ? Number(value)
        : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setClientes(prev =>
        prev.map(cliente =>
          cliente.ID_CLIENTE === editingId ? { ...cliente, ...formData } : cliente
        )
      )
      setEditingId(null)
    } else {
      setClientes(prev => [...prev, { ...formData, ID_CLIENTE: nextId }])
      setNextId(prev => prev + 1) // Incrementa el próximo ID
    }
    setFormData({
      ID_CLIENTE: 0,
      IDENTIFICADOR_CLIENTE: 0,
      NOMBRE: "",
      FECHA_ASIGNACION: "",
      COMISION: 0,
      ID_ASESOR: 0
    })
    setIsDialogOpen(false)
  }

  const handleEdit = (cliente: Cliente) => {
    setFormData(cliente)
    setEditingId(cliente.ID_CLIENTE)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setClientes(prev => prev.filter(cliente => cliente.ID_CLIENTE !== id))
  }

  const handleOpenDialog = () => {
    setFormData({
      ID_CLIENTE: 0,
      IDENTIFICADOR_CLIENTE: 0,
      NOMBRE: "",
      FECHA_ASIGNACION: "",
      COMISION: 0,
      ID_ASESOR: 0
    })
    setEditingId(null)
    setIsDialogOpen(true)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount)
  }

  return (

    /*componente de header */
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">

        
        <Card className="w-full max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle>Gestión de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleOpenDialog}>Agregar Cliente</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingId ? "Editar Cliente" : "Agregar Nuevo Cliente"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="IDENTIFICADOR_CLIENTE">Identificador</Label>
                    <Input
                      id="IDENTIFICADOR_CLIENTE"
                      type="number"
                      name="IDENTIFICADOR_CLIENTE"
                      value={formData.IDENTIFICADOR_CLIENTE}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="NOMBRE">Nombre</Label>
                    <Input
                      id="NOMBRE"
                      type="text"
                      name="NOMBRE"
                      value={formData.NOMBRE}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="FECHA_ASIGNACION">Fecha de Asignación</Label>
                    <Input
                      id="FECHA_ASIGNACION"
                      type="date"
                      name="FECHA_ASIGNACION"
                      value={formData.FECHA_ASIGNACION}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="COMISION">Comisión</Label>
                    <Input
                      id="COMISION"
                      type="number"
                      name="COMISION"
                      value={formData.COMISION}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ID_ASESOR">ID Asesor</Label>
                    <Input
                      id="ID_ASESOR"
                      type="number"
                      name="ID_ASESOR"
                      value={formData.ID_ASESOR}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit">
                    {editingId ? "Actualizar" : "Agregar"} Cliente
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Identificador</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Fecha Asignación</TableHead>
                  <TableHead>Comisión</TableHead>
                  <TableHead>ID Asesor</TableHead>
                  <TableHead className="w-[100px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientes.map((cliente) => (
                  <TableRow key={cliente.ID_CLIENTE}>
                    <TableCell>{cliente.ID_CLIENTE}</TableCell>
                    <TableCell>{cliente.IDENTIFICADOR_CLIENTE}</TableCell>
                    <TableCell>{cliente.NOMBRE}</TableCell>
                    <TableCell>{formatDate(cliente.FECHA_ASIGNACION)}</TableCell>
                    <TableCell>{formatCurrency(cliente.COMISION)}</TableCell>
                    <TableCell>{cliente.ID_ASESOR}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => handleEdit(cliente)} 
                              className="mr-2"
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Editar cliente</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              onClick={() => handleDelete(cliente.ID_CLIENTE)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Eliminar cliente</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <Footer>
      </Footer>
    </div>

    
  )
}
