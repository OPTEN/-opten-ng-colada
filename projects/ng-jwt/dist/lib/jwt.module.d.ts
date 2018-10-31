import { ModuleWithProviders } from '@angular/core';
import { JwtConfig } from './token.config';
export declare class JwtModule {
    constructor(parentModule: JwtModule);
    static forRoot(config: JwtConfig): ModuleWithProviders;
}
