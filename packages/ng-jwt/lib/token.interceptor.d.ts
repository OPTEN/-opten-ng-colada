import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtConfig } from './token.config';
import { TokenService } from './token.service';
export declare class JwtInterceptor implements HttpInterceptor {
    private _config;
    private tokenService;
    private _isRefreshingToken;
    private _tokenSubject;
    constructor(_config: JwtConfig, tokenService: TokenService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    private _addToken;
    private _isWhitelistedHost;
    private _getHost;
}
