"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  members,
  users,
  sponsors,
  payments,
  roles,
  permissions,
  clubs,
  properties,
  activities,
} from "@/components/creative/data";
import {
  Users,
  User,
  Building,
  DollarSign,
  Shield,
  Key,
  TrendingUp,
  Activity,
  Calendar,
  BarChart3,
  MapPin,
  Edit,
  Save,
  X,
} from "lucide-react";
import Link from "next/link";
import { Club, UpdateClubData } from "@/components/creative/types";

export default function HomePage() {
  const { t } = useLanguage();
  const [club, setClub] = useState<Club>(clubs[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateClubData>({
    name: clubs[0].name,
    alias: clubs[0].alias || "",
    logo: clubs[0].logo || "",
    location: clubs[0].location || "",
    foundationDate: clubs[0].foundationDate
      ? clubs[0].foundationDate.toISOString().split("T")[0]
      : undefined,
    description: clubs[0].description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedClub: Club = {
      ...club,
      ...formData,
      foundationDate: formData.foundationDate
        ? new Date(formData.foundationDate)
        : undefined,
    };
    setClub(updatedClub);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: club.name,
      alias: club.alias || "",
      logo: club.logo || "",
      location: club.location || "",
      foundationDate: club.foundationDate
        ? club.foundationDate.toISOString().split("T")[0]
        : undefined,
      description: club.description || "",
    });
    setIsEditing(false);
  };

  const stats = [
    {
      title: t("home.stats.totalProperties"),
      value: properties.length,
      icon: MapPin,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      href: "/properties",
    },
    {
      title: t("home.stats.totalActivities"),
      value: activities.length,
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-100",
      href: "/activities",
    },
    {
      title: t("home.stats.totalMembers"),
      value: members.length,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      href: "/members",
    },
    {
      title: t("home.stats.totalUsers"),
      value: users.length,
      icon: User,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      href: "/users",
    },
    {
      title: t("home.stats.totalSponsors"),
      value: sponsors.length,
      icon: Building,
      color: "text-red-600",
      bgColor: "bg-red-100",
      href: "/sponsors",
    },
    {
      title: t("home.stats.totalPayments"),
      value: payments.length,
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      href: "/payments",
    },
  ];

  const sections = [
    {
      title: t("navigation.properties"),
      description: t("properties.subtitle"),
      icon: MapPin,
      href: "/properties",
      count: properties.length,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: t("navigation.activities"),
      description: t("activities.subtitle"),
      icon: Activity,
      href: "/activities",
      count: activities.length,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: t("navigation.members"),
      description: t("members.subtitle"),
      icon: Users,
      href: "/members",
      count: members.length,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: t("navigation.users"),
      description: t("users.subtitle"),
      icon: User,
      href: "/users",
      count: users.length,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: t("navigation.sponsors"),
      description: t("sponsors.subtitle"),
      icon: Building,
      href: "/sponsors",
      count: sponsors.length,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: t("navigation.payments"),
      description: t("payments.subtitle"),
      icon: DollarSign,
      href: "/payments",
      count: payments.length,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: t("navigation.roles"),
      description: t("roles.subtitle"),
      icon: Shield,
      href: "/roles",
      count: roles.length,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
    {
      title: t("navigation.permissions"),
      description: t("permissions.subtitle"),
      icon: Key,
      href: "/permissions",
      count: permissions.length,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
  ];

  const recentActivity = [
    {
      type: "member",
      action: "added",
      name: members[0]?.name || "Nuevo miembro",
      time: "2 horas atrás",
      icon: Users,
    },
    {
      type: "payment",
      action: "received",
      name: `$${payments[0]?.amount || 0}`,
      time: "4 horas atrás",
      icon: DollarSign,
    },
    {
      type: "sponsor",
      action: "joined",
      name: sponsors[0]?.name || "Nuevo sponsor",
      time: "1 día atrás",
      icon: Building,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Club Information Card */}
      <Card className="max-w-4xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={club.logo} alt={club.name} />
                <AvatarFallback>
                  <Building className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("clubs.form.name")}</Label>
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
                        <Label htmlFor="alias">{t("clubs.form.alias")}</Label>
                        <Input
                          id="alias"
                          value={formData.alias}
                          onChange={(e) =>
                            setFormData({ ...formData, alias: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="logo">{t("clubs.form.logo")}</Label>
                        <Input
                          id="logo"
                          value={formData.logo}
                          onChange={(e) =>
                            setFormData({ ...formData, logo: e.target.value })
                          }
                          placeholder="URL del logo"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">
                          {t("clubs.form.location")}
                        </Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="foundationDate">
                          {t("clubs.form.foundationDate")}
                        </Label>
                        <Input
                          id="foundationDate"
                          type="date"
                          value={formData.foundationDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              foundationDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">
                        {t("clubs.form.description")}
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        rows={4}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit">
                        <Save className="mr-2 h-4 w-4" />
                        Guardar Cambios
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <CardTitle className="text-2xl">{club.name}</CardTitle>
                      {club.alias && (
                        <Badge variant="outline" className="mt-2">
                          {club.alias}
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {club.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{club.location}</span>
                        </div>
                      )}
                      {club.foundationDate && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Fundado {club.foundationDate.toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    {club.description && (
                      <div>
                        <h4 className="font-medium mb-2">Descripción</h4>
                        <p className="text-sm text-muted-foreground">
                          {club.description}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
              >
                <Edit className="mr-2 h-4 w-4" />
                Editar Club
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("home.title")}
          </h1>
          <p className="text-muted-foreground">{t("home.subtitle")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Activity className="h-3 w-3" />
            Activo
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <Link href={stat.href} className="hover:underline">
                  Ver detalles →
                </Link>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sections Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Card
            key={section.title}
            className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${section.bgColor}`}>
                  <section.icon className={`h-6 w-6 ${section.color}`} />
                </div>
                <Badge variant="outline">{section.count}</Badge>
              </div>
              <CardTitle className="mt-4">{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={section.href}>
                  Gestionar {section.title.toLowerCase()}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Actividad Reciente
            </CardTitle>
            <CardDescription>Últimas acciones en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {activity.name} {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Resumen Rápido
            </CardTitle>
            <CardDescription>Estadísticas del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total de ingresos</span>
                <span className="font-semibold">
                  $
                  {payments
                    .reduce((sum, payment) => sum + payment.amount, 0)
                    .toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Promedio por pago</span>
                <span className="font-semibold">
                  $
                  {payments.length > 0
                    ? (
                        payments.reduce(
                          (sum, payment) => sum + payment.amount,
                          0
                        ) / payments.length
                      ).toFixed(2)
                    : 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Clubs activos</span>
                <span className="font-semibold">
                  {
                    new Set(
                      [...members, ...sponsors].map((item) => item.clubId)
                    ).size
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
