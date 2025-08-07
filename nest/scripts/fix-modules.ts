import * as fs from 'fs';
import * as path from 'path';

// Lista de módulos a corregir
const modules = [
    'users',
    'members',
    'sponsors',
    'payments',
    'roles',
    'permissions'
];

function fixModuleImports(moduleName: string) {
    const modulePath = path.join(__dirname, '..', 'src', moduleName, `${moduleName}.module.ts`);

    if (!fs.existsSync(modulePath)) {
        console.log(`⚠️  Módulo ${moduleName} no encontrado`);
        return;
    }

    let content = fs.readFileSync(modulePath, 'utf8');

    // Corregir imports mal formateados
    content = content.replace(
        /import \{ AuthModule \} from '\.\.\/auth\/auth\.module';/g,
        "import { AuthModule } from '../auth/auth.module';"
    );

    // Asegurar que AuthModule esté en imports
    if (!content.includes('imports: [AuthModule]')) {
        content = content.replace(
            /@Module\(\{/g,
            "@Module({\n    imports: [AuthModule],"
        );
    }

    fs.writeFileSync(modulePath, content);
    console.log(`✅ Módulo ${moduleName} corregido`);
}

// Corregir todos los módulos
modules.forEach(fixModuleImports);

console.log('\n🎉 Todos los módulos corregidos'); 