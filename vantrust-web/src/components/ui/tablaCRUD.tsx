"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface GenericData {
  id: number | string;
  [key: string]: unknown;
}

interface TablaCRUDProps {
  data?: GenericData[];
  titulo?: string;
}

export default function TablaCRUD({ data = [], titulo = "Tabla Dinámica" }: TablaCRUDProps) {
  const [items, setItems] = useState<GenericData[]>(data);
  const [nextId, setNextId] = useState(data.length + 1);
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<GenericData>({ id: nextId });

  const getColumns = () => {
    if (items.length === 0) return [];
    return Object.keys(items[0]).filter((key) => key !== "id");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setItems((prev) => prev.map((item) => (item.id === editingId ? { ...item, ...formData } : item)));
      setEditingId(null);
    } else {
      setItems((prev) => [...prev, { ...formData, id: nextId }]);
      setNextId((prev) => prev + 1);
    }
    setFormData({ id: nextId });
    setIsDialogOpen(false);
  };

  const handleEdit = (item: GenericData) => {
    setFormData(item);
    setEditingId(item.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number | string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenDialog = () => {
    setFormData({ id: nextId });
    setEditingId(null);
    setIsDialogOpen(true);
  };

  const formatValue = (value: unknown): string => {
    if (value instanceof Date || (typeof value === "string" && !isNaN(Date.parse(value)))) {
      return new Date(value).toLocaleDateString("es-ES");
    }
    if (typeof value === "number") {
      return value.toLocaleString("es-ES");
    }
    if (typeof value === "string") {
      return value;
    }
    return "";
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>{titulo}</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenDialog}>Agregar Registro</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingId ? "Editar Registro" : "Agregar Nuevo Registro"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                {getColumns().map((column) => (
                  <div key={column} className="space-y-2">
                    <Label htmlFor={column}>{column}</Label>
                    <Input
                      id={column}
                      name={column}
                      value={typeof formData[column] === "string" ? (formData[column] as string) : ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                ))}
                <Button type="submit">{editingId ? "Actualizar" : "Agregar"}</Button>
              </form>
            </DialogContent>
          </Dialog>

          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                {getColumns().map((column) => (
                  <TableHead key={column}>{column}</TableHead>
                ))}
                <TableHead className="w-[100px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  {getColumns().map((column) => (
                    <TableCell key={`${item.id}-${column}`}>
                      {formatValue(item[column])}
                    </TableCell>
                  ))}
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => handleEdit(item)} className="mr-2">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Editar registro</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Eliminar registro</p>
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
  );
}
