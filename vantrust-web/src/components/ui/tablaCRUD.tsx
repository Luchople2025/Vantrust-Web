"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface User {
  ID_CLIENTE: number
  IDENTIFICADOR_CLIENTE: number
  NOMBRE: string
  FECHA_ASIGNACION: string
  COMISION: number
  ID_ASESOR: number
}

interface UserCRUDTableProps {
  initialData: User[]
}

export default function UserCRUDTable({ initialData }: UserCRUDTableProps) {
  const [users, setUsers] = useState<User[]>([])
  const [formData, setFormData] = useState<User>({
    ID_CLIENTE: 0,
    IDENTIFICADOR_CLIENTE: 0,
    NOMBRE: "",
    FECHA_ASIGNACION: "",
    COMISION: 0,
    ID_ASESOR: 0
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    setUsers(initialData)
  }, [initialData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: name === "COMISION" || name === "ID_ASESOR" || name === "IDENTIFICADOR_CLIENTE" ? parseInt(value) : value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setUsers((prev) =>
        prev.map((user) =>
          user.ID_CLIENTE === editingId ? { ...user, ...formData } : user
        )
      )
      setEditingId(null)
    } else {
      setUsers((prev) => [...prev, { ...formData, ID_CLIENTE: Date.now() }])
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

  const handleEdit = (user: User) => {
    setFormData(user)
    setEditingId(user.ID_CLIENTE)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.ID_CLIENTE !== id))
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

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>User CRUD Table</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenDialog}>Add User</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit User" : "Add New User"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="IDENTIFICADOR_CLIENTE">IDENTIFICADOR_CLIENTE</Label>
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
                <Label htmlFor="NOMBRE">NOMBRE</Label>
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
                <Label htmlFor="FECHA_ASIGNACION">FECHA_ASIGNACION</Label>
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
                <Label htmlFor="COMISION">COMISION</Label>
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
                <Label htmlFor="ID_ASESOR">ID_ASESOR</Label>
                <Input
                  id="ID_ASESOR"
                  type="number"
                  name="ID_ASESOR"
                  value={formData.ID_ASESOR}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit">{editingId ? "Update" : "Add"} User</Button>
            </form>
          </DialogContent>
        </Dialog>

        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>ID_CLIENTE</TableHead>
              <TableHead>IDENTIFICADOR_CLIENTE</TableHead>
              <TableHead>NOMBRE</TableHead>
              <TableHead>FECHA_ASIGNACION</TableHead>
              <TableHead>COMISION</TableHead>
              <TableHead>ID_ASESOR</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.ID_CLIENTE}>
                <TableCell>{user.ID_CLIENTE}</TableCell>
                <TableCell>{user.IDENTIFICADOR_CLIENTE}</TableCell>
                <TableCell>{user.NOMBRE}</TableCell>
                <TableCell>{user.FECHA_ASIGNACION}</TableCell>
                <TableCell>{user.COMISION}</TableCell>
                <TableCell>{user.ID_ASESOR}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => handleEdit(user)} className="mr-2">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit user</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(user.ID_CLIENTE)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete user</p>
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
  )
}

