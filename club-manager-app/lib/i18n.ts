export type Locale = 'en' | 'es';

export interface Translations {
    // Common
    common: {
        add: string;
        edit: string;
        delete: string;
        cancel: string;
        save: string;
        update: string;
        close: string;
        search: string;
        filter: string;
        actions: string;
        view: string;
        details: string;
        confirm: string;
        loading: string;
        noData: string;
        error: string;
        success: string;
        warning: string;
        info: string;
    };

    // Navigation
    navigation: {
        home: string;
        members: string;
        users: string;
        sponsors: string;
        payments: string;
        roles: string;
        permissions: string;

        properties: string;
        activities: string;
    };

    // Home
    home: {
        title: string;
        subtitle: string;
        stats: {
            totalMembers: string;
            totalUsers: string;
            totalSponsors: string;
            totalPayments: string;
        };
    };

    // Members
    members: {
        title: string;
        subtitle: string;
        addMember: string;
        editMember: string;
        deleteMember: string;
        memberDetails: string;
        form: {
            name: string;
            email: string;
            club: string;
            selectClub: string;
        };
        table: {
            name: string;
            email: string;
            club: string;
            createdAt: string;
            actions: string;
        };
        filters: {
            searchPlaceholder: string;
            filterByClub: string;
            allClubs: string;
        };
        messages: {
            deleteConfirm: string;
            deleteSuccess: string;
            addSuccess: string;
            updateSuccess: string;
        };
    };

    // Users
    users: {
        title: string;
        subtitle: string;
        addUser: string;
        editUser: string;
        deleteUser: string;
        userDetails: string;
        form: {
            name: string;
            email: string;
            password: string;
        };
        table: {
            name: string;
            email: string;
            createdAt: string;
            updatedAt: string;
            actions: string;
        };
        filters: {
            searchPlaceholder: string;
        };
        messages: {
            deleteConfirm: string;
            deleteSuccess: string;
            addSuccess: string;
            updateSuccess: string;
        };
    };

    // Sponsors
    sponsors: {
        title: string;
        subtitle: string;
        addSponsor: string;
        editSponsor: string;
        deleteSponsor: string;
        sponsorDetails: string;
        form: {
            name: string;
            email: string;
            club: string;
            selectClub: string;
        };
        table: {
            name: string;
            email: string;
            club: string;
            createdAt: string;
            actions: string;
        };
        filters: {
            searchPlaceholder: string;
            filterByClub: string;
            allClubs: string;
        };
        messages: {
            deleteConfirm: string;
            deleteSuccess: string;
            addSuccess: string;
            updateSuccess: string;
        };
    };

    // Payments
    payments: {
        title: string;
        subtitle: string;
        addPayment: string;
        editPayment: string;
        deletePayment: string;
        paymentDetails: string;
        form: {
            amount: string;
            description: string;
            date: string;
            club: string;
            member: string;
            sponsor: string;
            selectClub: string;
            selectMember: string;
            selectSponsor: string;
            noMember: string;
            noSponsor: string;
        };
        table: {
            amount: string;
            description: string;
            memberSponsor: string;
            club: string;
            date: string;
            actions: string;
        };
        filters: {
            searchPlaceholder: string;
            filterByClub: string;
            allClubs: string;
        };
        messages: {
            deleteConfirm: string;
            deleteSuccess: string;
            addSuccess: string;
            updateSuccess: string;
        };
    };

    // Roles
    roles: {
        title: string;
        subtitle: string;
        addRole: string;
        editRole: string;
        deleteRole: string;
        roleDetails: string;
        form: {
            name: string;
            club: string;
            permissions: string;
            selectClub: string;
            selectPermissions: string;
        };
        table: {
            name: string;
            club: string;
            permissions: string;
            actions: string;
        };
        filters: {
            searchPlaceholder: string;
            filterByClub: string;
            allClubs: string;
        };
        messages: {
            deleteConfirm: string;
            deleteSuccess: string;
            addSuccess: string;
            updateSuccess: string;
        };
    };

    // Permissions
    permissions: {
        title: string;
        subtitle: string;
        addPermission: string;
        editPermission: string;
        deletePermission: string;
        permissionDetails: string;
        form: {
            name: string;
            description: string;
        };
        table: {
            name: string;
            description: string;
            actions: string;
        };
        filters: {
            searchPlaceholder: string;
        };
        messages: {
            deleteConfirm: string;
            deleteSuccess: string;
            addSuccess: string;
            updateSuccess: string;
        };
    };
}

