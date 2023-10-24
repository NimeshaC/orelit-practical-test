"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const nest_winston_1 = require("nest-winston");
const custom_logger_1 = require("./core/custom-logger");
async function bootstrap() {
    const customLoggerService = new custom_logger_1.CustomLoggerService();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: nest_winston_1.WinstonModule.createLogger(customLoggerService.createLoggerConfig),
    });
    app.setGlobalPrefix("api");
    await app.listen(process.env.PORT || 8000);
    console.log(`⚡️[server]: Server is running at : ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map