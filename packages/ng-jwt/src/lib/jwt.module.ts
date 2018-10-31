import {
	NgModule,
	Optional,
	SkipSelf,
	ModuleWithProviders
} from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtConfig, JWT_CONFIG } from './token.config';
import { JwtInterceptor } from './token.interceptor';
import { TokenService } from './token.service';

@NgModule()
export class JwtModule {
	constructor(
		@Optional()
		@SkipSelf()
		parentModule: JwtModule
	) {
		if (parentModule) {
			throw new Error(
				`JwtModule is already loaded. It should only be imported in your application's main module.`
			);
		}
	}

	static forRoot(config: JwtConfig): ModuleWithProviders {
		return {
			ngModule: JwtModule,
			providers: [
				{
					provide: HTTP_INTERCEPTORS,
					useClass: JwtInterceptor,
					multi: true
				},
				{
					provide: JWT_CONFIG,
					useValue: config
				},
				TokenService
			]
		};
	}
}
