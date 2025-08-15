"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Grid3X3,
  List,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Building,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
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

import { Property, CreatePropertyData, UpdatePropertyData } from "../types";
import { useProperties } from "@/hooks/useProperties";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export function PropertiesSection() {
  const {
    properties,
    loading,
    error,
    createProperty,
    updateProperty,
    deleteProperty,
  } = useProperties();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [formData, setFormData] = useState<CreatePropertyData>({
    name: "",
    location: "",
    characteristics: [],
  });
  const [newCharacteristic, setNewCharacteristic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (selectedProperty) {
        await updateProperty(selectedProperty.id, formData);
        toast({
          title: "Éxito",
          description: "Propiedad actualizada correctamente",
        });
        setIsEditDialogOpen(false);
      } else {
        await createProperty(formData);
        toast({
          title: "Éxito",
          description: "Propiedad creada correctamente",
        });
        setIsAddDialogOpen(false);
      }
      resetForm();
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

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setFormData({
      name: property.name,
      location: property.location,
      characteristics: property.characteristics || [],
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (propertyId: string) => {
    try {
      await deleteProperty(propertyId);
      toast({
        title: "Éxito",
        description: "Propiedad eliminada correctamente",
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

  const handleView = (property: Property) => {
    setSelectedProperty(property);
    setIsViewDialogOpen(true);
  };

  const addCharacteristic = () => {
    if (
      newCharacteristic.trim() &&
      !formData.characteristics.includes(newCharacteristic.trim())
    ) {
      setFormData({
        ...formData,
        characteristics: [
          ...formData.characteristics,
          newCharacteristic.trim(),
        ],
      });
      setNewCharacteristic("");
    }
  };

  const removeCharacteristic = (characteristic: string) => {
    setFormData({
      ...formData,
      characteristics: formData.characteristics.filter(
        (c) => c !== characteristic
      ),
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      characteristics: [],
    });
    setNewCharacteristic("");
    setSelectedProperty(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Cargando propiedades...</span>
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

  // Mostrar mensaje cuando no hay propiedades
  if (properties.length === 0) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Propiedades</h1>
            <p className="text-muted-foreground">
              Gestiona las propiedades del club
            </p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Propiedad
          </Button>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <MapPin className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            No hay propiedades registradas
          </h3>
          <p className="text-muted-foreground mb-4 max-w-sm">
            Comienza agregando la primera propiedad al club para gestionar las
            instalaciones.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Primera Propiedad
          </Button>
        </div>

        {/* Add Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Propiedad</DialogTitle>
              <DialogDescription>
                Agrega una nueva propiedad al club.
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
                <Label htmlFor="location">Ubicación</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Características</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newCharacteristic}
                      onChange={(e) => setNewCharacteristic(e.target.value)}
                      placeholder="Agregar característica"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCharacteristic();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={addCharacteristic}
                      disabled={!newCharacteristic.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.characteristics.map((characteristic, index) => (
                      <Badge key={index} variant="secondary">
                        {characteristic}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 ml-1"
                          onClick={() => removeCharacteristic(characteristic)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  {t("common.cancel")}
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {selectedProperty ? t("common.update") : t("common.save")}
                  {isSubmitting && (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {t("properties.title")}
          </h2>
          <p className="text-muted-foreground">{t("properties.subtitle")}</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("properties.addProperty")}
        </Button>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("properties.filters.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {viewMode === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <Card
              key={property.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{property.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {property.characteristics
                      .slice(0, 3)
                      .map((characteristic, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {characteristic}
                        </Badge>
                      ))}
                    {property.characteristics.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{property.characteristics.length - 3} más
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(property)}
                      className="flex-1"
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      {t("common.view")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(property)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {t("properties.deleteProperty")}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {t("properties.messages.deleteConfirm")}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            {t("common.cancel")}
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(property.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {t("common.delete")}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <Card key={property.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-blue-100">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{property.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {property.location}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {property.characteristics
                          .slice(0, 3)
                          .map((characteristic, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {characteristic}
                            </Badge>
                          ))}
                        {property.characteristics.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{property.characteristics.length - 3} más
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(property)}
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      {t("common.view")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(property)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {t("properties.deleteProperty")}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {t("properties.messages.deleteConfirm")}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            {t("common.cancel")}
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(property.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {t("common.delete")}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog
        open={isAddDialogOpen || isEditDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddDialogOpen(false);
            setIsEditDialogOpen(false);
            resetForm();
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedProperty
                ? t("properties.editProperty")
                : t("properties.addProperty")}
            </DialogTitle>
            <DialogDescription>
              {selectedProperty
                ? "Edita la información de la propiedad"
                : "Agrega una nueva propiedad"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("properties.form.name")}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">{t("properties.form.location")}</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>{t("properties.form.characteristics")}</Label>
              <div className="flex gap-2">
                <Input
                  value={newCharacteristic}
                  onChange={(e) => setNewCharacteristic(e.target.value)}
                  placeholder="Agregar característica"
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), addCharacteristic())
                  }
                />
                <Button type="button" onClick={addCharacteristic} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {formData.characteristics.map((characteristic, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {characteristic}
                    <button
                      type="button"
                      onClick={() => removeCharacteristic(characteristic)}
                      className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false);
                  setIsEditDialogOpen(false);
                  resetForm();
                }}
              >
                {t("common.cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {selectedProperty ? t("common.update") : t("common.save")}
                {isSubmitting && (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("properties.propertyDetails")}</DialogTitle>
          </DialogHeader>
          {selectedProperty && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Building className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedProperty.name}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{selectedProperty.location}</span>
              </div>
              <div>
                <h4 className="font-medium mb-2">
                  {t("properties.form.characteristics")}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {selectedProperty.characteristics.map(
                    (characteristic, index) => (
                      <Badge key={index} variant="secondary">
                        {characteristic}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
