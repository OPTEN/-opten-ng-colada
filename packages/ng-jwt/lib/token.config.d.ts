import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtTokenResponse } from './jwt-token-response';
export declare type JwtConfig = {
    tokenEndpoint: string;
    headerName: string;
    authScheme: string;
    whitelistedDomains: Array<string>;
    setToken: (token: JwtTokenResponse) => void;
    getToken: () => Observable<JwtTokenResponse>;
};
export declare const JWT_CONFIG: InjectionToken<JwtConfig>;
