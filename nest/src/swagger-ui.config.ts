export const swaggerUiOptions = {
    swaggerOptions: {
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
        docExpansion: 'list',
        filter: true,
        showRequestDuration: true,
        tryItOutEnabled: true,
        requestInterceptor: (req: any) => {
            req.headers['Content-Type'] = 'application/json';
            return req;
        },
    },
    customSiteTitle: 'Clubs API Documentation',
    customCss: `
        .swagger-ui .topbar { display: none }
        .swagger-ui .info .title { color: #2c3e50; }
        .swagger-ui .info .description { color: #34495e; }
    `,
}; 