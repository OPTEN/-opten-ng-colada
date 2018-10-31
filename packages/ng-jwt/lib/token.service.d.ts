import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtTokenRequest } from './jwt-token-request';
import { JwtConfig } from './token.config';
import { JwtTokenResponse } from './jwt-token-response';
export declare class TokenService {
    private config;
    private http;
    constructor(config: JwtConfig, http: HttpClient);
    token(request: JwtTokenRequest): Observable<JwtTokenResponse>;
    /**
     * This method gets the token from the storage
     * check if it is still valid if it is it will be returned
     * otherwise the token endpoint will be called to create a new token
     * with the refresh_token
     */
    get(): Observable<JwtTokenResponse>;
}
