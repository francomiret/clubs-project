import * as fs from 'fs';
import * as path from 'path';

// Lista de controladores a corregir
const controllers = [
    'users',
    'members',
    'sponsors',
    'payments',
    'roles',
    'permissions'
];

function fixControllerImports(controllerName: string) {
    const controllerPath = path.join(__dirname, '..', 'src', controllerName, `${controllerName}.controller.ts`);

    if (!fs.existsSync(controllerPath)) {
        console.log(`⚠️  Controlador ${controllerName} no encontrado`);
        return;
    }

    let content = fs.readFileSync(controllerPath, 'utf8');

    // Corregir imports duplicados
    content = content.replace(
        /import \{ Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards \} from '@nestjs\/common'; Get, Post, Body, Patch, Param, Delete, Query \} from '@nestjs\/common';/g,
        "import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';"
    );

    content = content.replace(
        /import \{ ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth \} from '@nestjs\/swagger'; ApiOperation, ApiResponse, ApiParam \} from '@nestjs\/swagger';/g,
        "import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';"
    );

    // Corregir permisos incorrectos
    content = content.replace(
        /@RequirePermission\('members', 'create'\)/g,
        "@RequirePermission('members', 'read')"
    );

    content = content.replace(
        /@RequirePermission\('users', 'create'\)/g,
        "@RequirePermission('users', 'read')"
    );

    content = content.replace(
        /@RequirePermission\('sponsors', 'create'\)/g,
        "@RequirePermission('sponsors', 'read')"
    );

    content = content.replace(
        /@RequirePermission\('payments', 'create'\)/g,
        "@RequirePermission('payments', 'read')"
    );

    content = content.replace(
        /@RequirePermission\('roles', 'create'\)/g,
        "@RequirePermission('roles', 'read')"
    );

    content = content.replace(
        /@RequirePermission\('permissions', 'create'\)/g,
        "@RequirePermission('permissions', 'read')"
    );

    fs.writeFileSync(controllerPath, content);
    console.log(`✅ Imports corregidos en ${controllerName}`);
}

// Corregir todos los controladores
controllers.forEach(fixControllerImports);

console.log('\n🎉 Todos los imports corregidos'); 