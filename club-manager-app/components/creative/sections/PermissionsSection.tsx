import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  Edit,
  Trash2,
  Eye,
  Shield,
  MoreHorizontal,
  UserCheck,
  Users,
  FileText,
  Settings,
  Loader2,
  Key,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Permission,
  CreatePermissionData,
  UpdatePermissionData,
} from "../types";
import { usePermissions } from "@/hooks/usePermissions";
import { useToast } from "@/hooks/use-toast";

export function PermissionsSection() {
  const {
    permissions,
    loading,
    error,
    createPermission,
    updatePermission,
    deletePermission,
  } = usePermissions();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] =
    useState<Permission | null>(null);
  const [editingPermission, setEditingPermission] =
    useState<UpdatePermissionData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [createForm, setCreateForm] = useState<CreatePermissionData>({
    name: "",
    description: "",
  });

  const filteredPermissions = permissions.filter((permission) => {
    const matchesSearch =
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || permission.name.includes(filterStatus);
    return matchesSearch && matchesFilter;
  });

  const handleCreate = async () => {
    setIsSubmitting(true);
    try {
      await createPermission(createForm);
      toast({ title: "Éxito", description: "Permiso creado correctamente" });
      setIsCreateDialogOpen(false);
      setCreateForm({ name: "", description: "" });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedPermission) return;
    setIsSubmitting(true);
    try {
      await updatePermission(selectedPermission.id, editingPermission);
      toast({
        title: "Éxito",
        description: "Permiso actualizado correctamente",
      });
      setIsEditDialogOpen(false);
      setSelectedPermission(null);
      setEditingPermission({});
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (permission: Permission) => {
    try {
      await deletePermission(permission.id);
      toast({
        title: "Éxito",
        description: "Permiso eliminado correctamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (permission: Permission) => {
    setSelectedPermission(permission);
    setEditingPermission({
      name: permission.name,
      description: permission.description,
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsViewDialogOpen(true);
  };

  const getPermissionIcon = (permissionName: string) => {
    if (permissionName.includes("read")) return <Eye className="h-4 w-4" />;
    if (permissionName.includes("write"))
      return <FileText className="h-4 w-4" />;
    if (permissionName.includes("delete"))
      return <Trash2 className="h-4 w-4" />;
    if (permissionName.includes("admin")) return <Shield className="h-4 w-4" />;
    return <Settings className="h-4 w-4" />;
  };

  const getPermissionCategory = (permissionName: string) => {
    if (permissionName.includes("user")) return "Usuarios";
    if (permissionName.includes("role")) return "Roles";
    if (permissionName.includes("permission")) return "Permisos";
    if (permissionName.includes("club")) return "Clubes";
    if (permissionName.includes("member")) return "Miembros";
    if (permissionName.includes("sponsor")) return "Sponsors";
    if (permissionName.includes("payment")) return "Pagos";
    return "General";
  };

  const getPermissionAction = (permissionName: string) => {
    if (permissionName.includes("read")) return "Lectura";
    if (permissionName.includes("write")) return "Escritura";
    if (permissionName.includes("delete")) return "Eliminación";
    if (permissionName.includes("create")) return "Creación";
    if (permissionName.includes("update")) return "Actualización";
    return "Acción";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Cargando permisos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      </div>
    );
  }

  // Mostrar mensaje cuando no hay permisos
  if (permissions.length === 0) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Permisos</h1>
            <p className="text-muted-foreground">
              Gestiona los permisos del sistema
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Crear Permiso
          </Button>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Key className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            No hay permisos registrados
          </h3>
          <p className="text-muted-foreground mb-4 max-w-sm">
            Comienza creando el primer permiso del sistema para gestionar el
            acceso a las funcionalidades.
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Crear Primer Permiso
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Permisos</h2>
          <p className="text-muted-foreground">
            Gestiona los permisos del sistema para controlar el acceso a las
            funcionalidades
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Crear Permiso
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Permiso</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre del Permiso</Label>
                <Input
                  id="name"
                  placeholder="ej: users.create"
                  value={createForm.name}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Descripción del permiso..."
                  value={createForm.description}
                  onChange={(e) =>
                    setCreateForm({
                      ...createForm,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleCreate} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Crear Permiso
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar permisos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterStatus("all")}>
              Todos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("users")}>
              Usuarios
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("members")}>
              Miembros
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("roles")}>
              Roles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("permissions")}>
              Permisos
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "cards" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("cards")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("table")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPermissions.map((permission) => (
            <motion.div
              key={permission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getPermissionIcon(permission.name)}
                      <CardTitle className="text-lg">
                        {permission.name}
                      </CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => openViewDialog(permission)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openEditDialog(permission)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                ¿Estás seguro?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará
                                permanentemente el permiso "{permission.name}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(permission)}
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {permission.description || "Sin descripción"}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">
                        {getPermissionCategory(permission.name)}
                      </Badge>
                      <Badge variant="outline">
                        {getPermissionAction(permission.name)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Permiso</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Acción</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPermissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getPermissionIcon(permission.name)}
                      <span className="font-medium">{permission.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {permission.description || "Sin descripción"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {getPermissionCategory(permission.name)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getPermissionAction(permission.name)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => openViewDialog(permission)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openEditDialog(permission)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                ¿Estás seguro?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará
                                permanentemente el permiso "{permission.name}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(permission)}
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Permiso</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Nombre del Permiso</Label>
              <Input
                id="edit-name"
                value={editingPermission.name || ""}
                onChange={(e) =>
                  setEditingPermission({
                    ...editingPermission,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Descripción</Label>
              <Textarea
                id="edit-description"
                value={editingPermission.description || ""}
                onChange={(e) =>
                  setEditingPermission({
                    ...editingPermission,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleUpdate} disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Actualizar Permiso
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles del Permiso</DialogTitle>
          </DialogHeader>
          {selectedPermission && (
            <div className="space-y-4">
              <div>
                <Label>Nombre del Permiso</Label>
                <p className="text-sm font-medium">{selectedPermission.name}</p>
              </div>
              <div>
                <Label>Descripción</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedPermission.description || "Sin descripción"}
                </p>
              </div>
              <div>
                <Label>Categoría</Label>
                <Badge variant="secondary">
                  {getPermissionCategory(selectedPermission.name)}
                </Badge>
              </div>
              <div>
                <Label>Acción</Label>
                <Badge variant="outline">
                  {getPermissionAction(selectedPermission.name)}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
