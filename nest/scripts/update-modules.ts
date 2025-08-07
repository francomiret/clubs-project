import * as fs from 'fs';
import * as path from 'path';

// Lista de módulos a actualizar
const modules = [
    'users',
    'members',
    'sponsors',
    'payments',
    'roles',
    'permissions'
];

function updateModule(moduleName: string) {
    const modulePath = path.join(__dirname, '..', 'src', moduleName, `${moduleName}.module.ts`);

    if (!fs.existsSync(modulePath)) {
        console.log(`⚠️  Módulo ${moduleName} no encontrado`);
        return;
    }

    let content = fs.readFileSync(modulePath, 'utf8');

    // Agregar import de AuthModule
    if (!content.includes('AuthModule')) {
        const importIndex = content.lastIndexOf('import');
        const lastImportLine = content.substring(importIndex).split('\n')[0];
        const insertIndex = content.indexOf(lastImportLine) + lastImportLine.length;

        content = content.slice(0, insertIndex) +
            '\nimport { AuthModule } from \'../auth/auth.module\';' +
            content.slice(insertIndex);
    }

    // Agregar AuthModule a imports
    if (!content.includes('AuthModule')) {
        content = content.replace(
            '@Module({',
            '@Module({\n    imports: [AuthModule],'
        );
    }

    fs.writeFileSync(modulePath, content);
    console.log(`✅ Módulo ${moduleName} actualizado`);
}

// Actualizar todos los módulos
modules.forEach(updateModule);

console.log('\n🎉 Todos los módulos actualizados'); 