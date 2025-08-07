import * as fs from 'fs';
import * as path from 'path';

// Lista de controladores a proteger
const controllers = [
    'users',
    'members',
    'sponsors',
    'payments',
    'roles',
    'permissions'
];

// Permisos por acción
const permissions = {
    'create': 'create',
    'findAll': 'read',
    'findAllPaginated': 'read',
    'findOne': 'read',
    'update': 'update',
    'remove': 'delete'
};

function applyAuthorizationToController(controllerName: string) {
    const controllerPath = path.join(__dirname, '..', 'src', controllerName, `${controllerName}.controller.ts`);

    if (!fs.existsSync(controllerPath)) {
        console.log(`⚠️  Controlador ${controllerName} no encontrado`);
        return;
    }

    let content = fs.readFileSync(controllerPath, 'utf8');

    // Agregar imports necesarios
    if (!content.includes('UseGuards')) {
        content = content.replace(
            'import { Controller,',
            'import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from \'@nestjs/common\';'
        );
    }

    if (!content.includes('ApiBearerAuth')) {
        content = content.replace(
            'import { ApiTags,',
            'import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from \'@nestjs/swagger\';'
        );
    }

    // Agregar imports de autorización
    if (!content.includes('AuthorizationGuard')) {
        const importIndex = content.lastIndexOf('import');
        const lastImportLine = content.substring(importIndex).split('\n')[0];
        const insertIndex = content.indexOf(lastImportLine) + lastImportLine.length;

        content = content.slice(0, insertIndex) +
            '\nimport { AuthorizationGuard, RequirePermission } from \'../auth/guards/authorization.guard\';' +
            '\nimport { CurrentUserRequest } from \'../auth/decorators/current-user-request.decorator\';' +
            content.slice(insertIndex);
    }

    // Agregar guard al controlador
    if (!content.includes('@UseGuards(AuthorizationGuard)')) {
        content = content.replace(
            '@Controller(',
            '@UseGuards(AuthorizationGuard)\n@ApiBearerAuth()\n@Controller('
        );
    }

    // Agregar permisos a cada método
    Object.entries(permissions).forEach(([method, permission]) => {
        const methodRegex = new RegExp(`@(Get|Post|Patch|Delete)\\([^)]*\\)\\s*\\n\\s*@ApiOperation`, 'g');
        content = content.replace(methodRegex, (match) => {
            if (!match.includes('@RequirePermission')) {
                return match.replace(
                    '@ApiOperation',
                    `@RequirePermission('${controllerName}', '${permission}')\n    @ApiOperation`
                );
            }
            return match;
        });
    });

    // Agregar respuestas 403
    content = content.replace(
        /@ApiResponse\(\{ status: \d+, description: '[^']*' \}\)/g,
        '$&\n    @ApiResponse({ status: 403, description: \'No autorizado\' })'
    );

    fs.writeFileSync(controllerPath, content);
    console.log(`✅ Autorización aplicada a ${controllerName}`);
}

// Aplicar a todos los controladores
controllers.forEach(applyAuthorizationToController);

console.log('\n🎉 Autorización aplicada a todos los controladores');
console.log('\n📝 Recuerda actualizar los módulos correspondientes para importar AuthModule'); 