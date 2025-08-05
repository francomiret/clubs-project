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
  DollarSign,
  Calendar,
  User,
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
import {
  Payment,
  CreatePaymentData,
  UpdatePaymentData,
  Member,
  Sponsor,
  Club,
} from "../types";
import { IconRenderer } from "../IconRenderer";
import { members, sponsors, clubs } from "../data";

interface PaymentsSectionProps {
  payments: Payment[];
  onAddPayment?: (payment: CreatePaymentData) => void;
  onUpdatePayment?: (id: string, payment: UpdatePaymentData) => void;
  onDeletePayment?: (id: string) => void;
}

export function PaymentsSection({
  payments: initialPayments,
  onAddPayment,
  onUpdatePayment,
  onDeletePayment,
}: PaymentsSectionProps) {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [clubFilter, setClubFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"cards" | "grid">("grid");

  // Form states
  const [formData, setFormData] = useState<CreatePaymentData>({
    amount: 0,
    description: "",
    date: new Date(),
    memberId: "",
    sponsorId: "",
    clubId: "club-1",
  });

  // Filter payments
  const filteredPayments = payments.filter((payment) => {
    const memberName = payment.member?.name || payment.sponsor?.name || "";
    const matchesSearch =
      memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.description?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      );
    const matchesClub = clubFilter === "all" || payment.clubId === clubFilter;

    return matchesSearch && matchesClub;
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedPayment) {
      // Update existing payment
      const selectedClub = clubs.find((c) => c.id === formData.clubId);
      const selectedMember = formData.memberId
        ? members.find((m) => m.id === formData.memberId)
        : undefined;
      const selectedSponsor = formData.sponsorId
        ? sponsors.find((s) => s.id === formData.sponsorId)
        : undefined;

      const updatedPayment: Payment = {
        ...selectedPayment,
        ...formData,
        club: selectedClub,
        member: selectedMember,
        sponsor: selectedSponsor,
      };
      setPayments(
        payments.map((p) => (p.id === selectedPayment.id ? updatedPayment : p))
      );
      onUpdatePayment?.(selectedPayment.id, formData);
      setIsEditDialogOpen(false);
    } else {
      // Add new payment
      const selectedClub = clubs.find((c) => c.id === formData.clubId);
      const selectedMember = formData.memberId
        ? members.find((m) => m.id === formData.memberId)
        : undefined;
      const selectedSponsor = formData.sponsorId
        ? sponsors.find((s) => s.id === formData.sponsorId)
        : undefined;

      const newPayment: Payment = {
        id: Date.now().toString(),
        ...formData,
        club: selectedClub,
        member: selectedMember,
        sponsor: selectedSponsor,
      };
      setPayments([...payments, newPayment]);
      onAddPayment?.(formData);
      setIsAddDialogOpen(false);
    }

    // Reset form
    setFormData({
      amount: 0,
      description: "",
      date: new Date(),
      memberId: "",
      sponsorId: "",
      clubId: "club-1",
    });
    setSelectedPayment(null);
  };

  // Handle delete
  const handleDelete = (id: string) => {
    setPayments(payments.filter((p) => p.id !== id));
    onDeletePayment?.(id);
  };

  // Handle edit
  const handleEdit = (payment: Payment) => {
    setSelectedPayment(payment);
    setFormData({
      amount: payment.amount,
      description: payment.description || "",
      date: payment.date,
      memberId: payment.memberId || "",
      sponsorId: payment.sponsorId || "",
      clubId: payment.clubId,
    });
    setIsEditDialogOpen(true);
  };

  // Handle view
  const handleView = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pagos</h2>
          <p className="text-muted-foreground">Gestiona los pagos del club</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Pago
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar pagos..."
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

      {/* Payments Grid/Table */}
      {viewMode === "cards" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredPayments.map((payment) => (
              <motion.div
                key={payment.id}
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
                            <DollarSign className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            ${payment.amount.toLocaleString()}
                          </CardTitle>
                          <CardDescription>
                            {payment.member?.name ||
                              payment.sponsor?.name ||
                              "Sin nombre"}
                          </CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(payment)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(payment)}>
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
                                  eliminará permanentemente el pago.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(payment.id)}
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
                        {payment.club?.name || "Sin club"}
                      </Badge>
                      <Badge variant="secondary">
                        {payment.member ? "Miembro" : "Sponsor"}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(payment.date).toLocaleDateString()}</span>
                    </div>
                    {payment.description && (
                      <div className="text-sm text-muted-foreground">
                        {payment.description}
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
                <TableHead>Monto</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Miembro/Sponsor</TableHead>
                <TableHead>Club</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div className="font-medium">
                      ${payment.amount.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    {payment.description || "Sin descripción"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {payment.member ? (
                        <>
                          <User className="h-4 w-4" />
                          <span>{payment.member.name}</span>
                        </>
                      ) : (
                        <>
                          <Building className="h-4 w-4" />
                          <span>{payment.sponsor?.name || "Sin nombre"}</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {payment.club?.name || "Sin club"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(payment.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(payment)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(payment)}>
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
                                permanentemente el pago.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(payment.id)}
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
            <DialogTitle>Agregar Nuevo Pago</DialogTitle>
            <DialogDescription>
              Completa la información del nuevo pago.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="amount">Monto</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: parseFloat(e.target.value) || 0,
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="date">Fecha</Label>
              <Input
                id="date"
                type="date"
                value={
                  formData.date instanceof Date
                    ? formData.date.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setFormData({ ...formData, date: new Date(e.target.value) })
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
            <div>
              <Label htmlFor="member">Miembro (opcional)</Label>
              <Select
                value={formData.memberId}
                onValueChange={(value) =>
                  setFormData({ ...formData, memberId: value, sponsorId: "" })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar miembro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Sin miembro</SelectItem>
                  {members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sponsor">Sponsor (opcional)</Label>
              <Select
                value={formData.sponsorId}
                onValueChange={(value) =>
                  setFormData({ ...formData, sponsorId: value, memberId: "" })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar sponsor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Sin sponsor</SelectItem>
                  {sponsors.map((sponsor) => (
                    <SelectItem key={sponsor.id} value={sponsor.id}>
                      {sponsor.name}
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
              <Button type="submit">Agregar Pago</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Pago</DialogTitle>
            <DialogDescription>
              Modifica la información del pago.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="edit-amount">Monto</Label>
              <Input
                id="edit-amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: parseFloat(e.target.value) || 0,
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Descripción</Label>
              <Input
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-date">Fecha</Label>
              <Input
                id="edit-date"
                type="date"
                value={
                  formData.date instanceof Date
                    ? formData.date.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setFormData({ ...formData, date: new Date(e.target.value) })
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
            <div>
              <Label htmlFor="edit-member">Miembro (opcional)</Label>
              <Select
                value={formData.memberId}
                onValueChange={(value) =>
                  setFormData({ ...formData, memberId: value, sponsorId: "" })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar miembro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Sin miembro</SelectItem>
                  {members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-sponsor">Sponsor (opcional)</Label>
              <Select
                value={formData.sponsorId}
                onValueChange={(value) =>
                  setFormData({ ...formData, sponsorId: value, memberId: "" })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar sponsor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Sin sponsor</SelectItem>
                  {sponsors.map((sponsor) => (
                    <SelectItem key={sponsor.id} value={sponsor.id}>
                      {sponsor.name}
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
              <Button type="submit">Actualizar Pago</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles del Pago</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div>
                <Label>Monto</Label>
                <p className="text-sm font-medium">
                  ${selectedPayment.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <Label>Descripción</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedPayment.description || "Sin descripción"}
                </p>
              </div>
              <div>
                <Label>Fecha</Label>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedPayment.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <Label>Club</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedPayment.club?.name || "Sin club"}
                </p>
              </div>
              <div>
                <Label>Miembro/Sponsor</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedPayment.member?.name ||
                    selectedPayment.sponsor?.name ||
                    "Sin asignar"}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