export const translations: Record<Locale, Translations> = {
    en: {
        common: {
            add: 'Add',
            edit: 'Edit',
            delete: 'Delete',
            cancel: 'Cancel',
            save: 'Save',
            update: 'Update',
            close: 'Close',
            search: 'Search',
            filter: 'Filter',
            actions: 'Actions',
            view: 'View',
            details: 'Details',
            confirm: 'Confirm',
            loading: 'Loading...',
            noData: 'No data available',
            error: 'Error',
            success: 'Success',
            warning: 'Warning',
            info: 'Information',
        },
        navigation: {
            home: 'Home',
            members: 'Members',
            users: 'Users',
            sponsors: 'Sponsors',
            payments: 'Payments',
            roles: 'Roles',
            permissions: 'Permissions',
        },
        home: {
            title: 'Club Management Dashboard',
            subtitle: 'Manage your club operations efficiently',
            stats: {
                totalMembers: 'Total Members',
                totalUsers: 'Total Users',
                totalSponsors: 'Total Sponsors',
                totalPayments: 'Total Payments',

                totalProperties: 'Total Properties',
                totalActivities: 'Total Activities',
            },
        },
        members: {
            title: 'Members',
            subtitle: 'Manage club members',
            addMember: 'Add Member',
            editMember: 'Edit Member',
            deleteMember: 'Delete Member',
            memberDetails: 'Member Details',
            form: {
                name: 'Name',
                email: 'Email',
                club: 'Club',
                selectClub: 'Select club',
            },
            table: {
                name: 'Name',
                email: 'Email',
                club: 'Club',
                createdAt: 'Created At',
                actions: 'Actions',
            },
            filters: {
                searchPlaceholder: 'Search members...',
                filterByClub: 'Filter by club',
                allClubs: 'All clubs',
            },
            messages: {
                deleteConfirm: 'This action cannot be undone. This will permanently delete the member.',
                deleteSuccess: 'Member deleted successfully',
                addSuccess: 'Member added successfully',
                updateSuccess: 'Member updated successfully',
            },
        },
        users: {
            title: 'Users',
            subtitle: 'Manage system users',
            addUser: 'Add User',
            editUser: 'Edit User',
            deleteUser: 'Delete User',
            userDetails: 'User Details',
            form: {
                name: 'Name',
                email: 'Email',
                password: 'Password',
            },
            table: {
                name: 'Name',
                email: 'Email',
                createdAt: 'Created At',
                updatedAt: 'Updated At',
                actions: 'Actions',
            },
            filters: {
                searchPlaceholder: 'Search users...',
            },
            messages: {
                deleteConfirm: 'This action cannot be undone. This will permanently delete the user.',
                deleteSuccess: 'User deleted successfully',
                addSuccess: 'User added successfully',
                updateSuccess: 'User updated successfully',
            },
        },
        sponsors: {
            title: 'Sponsors',
            subtitle: 'Manage club sponsors',
            addSponsor: 'Add Sponsor',
            editSponsor: 'Edit Sponsor',
            deleteSponsor: 'Delete Sponsor',
            sponsorDetails: 'Sponsor Details',
            form: {
                name: 'Name',
                email: 'Email',
                club: 'Club',
                selectClub: 'Select club',
            },
            table: {
                name: 'Name',
                email: 'Email',
                club: 'Club',
                createdAt: 'Created At',
                actions: 'Actions',
            },
            filters: {
                searchPlaceholder: 'Search sponsors...',
                filterByClub: 'Filter by club',
                allClubs: 'All clubs',
            },
            messages: {
                deleteConfirm: 'This action cannot be undone. This will permanently delete the sponsor.',
                deleteSuccess: 'Sponsor deleted successfully',
                addSuccess: 'Sponsor added successfully',
                updateSuccess: 'Sponsor updated successfully',
            },
        },
        payments: {
            title: 'Payments',
            subtitle: 'Manage club payments',
            addPayment: 'Add Payment',
            editPayment: 'Edit Payment',
            deletePayment: 'Delete Payment',
            paymentDetails: 'Payment Details',
            form: {
                amount: 'Amount',
                description: 'Description',
                date: 'Date',
                club: 'Club',
                member: 'Member (optional)',
                sponsor: 'Sponsor (optional)',
                selectClub: 'Select club',
                selectMember: 'Select member',
                selectSponsor: 'Select sponsor',
                noMember: 'No member',
                noSponsor: 'No sponsor',
            },
            table: {
                amount: 'Amount',
                description: 'Description',
                memberSponsor: 'Member/Sponsor',
                club: 'Club',
                date: 'Date',
                actions: 'Actions',
            },
            filters: {
                searchPlaceholder: 'Search payments...',
                filterByClub: 'Filter by club',
                allClubs: 'All clubs',
            },
            messages: {
                deleteConfirm: 'This action cannot be undone. This will permanently delete the payment.',
                deleteSuccess: 'Payment deleted successfully',
                addSuccess: 'Payment added successfully',
                updateSuccess: 'Payment updated successfully',
            },
        },
        roles: {
            title: 'Roles',
            subtitle: 'Manage user roles',
            addRole: 'Add Role',
            editRole: 'Edit Role',
            deleteRole: 'Delete Role',
            roleDetails: 'Role Details',
            form: {
                name: 'Name',
                club: 'Club',
                permissions: 'Permissions',
                selectClub: 'Select club',
                selectPermissions: 'Select permissions',
            },
            table: {
                name: 'Name',
                club: 'Club',
                permissions: 'Permissions',
                actions: 'Actions',
            },
            filters: {
                searchPlaceholder: 'Search roles...',
                filterByClub: 'Filter by club',
                allClubs: 'All clubs',
            },
            messages: {
                deleteConfirm: 'This action cannot be undone. This will permanently delete the role.',
                deleteSuccess: 'Role deleted successfully',
                addSuccess: 'Role added successfully',
                updateSuccess: 'Role updated successfully',
            },
        },
        permissions: {
            title: 'Permissions',
            subtitle: 'Manage system permissions',
            addPermission: 'Add Permission',
            editPermission: 'Edit Permission',
            deletePermission: 'Delete Permission',
            permissionDetails: 'Permission Details',
            form: {
                name: 'Name',
                description: 'Description',
            },
            table: {
                name: 'Name',
                description: 'Description',
                actions: 'Actions',
            },
            filters: {
                searchPlaceholder: 'Search permissions...',
            },
            messages: {
                deleteConfirm: 'This action cannot be undone. This will permanently delete the permission.',
                deleteSuccess: 'Permission deleted successfully',
                addSuccess: 'Permission added successfully',
                updateSuccess: 'Permission updated successfully',
            },
        },
    },
    es: {
        common: {
            add: 'Agregar',
            edit: 'Editar',
            delete: 'Eliminar',
            cancel: 'Cancelar',
            save: 'Guardar',
            update: 'Actualizar',
            close: 'Cerrar',
            search: 'Buscar',
            filter: 'Filtrar',
            actions: 'Acciones',
            view: 'Ver',
            details: 'Detalles',
            confirm: 'Confirmar',
            loading: 'Cargando...',
            noData: 'No hay datos disponibles',
            error: 'Error',
            success: 'Éxito',
            warning: 'Advertencia',
            info: 'Información',
        },
        navigation: {
            home: 'Inicio',
            members: 'Miembros',
            users: 'Usuarios',
            sponsors: 'Sponsors',
            payments: 'Pagos',
            roles: 'Roles',
            permissions: 'Permisos',
            clubs: 'Club',
            properties: 'Propiedades',
            activities: 'Actividades',
        },
        home: {
            title: 'Panel de Gestión del Club',
            subtitle: 'Gestiona las operaciones de tu club de manera eficiente',
            stats: {
                totalMembers: 'Total de Miembros',
                totalUsers: 'Total de Usuarios',
                totalSponsors: 'Total de Sponsors',
                totalPayments: 'Total de Pagos',

                totalProperties: 'Total de Propiedades',
                totalActivities: 'Total de Actividades',
            },
        },
        members: {
            title: 'Miembros',
            subtitle: 'Gestiona los miembros del club',
            addMember: 'Agregar Miembro',
            editMember: 'Editar Miembro',
            deleteMember: 'Eliminar Miembro',
            memberDetails: 'Detalles del Miembro',
            form: {
                name: 'Nombre',
                email: 'Email',
                club: 'Club',
                selectClub: 'Seleccionar club',
            },
            table: {
                name: 'Nombre',
                email: 'Email',
                club: 'Club',
                createdAt: 'Fecha de Creación',
                actions: 'Acciones',
            },
            filters: {
                searchPlaceholder: 'Buscar miembros...',
                filterByClub: 'Filtrar por club',
                allClubs: 'Todos los clubs',
            },
            messages: {
                deleteConfirm: 'Esta acción no se puede deshacer. Esto eliminará permanentemente el miembro.',
                deleteSuccess: 'Miembro eliminado exitosamente',
                addSuccess: 'Miembro agregado exitosamente',
                updateSuccess: 'Miembro actualizado exitosamente',
            },
        },
        users: {
            title: 'Usuarios',
            subtitle: 'Gestiona los usuarios del sistema',
            addUser: 'Agregar Usuario',
            editUser: 'Editar Usuario',
            deleteUser: 'Eliminar Usuario',
            userDetails: 'Detalles del Usuario',
            form: {
                name: 'Nombre',
                email: 'Email',
                password: 'Contraseña',
            },
            table: {
                name: 'Nombre',
                email: 'Email',
                createdAt: 'Fecha de Creación',
                updatedAt: 'Última Actualización',
                actions: 'Acciones',
            },
            filters: {
                searchPlaceholder: 'Buscar usuarios...',
            },
            messages: {
                deleteConfirm: 'Esta acción no se puede deshacer. Esto eliminará permanentemente el usuario.',
                deleteSuccess: 'Usuario eliminado exitosamente',
                addSuccess: 'Usuario agregado exitosamente',
                updateSuccess: 'Usuario actualizado exitosamente',
            },
        },
        sponsors: {
            title: 'Sponsors',
            subtitle: 'Gestiona los sponsors del club',
            addSponsor: 'Agregar Sponsor',
            editSponsor: 'Editar Sponsor',
            deleteSponsor: 'Eliminar Sponsor',
            sponsorDetails: 'Detalles del Sponsor',
            form: {
                name: 'Nombre',
                email: 'Email',
                club: 'Club',
                selectClub: 'Seleccionar club',
            },
            table: {
                name: 'Nombre',
                email: 'Email',
                club: 'Club',
                createdAt: 'Fecha de Creación',
                actions: 'Acciones',
            },
            filters: {
                searchPlaceholder: 'Buscar sponsors...',
                filterByClub: 'Filtrar por club',
                allClubs: 'Todos los clubs',
            },
            messages: {
                deleteConfirm: 'Esta acción no se puede deshacer. Esto eliminará permanentemente el sponsor.',
                deleteSuccess: 'Sponsor eliminado exitosamente',
                addSuccess: 'Sponsor agregado exitosamente',
                updateSuccess: 'Sponsor actualizado exitosamente',
            },
        },
        payments: {
            title: 'Pagos',
            subtitle: 'Gestiona los pagos del club',
            addPayment: 'Agregar Pago',
            editPayment: 'Editar Pago',
            deletePayment: 'Eliminar Pago',
            paymentDetails: 'Detalles del Pago',
            form: {
                amount: 'Monto',
                description: 'Descripción',
                date: 'Fecha',
                club: 'Club',
                member: 'Miembro (opcional)',
                sponsor: 'Sponsor (opcional)',
                selectClub: 'Seleccionar club',
                selectMember: 'Seleccionar miembro',
                selectSponsor: 'Seleccionar sponsor',
                noMember: 'Sin miembro',
                noSponsor: 'Sin sponsor',
            },
            table: {
                amount: 'Monto',
                description: 'Descripción',
                memberSponsor: 'Miembro/Sponsor',
                club: 'Club',
                date: 'Fecha',
                actions: 'Acciones',
            },
            filters: {
                searchPlaceholder: 'Buscar pagos...',
                filterByClub: 'Filtrar por club',
                allClubs: 'Todos los clubs',
            },
            messages: {
                deleteConfirm: 'Esta acción no se puede deshacer. Esto eliminará permanentemente el pago.',
                deleteSuccess: 'Pago eliminado exitosamente',
                addSuccess: 'Pago agregado exitosamente',
                updateSuccess: 'Pago actualizado exitosamente',
            },
        },
        roles: {
            title: 'Roles',
            subtitle: 'Gestiona los roles de usuario',
            addRole: 'Agregar Rol',
            editRole: 'Editar Rol',
            deleteRole: 'Eliminar Rol',
            roleDetails: 'Detalles del Rol',
            form: {
                name: 'Nombre',
                club: 'Club',
                permissions: 'Permisos',
                selectClub: 'Seleccionar club',
                selectPermissions: 'Seleccionar permisos',
            },
            table: {
                name: 'Nombre',
                club: 'Club',
                permissions: 'Permisos',
                actions: 'Acciones',
            },
            filters: {
                searchPlaceholder: 'Buscar roles...',
                filterByClub: 'Filtrar por club',
                allClubs: 'Todos los clubs',
            },
            messages: {
                deleteConfirm: 'Esta acción no se puede deshacer. Esto eliminará permanentemente el rol.',
                deleteSuccess: 'Rol eliminado exitosamente',
                addSuccess: 'Rol agregado exitosamente',
                updateSuccess: 'Rol actualizado exitosamente',
            },
        },
        permissions: {
            title: 'Permisos',
            subtitle: 'Gestiona los permisos del sistema',
            addPermission: 'Agregar Permiso',
            editPermission: 'Editar Permiso',
            deletePermission: 'Eliminar Permiso',
            permissionDetails: 'Detalles del Permiso',
            form: {
                name: 'Nombre',
                description: 'Descripción',
            },
            table: {
                name: 'Nombre',
                description: 'Descripción',
                actions: 'Acciones',
            },
            filters: {
                searchPlaceholder: 'Buscar permisos...',
            },
            messages: {
                deleteConfirm: 'Esta acción no se puede deshacer. Esto eliminará permanentemente el permiso.',
                deleteSuccess: 'Permiso eliminado exitosamente',
                addSuccess: 'Permiso agregado exitosamente',
                updateSuccess: 'Permiso actualizado exitosamente',
            },
        },



        // Properties
        properties: {
            title: 'Properties',
            subtitle: 'Manage club properties',
            addProperty: 'Add Property',
            editProperty: 'Edit Property',
            deleteProperty: 'Delete Property',
            propertyDetails: 'Property Details',
            form: {
                name: 'Name',
                location: 'Location',
                characteristics: 'Characteristics',
                club: 'Club',
                selectClub: 'Select club',
                addCharacteristic: 'Add characteristic',
            },
            table: {
                name: 'Name',
                location: 'Location',
                characteristics: 'Characteristics',
                club: 'Club',
                actions: 'Actions',
            },
            filters: {
                searchPlaceholder: 'Search properties...',
            },
            messages: {
                deleteConfirm: 'This action cannot be undone. This will permanently delete the property.',
                deleteSuccess: 'Property deleted successfully',
                addSuccess: 'Property added successfully',
                updateSuccess: 'Property updated successfully',
            },
        },

        // Activities
        activities: {
            title: 'Activities',
            subtitle: 'Manage club activities',
            addActivity: 'Add Activity',
            editActivity: 'Edit Activity',
            deleteActivity: 'Delete Activity',
            activityDetails: 'Activity Details',
            form: {
                name: 'Name',
                description: 'Description',
                club: 'Club',
                selectClub: 'Select club',
            },
            table: {
                name: 'Name',
                description: 'Description',
                club: 'Club',
                actions: 'Actions',
            },
            filters: {
                searchPlaceholder: 'Search activities...',
            },
            messages: {
                deleteConfirm: 'This action cannot be undone. This will permanently delete the activity.',
                deleteSuccess: 'Activity deleted successfully',
                addSuccess: 'Activity added successfully',
                updateSuccess: 'Activity updated successfully',
            },
        },
    },
};

export function getTranslation(locale: Locale): Translations {
    return translations[locale] || translations.en;
}

export function t(locale: Locale, key: string): string {
    const keys = key.split('.');
    let value: any = getTranslation(locale);

    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            return key; // Return key if translation not found
        }
    }

    return typeof value === 'string' ? value : key;
} 