import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import { JwtTokenResponse } from './jwt-token-response';

export type JwtConfig = {
	tokenEndpoint: string;
	headerName: string;
	authScheme: string;
	whitelistedDomains: Array<string>;
	setToken: (token: JwtTokenResponse) => void;
	getToken: () => Observable<JwtTokenResponse>;
};

export const JWT_CONFIG = new InjectionToken<JwtConfig>('jwt-config');
