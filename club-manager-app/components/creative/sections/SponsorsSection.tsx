"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Mail,
  Calendar,
  Building,
  Grid3X3,
  List,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sponsor, CreateSponsorData, UpdateSponsorData, Club } from "../types";
import { clubs } from "../data";

interface SponsorsSectionProps {
  sponsors: Sponsor[];
  onAddSponsor?: (sponsor: CreateSponsorData) => void;
  onUpdateSponsor?: (id: string, sponsor: UpdateSponsorData) => void;
  onDeleteSponsor?: (id: string) => void;
}

export function SponsorsSection({
  sponsors: initialSponsors,
  onAddSponsor,
  onUpdateSponsor,
  onDeleteSponsor,
}: SponsorsSectionProps) {
  const [sponsors, setSponsors] = useState<Sponsor[]>(initialSponsors);
  const [searchTerm, setSearchTerm] = useState("");
  const [clubFilter, setClubFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"cards" | "grid">("grid");

  // Form states
  const [formData, setFormData] = useState<CreateSponsorData>({
    name: "",
    email: "",
    clubId: "club-1",
  });

  // Filter sponsors
  const filteredSponsors = sponsors.filter((sponsor) => {
    const matchesSearch =
      sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sponsor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClub = clubFilter === "all" || sponsor.clubId === clubFilter;

    return matchesSearch && matchesClub;
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedSponsor) {
      // Update existing sponsor
      const selectedClub = clubs.find((c) => c.id === formData.clubId);
      const updatedSponsor: Sponsor = {
        ...selectedSponsor,
        ...formData,
        club: selectedClub,
      };
      setSponsors(
        sponsors.map((s) => (s.id === selectedSponsor.id ? updatedSponsor : s))
      );
      onUpdateSponsor?.(selectedSponsor.id, formData);
      setIsEditDialogOpen(false);
    } else {
      // Add new sponsor
      const selectedClub = clubs.find((c) => c.id === formData.clubId);
      const newSponsor: Sponsor = {
        id: Date.now().toString(),
        ...formData,
        club: selectedClub,
        createdAt: new Date(),
      };
      setSponsors([...sponsors, newSponsor]);
      onAddSponsor?.(formData);
      setIsAddDialogOpen(false);
    }

    // Reset form
    setFormData({
      name: "",
      email: "",
      clubId: "club-1",
    });
    setSelectedSponsor(null);
  };

  // Handle delete
  const handleDelete = (id: string) => {
    setSponsors(sponsors.filter((s) => s.id !== id));
    onDeleteSponsor?.(id);
  };

  // Handle edit
  const handleEdit = (sponsor: Sponsor) => {
    setSelectedSponsor(sponsor);
    setFormData({
      name: sponsor.name,
      email: sponsor.email,
      clubId: sponsor.clubId,
    });
    setIsEditDialogOpen(true);
  };

  // Handle view
  const handleView = (sponsor: Sponsor) => {
    setSelectedSponsor(sponsor);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Sponsors</h2>
          <p className="text-muted-foreground">
            Gestiona los sponsors del club
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Sponsor
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar sponsors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={clubFilter} onValueChange={setClubFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por club" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los clubs</SelectItem>
              {clubs.map((club) => (
                <SelectItem key={club.id} value={club.id}>
                  {club.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "cards" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("cards")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Sponsors Grid/Table */}
      {viewMode === "cards" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredSponsors.map((sponsor) => (
              <motion.div
                key={sponsor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" />
                          <AvatarFallback>
                            <Building className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {sponsor.name}
                          </CardTitle>
                          <CardDescription>{sponsor.email}</CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(sponsor)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(sponsor)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="text-red-600"
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
                                  Esta acción no se puede deshacer. Esto
                                  eliminará permanentemente el sponsor.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(sponsor.id)}
                                  className="bg-red-600 hover:bg-red-700"
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
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        {sponsor.club?.name || "Sin club"}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{sponsor.email}</span>
                    </div>
                    {sponsor.createdAt && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Sponsor desde{" "}
                          {new Date(sponsor.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Club</TableHead>
                <TableHead>Fecha de Creación</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSponsors.map((sponsor) => (
                <TableRow key={sponsor.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>
                          <Building className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{sponsor.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{sponsor.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {sponsor.club?.name || "Sin club"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {sponsor.createdAt
                      ? new Date(sponsor.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(sponsor)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(sponsor)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              className="text-red-600"
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
                                Esta acción no se puede deshacer. Esto eliminará
                                permanentemente el sponsor.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(sponsor.id)}
                                className="bg-red-600 hover:bg-red-700"
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

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Sponsor</DialogTitle>
            <DialogDescription>
              Completa la información del nuevo sponsor.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="club">Club</Label>
              <Select
                value={formData.clubId}
                onValueChange={(value) =>
                  setFormData({ ...formData, clubId: value })
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
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Agregar Sponsor</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Sponsor</DialogTitle>
            <DialogDescription>
              Modifica la información del sponsor.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Nombre</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-club">Club</Label>
              <Select
                value={formData.clubId}
                onValueChange={(value) =>
                  setFormData({ ...formData, clubId: value })
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
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Actualizar Sponsor</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles del Sponsor</DialogTitle>
          </DialogHeader>
          {selectedSponsor && (
            <div className="space-y-4">
              <div>
                <Label>Nombre</Label>
                <p className="text-sm font-medium">{selectedSponsor.name}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedSponsor.email}
                </p>
              </div>
              <div>
                <Label>Club</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedSponsor.club?.name || "Sin club"}
                </p>
              </div>
              <div>
                <Label>Fecha de Creación</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedSponsor.createdAt
                    ? new Date(selectedSponsor.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
