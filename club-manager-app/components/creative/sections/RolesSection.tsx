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
import { roles, permissions, clubs } from "../data";

export function RolesSection() {
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [rolesData, setRolesData] = useState<Role[]>(roles);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [editingRole, setEditingRole] = useState<UpdateRoleData>({});

  // Form states
  const [createForm, setCreateForm] = useState<CreateRoleData>({
    name: "",
    clubId: "club-1",
    permissionIds: [],
  });

  const filteredRoles = rolesData.filter((role) => {
    const matchesSearch = role.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || role.name.includes(filterStatus);
    return matchesSearch && matchesFilter;
  });

  const handleCreate = () => {
    const selectedClub = clubs.find((c) => c.id === createForm.clubId);
    const newRole: Role = {
      id: Date.now().toString(),
      name: createForm.name,
      clubId: createForm.clubId,
      club: selectedClub,
      permissions:
        (createForm.permissionIds
          ?.map((permissionId, index) => {
            const permission = permissions.find((p) => p.id === permissionId);
            return permission
              ? {
                  id: `rp-${Date.now()}-${index}`,
                  roleId: Date.now().toString(),
                  permissionId: permission.id,
                  permission: permission,
                }
              : null;
          })
          .filter(Boolean) as any[]) || [],
    };
    setRolesData([...rolesData, newRole]);
    setCreateForm({ name: "", clubId: "club-1", permissionIds: [] });
    setIsCreateDialogOpen(false);
  };

  const handleUpdate = () => {
    if (!selectedRole) return;

    const selectedClub = clubs.find(
      (c) => c.id === editingRole.clubId || selectedRole.clubId
    );
    const updatedPermissions =
      (editingRole.permissionIds
        ?.map((permissionId, index) => {
          const permission = permissions.find((p) => p.id === permissionId);
          return permission
            ? {
                id: `rp-${Date.now()}-${index}`,
                roleId: selectedRole.id,
                permissionId: permission.id,
                permission: permission,
              }
            : null;
        })
        .filter(Boolean) as any[]) || selectedRole.permissions;

    const updatedRoles = rolesData.map((role) =>
      role.id === selectedRole.id
        ? {
            ...role,
            ...editingRole,
            club: selectedClub,
            permissions: updatedPermissions,
          }
        : role
    );
    setRolesData(updatedRoles);
    setEditingRole({});
    setSelectedRole(null);
    setIsEditDialogOpen(false);
  };

  const handleDelete = (role: Role) => {
    setRolesData(rolesData.filter((r) => r.id !== role.id));
  };

  const openEditDialog = (role: Role) => {
    setSelectedRole(role);
    setEditingRole({
      name: role.name,
      clubId: role.clubId,
      permissionIds: role.permissions?.map((p) => p.permissionId) || [],
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (role: Role) => {
    setSelectedRole(role);
    setIsViewDialogOpen(true);
  };

  const getRoleIcon = (roleName: string) => {
    if (roleName === "ADMIN") return <Crown className="h-4 w-4" />;
    if (roleName === "MANAGER") return <UserCog className="h-4 w-4" />;
    if (roleName === "MEMBER") return <UserCheck className="h-4 w-4" />;
    return <Shield className="h-4 w-4" />;
  };

  const getRoleColor = (roleName: string) => {
    if (roleName === "ADMIN") return "bg-red-100 text-red-800";
    if (roleName === "MANAGER") return "bg-blue-100 text-blue-800";
    if (roleName === "MEMBER") return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-800";
  };

  const handlePermissionToggle = (permissionId: string, isChecked: boolean) => {
    const currentIds = createForm.permissionIds || [];
    const updatedIds = isChecked
      ? [...currentIds, permissionId]
      : currentIds.filter((id) => id !== permissionId);
    setCreateForm({ ...createForm, permissionIds: updatedIds });
  };

  const handleEditPermissionToggle = (
    permissionId: string,
    isChecked: boolean
  ) => {
    const currentIds = editingRole.permissionIds || [];
    const updatedIds = isChecked
      ? [...currentIds, permissionId]
      : currentIds.filter((id) => id !== permissionId);
    setEditingRole({ ...editingRole, permissionIds: updatedIds });
  };

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
                  {permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`permission-${permission.id}`}
                        checked={
                          createForm.permissionIds?.includes(permission.id) ||
                          false
                        }
                        onCheckedChange={(checked) =>
                          handlePermissionToggle(
                            permission.id,
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor={`permission-${permission.id}`}
                        className="text-sm"
                      >
                        {permission.name}
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
                <Button onClick={handleCreate}>Crear Rol</Button>
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
                  {clubs.map((club) => (
                    <SelectItem key={club.id} value={club.id}>
                      {club.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Permisos</Label>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto border rounded-md p-4">
                {permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`edit-permission-${permission.id}`}
                      checked={
                        editingRole.permissionIds?.includes(permission.id) ||
                        false
                      }
                      onCheckedChange={(checked) =>
                        handleEditPermissionToggle(
                          permission.id,
                          checked as boolean
                        )
                      }
                    />
                    <Label
                      htmlFor={`edit-permission-${permission.id}`}
                      className="text-sm"
                    >
                      {permission.name}
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
              <Button onClick={handleUpdate}>Actualizar Rol</Button>
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
