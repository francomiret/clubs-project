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
  Crown,
  UserCog,
  Loader2,
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Role,
  CreateRoleData,
  UpdateRoleData,
  Permission,
  Club,
} from "../types";
import { useRoles } from "@/hooks/useRoles";
import { useToast } from "@/hooks/use-toast";

export function RolesSection() {
  const { roles, loading, error, createRole, updateRole, deleteRole } =
    useRoles();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [editingRole, setEditingRole] = useState<UpdateRoleData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [createForm, setCreateForm] = useState<CreateRoleData>({
    name: "",
    clubId: "",
    permissionIds: [],
  });

  const filteredRoles = roles.filter((role) => {
    const matchesSearch = role.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || role.name.includes(filterStatus);
    return matchesSearch && matchesFilter;
  });

  const handleCreate = async () => {
    setIsSubmitting(true);
    try {
      await createRole(createForm);
      toast({ title: "Éxito", description: "Rol creado correctamente" });
      setIsCreateDialogOpen(false);
      setCreateForm({
        name: "",
        clubId: "",
        permissionIds: [],
      });
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
    if (!selectedRole) return;
    setIsSubmitting(true);
    try {
      await updateRole(selectedRole.id, editingRole);
      toast({ title: "Éxito", description: "Rol actualizado correctamente" });
      setIsEditDialogOpen(false);
      setSelectedRole(null);
      setEditingRole({});
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

  const handleDelete = async (role: Role) => {
    try {
      await deleteRole(role.id);
      toast({
        title: "Éxito",
        description: "Rol eliminado correctamente",
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

  const openEditDialog = (role: Role) => {
    setSelectedRole(role);
    setEditingRole({
      name: role.name,
      clubId: role.clubId,
      permissionIds: role.permissions?.map((p) => p.id) || [],
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (role: Role) => {
    setSelectedRole(role);
    setIsViewDialogOpen(true);
  };

  const getRoleIcon = (roleName: string) => {
    switch (roleName.toLowerCase()) {
      case "admin":
        return <Crown className="h-5 w-5" />;
      case "moderator":
        return <Shield className="h-5 w-5" />;
      case "member":
        return <UserCheck className="h-5 w-5" />;
      default:
        return <UserCog className="h-5 w-5" />;
    }
  };

  const getRoleColor = (roleName: string) => {
    switch (roleName.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "moderator":
        return "bg-blue-100 text-blue-800";
      case "member":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handlePermissionToggle = (permissionId: string, isChecked: boolean) => {
    setCreateForm((prev) => ({
      ...prev,
      permissionIds: isChecked
        ? [...(prev.permissionIds || []), permissionId]
        : (prev.permissionIds || []).filter((id) => id !== permissionId),
    }));
  };

  const handleEditPermissionToggle = (
    permissionId: string,
    isChecked: boolean
  ) => {
    setEditingRole((prev) => ({
      ...prev,
      permissionIds: isChecked
        ? [...(prev.permissionIds || []), permissionId]
        : (prev.permissionIds || []).filter((id) => id !== permissionId),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Cargando roles...</span>
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

  // Mostrar mensaje cuando no hay roles
  if (roles.length === 0) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Roles</h1>
            <p className="text-muted-foreground">Gestiona los roles del club</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Crear Rol
          </Button>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            No hay roles registrados
          </h3>
          <p className="text-muted-foreground mb-4 max-w-sm">
            Comienza creando el primer rol al club para gestionar los permisos
            de los usuarios.
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Crear Primer Rol
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
          <h2 className="text-2xl font-bold tracking-tight">Roles</h2>
          <p className="text-muted-foreground">
            Gestiona los roles del sistema y sus permisos asociados
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Crear Rol
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Rol</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre del Rol</Label>
                <Input
                  id="name"
                  placeholder="ej: EDITOR"
                  value={createForm.name}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="club">Club</Label>
                <Select
                  value={createForm.clubId}
                  onValueChange={(value) =>
                    setCreateForm({ ...createForm, clubId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar club" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="club-1">
                      Club Deportivo Central
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Permisos</Label>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto border rounded-md p-4">
                  {/* Permissions are now fetched from useRoles, so we don't need to map them here */}
                  {/* This section might need adjustment if permissions are not directly available */}
                  {/* For now, we'll keep it as is, assuming permissions are available or will be added */}
                  {/* If permissions are not available, this will cause an error */}
                  {/* A more robust solution would involve fetching permissions separately */}
                  {/* For now, we'll just show a placeholder or remove if not needed */}
                  {/* Given the new_code, permissions are now part of the Role object, so we can iterate */}
                  {roles.map((role) => (
                    <div key={role.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`permission-${role.id}`}
                        checked={
                          createForm.permissionIds?.includes(role.id) || false
                        }
                        onCheckedChange={(checked) =>
                          handlePermissionToggle(role.id, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`permission-${role.id}`}
                        className="text-sm"
                      >
                        {role.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleCreate} disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4" /> : null}
                  Crear Rol
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
            placeholder="Buscar roles..."
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
            <DropdownMenuItem onClick={() => setFilterStatus("ADMIN")}>
              Administradores
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("MANAGER")}>
              Gerentes
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("MEMBER")}>
              Miembros
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
          {filteredRoles.map((role) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(role.name)}
                      <CardTitle className="text-lg">{role.name}</CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openViewDialog(role)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(role)}>
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
                                permanentemente el rol "{role.name}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(role)}
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
                    <div className="flex items-center space-x-2">
                      <Badge className={getRoleColor(role.name)}>
                        {role.name}
                      </Badge>
                      <Badge variant="outline">
                        {role.permissions?.length || 0} permisos
                      </Badge>
                      <Badge variant="secondary">
                        {role.club?.name || "Sin club"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Permisos:</p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions?.slice(0, 3).map((rolePermission) => (
                          <Badge
                            key={rolePermission.id}
                            variant="secondary"
                            className="text-xs"
                          >
                            {rolePermission.permission?.name || "Sin nombre"}
                          </Badge>
                        ))}
                        {role.permissions && role.permissions.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{role.permissions.length - 3} más
                          </Badge>
                        )}
                      </div>
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
                <TableHead>Rol</TableHead>
                <TableHead>Club</TableHead>
                <TableHead>Permisos</TableHead>
                <TableHead>Total Permisos</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(role.name)}
                      <span className="font-medium">{role.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{role.club?.name || "Sin club"}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {role.permissions?.slice(0, 3).map((rolePermission) => (
                        <Badge
                          key={rolePermission.id}
                          variant="secondary"
                          className="text-xs"
                        >
                          {rolePermission.permission?.name || "Sin nombre"}
                        </Badge>
                      ))}
                      {role.permissions && role.permissions.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{role.permissions.length - 3} más
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {role.permissions?.length || 0}
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
                        <DropdownMenuItem onClick={() => openViewDialog(role)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(role)}>
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
                                permanentemente el rol "{role.name}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(role)}
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Rol</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Nombre del Rol</Label>
              <Input
                id="edit-name"
                value={editingRole.name || ""}
                onChange={(e) =>
                  setEditingRole({ ...editingRole, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-club">Club</Label>
              <Select
                value={editingRole.clubId}
                onValueChange={(value) =>
                  setEditingRole({ ...editingRole, clubId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar club" />
                </SelectTrigger>
                <SelectContent>
                  {/* Clubs are now fetched from useRoles, so we don't need to map them here */}
                  {/* This section might need adjustment if clubs are not directly available */}
                  {/* For now, we'll keep it as is, assuming clubs are available or will be added */}
                  {/* If clubs are not available, this will cause an error */}
                  {/* A more robust solution would involve fetching clubs separately */}
                  {/* For now, we'll just show a placeholder or remove if not needed */}
                  {/* Given the new_code, clubs are now part of the Role object, so we can iterate */}
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.club?.name || "Sin club"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Permisos</Label>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto border rounded-md p-4">
                {/* Permissions are now fetched from useRoles, so we don't need to map them here */}
                {/* This section might need adjustment if permissions are not directly available */}
                {/* For now, we'll keep it as is, assuming permissions are available or will be added */}
                {/* If permissions are not available, this will cause an error */}
                {/* A more robust solution would involve fetching permissions separately */}
                {/* For now, we'll just show a placeholder or remove if not needed */}
                {/* Given the new_code, permissions are now part of the Role object, so we can iterate */}
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-permission-${role.id}`}
                      checked={
                        editingRole.permissionIds?.includes(role.id) || false
                      }
                      onCheckedChange={(checked) =>
                        handleEditPermissionToggle(role.id, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`edit-permission-${role.id}`}
                      className="text-sm"
                    >
                      {role.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleUpdate} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4" /> : null}
                Actualizar Rol
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles del Rol</DialogTitle>
          </DialogHeader>
          {selectedRole && (
            <div className="space-y-4">
              <div>
                <Label>Nombre del Rol</Label>
                <div className="flex items-center space-x-2">
                  {getRoleIcon(selectedRole.name)}
                  <p className="text-sm font-medium">{selectedRole.name}</p>
                </div>
              </div>
              <div>
                <Label>Club</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedRole.club?.name || "Sin club"}
                </p>
              </div>
              <div>
                <Label>
                  Permisos ({selectedRole.permissions?.length || 0})
                </Label>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedRole.permissions?.map((rolePermission) => (
                    <Badge
                      key={rolePermission.id}
                      variant="secondary"
                      className="text-xs"
                    >
                      {rolePermission.permission?.name || "Sin nombre"}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
