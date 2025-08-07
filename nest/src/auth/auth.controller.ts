import {
    Controller,
    Post,
    Body,
    UseGuards,
    Get,
    Request,
    HttpCode,
    HttpStatus,
    Res,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService, UserResponse } from './auth.service';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto';
import { AuthResponseEntity, RefreshTokenResponseEntity } from './entities/auth.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { Response } from 'express';


@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: 'Iniciar sesión' })
    @ApiResponse({
        status: 200,
        description: 'Login exitoso',
        type: AuthResponseEntity,
    })
    @ApiResponse({
        status: 401,
        description: 'Credenciales inválidas',
    })
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        const result = await this.authService.login(loginDto);
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
    }

    @Public()
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Registrar nuevo usuario' })
    @ApiResponse({
        status: 201,
        description: 'Usuario registrado exitosamente',
        type: AuthResponseEntity,
    })
    @ApiResponse({
        status: 409,
        description: 'El usuario ya existe',
    })
    async register(@Body() registerDto: RegisterDto) {
        return await this.authService.register(registerDto);
    }

    @Public()
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Renovar token de acceso' })
    @ApiResponse({
        status: 200,
        description: 'Token renovado exitosamente',
        type: RefreshTokenResponseEntity,
    })
    @ApiResponse({
        status: 401,
        description: 'Refresh token inválido',
    })
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        return await this.authService.refreshToken(refreshTokenDto);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
    @ApiResponse({
        status: 200,
        description: 'Perfil del usuario',
    })
    @ApiResponse({
        status: 401,
        description: 'No autorizado',
    })
    async getProfile(@CurrentUser() user) {
        const profileData = await this.authService.getProfile(user.id);

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            ...profileData,
        };
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Cerrar sesión' })
    @ApiResponse({
        status: 200,
        description: 'Sesión cerrada exitosamente',
    })
    async logout(@CurrentUser() user) {
        // En una implementación más avanzada, aquí se invalidaría el refresh token
        return {
            message: 'Sesión cerrada exitosamente',
        };
    }
} 