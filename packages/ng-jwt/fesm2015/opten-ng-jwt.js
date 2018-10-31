import { InjectionToken, Injectable, Inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { of, BehaviorSubject } from 'rxjs';
import { mergeMap, map, finalize, filter, take, switchMap } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @param {?} token
 * @return {?}
 */
function getTokenExpirationDate(token) {
    if (!token || token == null || !token.expiration) {
        return null;
    }
    /** @type {?} */
    const date = new Date(0);
    date.setUTCSeconds(token.expiration);
    return date;
}
/**
 * @param {?} token
 * @param {?=} offsetSeconds
 * @return {?}
 */
function isTokenExpired(token, offsetSeconds) {
    offsetSeconds = offsetSeconds || 0;
    /** @type {?} */
    const date = getTokenExpirationDate(token);
    if (!date || date == null) {
        return true;
    }
    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const JWT_CONFIG = new InjectionToken('jwt-config');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class TokenService {
    /**
     * @param {?} config
     * @param {?} http
     */
    constructor(config, http) {
        this.config = config;
        this.http = http;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    token(request) {
        return this.http
            .post(this.config.tokenEndpoint, request, {
            headers: { 'Skip-Token': 'true' }
        })
            .pipe(map(token => {
            if (token && token.access_token) {
                // store token
                this.config.setToken(token);
            }
            return token;
        }));
    }
    /**
     * This method gets the token from the storage
     * check if it is still valid if it is it will be returned
     * otherwise the token endpoint will be called to create a new token
     * with the refresh_token
     * @return {?}
     */
    get() {
        return this.config.getToken().pipe(mergeMap(token => {
            if (token && isTokenExpired(token)) {
                /** @type {?} */
                const request = {
                    grant_type: 'refresh_token',
                    refresh_token: token.refresh_token
                };
                // todo: should we call authenticate? so we also set the member?
                return this.token(request);
            }
            return of(token);
        }));
    }
}
TokenService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TokenService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [JWT_CONFIG,] }] },
    { type: HttpClient }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class JwtInterceptor {
    /**
     * @param {?} _config
     * @param {?} tokenService
     */
    constructor(_config, tokenService) {
        this._config = _config;
        this.tokenService = tokenService;
        this._isRefreshingToken = false;
        this._tokenSubject = new BehaviorSubject(null);
    }
    /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    intercept(request, next) {
        // todo: Is there a way to ignore some intereceptors like Angular 1 have it?
        // https://github.com/angular/angular/issues/18155#issuecomment-326136484
        // If this header is present the token will not be refreshed!
        // Use this for unprotected urls like token endpoint itself,
        // otherwise you will run into an infinite loop.
        /** @type {?} */
        const skipIssuingToken = request.headers.has('Skip-Token');
        // This headers only have "internal" purposes for Angular
        // so we actually don't need to send them to the server!
        /** @type {?} */
        const headers = request.headers.delete('Skip-Token');
        if (skipIssuingToken) {
            return next.handle(request.clone({ headers }));
        }
        else if (this._isRefreshingToken === false) {
            // Thanks to: https://github.com/IntertechInc/http-interceptor-refresh-token
            this._isRefreshingToken = true;
            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call (e.g. for polling).
            this._tokenSubject.next(null);
            return this.tokenService.get().pipe(mergeMap(token => {
                this._tokenSubject.next(token);
                return next.handle(this._addToken(request, headers, token));
            }), finalize(() => (this._isRefreshingToken = false)));
        }
        return this._tokenSubject.pipe(filter(token => token != null), take(1), switchMap(token => next.handle(this._addToken(request, headers, token))));
    }
    /**
     * @param {?} request
     * @param {?} headers
     * @param {?} token
     * @return {?}
     */
    _addToken(request, headers, token) {
        if (token &&
            this._isWhitelistedHost(request.url, this._config.whitelistedDomains)) {
            return request.clone({
                headers: headers.set(this._config.headerName, `${this._config.authScheme}${token.access_token}`)
            });
        }
        return request;
    }
    // todo: @opten/gin-tonic?
    /**
     * @param {?} url
     * @param {?} whitelist
     * @return {?}
     */
    _isWhitelistedHost(url, whitelist) {
        /** @type {?} */
        const host = this._getHost(url);
        return (whitelist
            .map(o => this._getHost(o).toLowerCase())
            .indexOf(host.toLowerCase()) > -1);
    }
    // todo: @opten/gin-tonic?
    /**
     * @param {?} href
     * @return {?}
     */
    _getHost(href) {
        if (window.URL) {
            return new URL(href).host;
        }
        // IE 11
        return href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/)[2];
    }
}
JwtInterceptor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
JwtInterceptor.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [JWT_CONFIG,] }] },
    { type: TokenService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class JwtModule {
    /**
     * @param {?} parentModule
     */
    constructor(parentModule) {
        if (parentModule) {
            throw new Error(`JwtModule is already loaded. It should only be imported in your application's main module.`);
        }
    }
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
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
JwtModule.decorators = [
    { type: NgModule }
];
/** @nocollapse */
JwtModule.ctorParameters = () => [
    { type: JwtModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { isTokenExpired, JwtModule, JWT_CONFIG, TokenService, JwtInterceptor as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0ZW4tbmctand0LmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9Ab3B0ZW4vbmctand0L2xpYi9pcy10b2tlbi1leHBpcmVkLnRzIiwibmc6Ly9Ab3B0ZW4vbmctand0L2xpYi90b2tlbi5jb25maWcudHMiLCJuZzovL0BvcHRlbi9uZy1qd3QvbGliL3Rva2VuLnNlcnZpY2UudHMiLCJuZzovL0BvcHRlbi9uZy1qd3QvbGliL3Rva2VuLmludGVyY2VwdG9yLnRzIiwibmc6Ly9Ab3B0ZW4vbmctand0L2xpYi9qd3QubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEp3dFRva2VuUmVzcG9uc2UgfSBmcm9tICcuL2p3dC10b2tlbi1yZXNwb25zZSc7XHJcblxyXG5mdW5jdGlvbiBnZXRUb2tlbkV4cGlyYXRpb25EYXRlKHRva2VuOiBKd3RUb2tlblJlc3BvbnNlKTogRGF0ZSB7XHJcblx0aWYgKCF0b2tlbiB8fCB0b2tlbiA9PSBudWxsIHx8ICF0b2tlbi5leHBpcmF0aW9uKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdGNvbnN0IGRhdGU6IERhdGUgPSBuZXcgRGF0ZSgwKTsgLy8gVGhlIDAgaGVyZSBpcyB0aGUga2V5LCB3aGljaCBzZXRzIHRoZSBkYXRlIHRvIHRoZSBlcG9jaFxyXG5cdGRhdGUuc2V0VVRDU2Vjb25kcyh0b2tlbi5leHBpcmF0aW9uKTtcclxuXHJcblx0cmV0dXJuIGRhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1Rva2VuRXhwaXJlZChcclxuXHR0b2tlbjogSnd0VG9rZW5SZXNwb25zZSxcclxuXHRvZmZzZXRTZWNvbmRzPzogbnVtYmVyXHJcbik6IGJvb2xlYW4ge1xyXG5cdG9mZnNldFNlY29uZHMgPSBvZmZzZXRTZWNvbmRzIHx8IDA7XHJcblxyXG5cdGNvbnN0IGRhdGU6IERhdGUgPSBnZXRUb2tlbkV4cGlyYXRpb25EYXRlKHRva2VuKTtcclxuXHJcblx0aWYgKCFkYXRlIHx8IGRhdGUgPT0gbnVsbCkge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gIShkYXRlLnZhbHVlT2YoKSA+IG5ldyBEYXRlKCkudmFsdWVPZigpICsgb2Zmc2V0U2Vjb25kcyAqIDEwMDApO1xyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBKd3RUb2tlblJlc3BvbnNlIH0gZnJvbSAnLi9qd3QtdG9rZW4tcmVzcG9uc2UnO1xyXG5cclxuZXhwb3J0IHR5cGUgSnd0Q29uZmlnID0ge1xyXG5cdHRva2VuRW5kcG9pbnQ6IHN0cmluZztcclxuXHRoZWFkZXJOYW1lOiBzdHJpbmc7XHJcblx0YXV0aFNjaGVtZTogc3RyaW5nO1xyXG5cdHdoaXRlbGlzdGVkRG9tYWluczogQXJyYXk8c3RyaW5nPjtcclxuXHRzZXRUb2tlbjogKHRva2VuOiBKd3RUb2tlblJlc3BvbnNlKSA9PiB2b2lkO1xyXG5cdGdldFRva2VuOiAoKSA9PiBPYnNlcnZhYmxlPEp3dFRva2VuUmVzcG9uc2U+O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IEpXVF9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48Snd0Q29uZmlnPignand0LWNvbmZpZycpO1xyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWVyZ2VNYXAsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IGlzVG9rZW5FeHBpcmVkIH0gZnJvbSAnLi9pcy10b2tlbi1leHBpcmVkJztcclxuaW1wb3J0IHsgSnd0VG9rZW5SZXF1ZXN0IH0gZnJvbSAnLi9qd3QtdG9rZW4tcmVxdWVzdCc7XHJcbmltcG9ydCB7IEpXVF9DT05GSUcsIEp3dENvbmZpZyB9IGZyb20gJy4vdG9rZW4uY29uZmlnJztcclxuaW1wb3J0IHsgSnd0VG9rZW5SZXNwb25zZSB9IGZyb20gJy4vand0LXRva2VuLXJlc3BvbnNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRva2VuU2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRASW5qZWN0KEpXVF9DT05GSUcpIHByaXZhdGUgY29uZmlnOiBKd3RDb25maWcsXHJcblx0XHRwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRcclxuXHQpIHt9XHJcblxyXG5cdHRva2VuKHJlcXVlc3Q6IEp3dFRva2VuUmVxdWVzdCk6IE9ic2VydmFibGU8Snd0VG9rZW5SZXNwb25zZT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuaHR0cFxyXG5cdFx0XHQucG9zdDxKd3RUb2tlblJlc3BvbnNlPih0aGlzLmNvbmZpZy50b2tlbkVuZHBvaW50LCByZXF1ZXN0LCB7XHJcblx0XHRcdFx0aGVhZGVyczogeyAnU2tpcC1Ub2tlbic6ICd0cnVlJyB9XHJcblx0XHRcdH0pXHJcblx0XHRcdC5waXBlKFxyXG5cdFx0XHRcdG1hcCh0b2tlbiA9PiB7XHJcblx0XHRcdFx0XHRpZiAodG9rZW4gJiYgdG9rZW4uYWNjZXNzX3Rva2VuKSB7XHJcblx0XHRcdFx0XHRcdC8vIHN0b3JlIHRva2VuXHJcblx0XHRcdFx0XHRcdHRoaXMuY29uZmlnLnNldFRva2VuKHRva2VuKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gdG9rZW47XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoaXMgbWV0aG9kIGdldHMgdGhlIHRva2VuIGZyb20gdGhlIHN0b3JhZ2VcclxuXHQgKiBjaGVjayBpZiBpdCBpcyBzdGlsbCB2YWxpZCBpZiBpdCBpcyBpdCB3aWxsIGJlIHJldHVybmVkXHJcblx0ICogb3RoZXJ3aXNlIHRoZSB0b2tlbiBlbmRwb2ludCB3aWxsIGJlIGNhbGxlZCB0byBjcmVhdGUgYSBuZXcgdG9rZW5cclxuXHQgKiB3aXRoIHRoZSByZWZyZXNoX3Rva2VuXHJcblx0ICovXHJcblx0Z2V0KCk6IE9ic2VydmFibGU8Snd0VG9rZW5SZXNwb25zZT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29uZmlnLmdldFRva2VuKCkucGlwZShcclxuXHRcdFx0bWVyZ2VNYXAodG9rZW4gPT4ge1xyXG5cdFx0XHRcdGlmICh0b2tlbiAmJiBpc1Rva2VuRXhwaXJlZCh0b2tlbikpIHtcclxuXHRcdFx0XHRcdGNvbnN0IHJlcXVlc3Q6IEp3dFRva2VuUmVxdWVzdCA9IHtcclxuXHRcdFx0XHRcdFx0Z3JhbnRfdHlwZTogJ3JlZnJlc2hfdG9rZW4nLFxyXG5cdFx0XHRcdFx0XHRyZWZyZXNoX3Rva2VuOiB0b2tlbi5yZWZyZXNoX3Rva2VuXHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdC8vIHRvZG86IHNob3VsZCB3ZSBjYWxsIGF1dGhlbnRpY2F0ZT8gc28gd2UgYWxzbyBzZXQgdGhlIG1lbWJlcj9cclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLnRva2VuKHJlcXVlc3QpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIG9ic2VydmFibGVPZih0b2tlbik7XHJcblx0XHRcdH0pXHJcblx0XHQpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7XHJcblx0SHR0cFJlcXVlc3QsXHJcblx0SHR0cEhhbmRsZXIsXHJcblx0SHR0cEV2ZW50LFxyXG5cdEh0dHBJbnRlcmNlcHRvcixcclxuXHRIdHRwSGVhZGVyc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtZXJnZU1hcCwgZmluYWxpemUsIGZpbHRlciwgdGFrZSwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgSnd0Q29uZmlnLCBKV1RfQ09ORklHIH0gZnJvbSAnLi90b2tlbi5jb25maWcnO1xyXG5pbXBvcnQgeyBKd3RUb2tlblJlc3BvbnNlIH0gZnJvbSAnLi9qd3QtdG9rZW4tcmVzcG9uc2UnO1xyXG5pbXBvcnQgeyBUb2tlblNlcnZpY2UgfSBmcm9tICcuL3Rva2VuLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSnd0SW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG5cdHByaXZhdGUgX2lzUmVmcmVzaGluZ1Rva2VuID0gZmFsc2U7XHJcblx0cHJpdmF0ZSBfdG9rZW5TdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxKd3RUb2tlblJlc3BvbnNlPihudWxsKTtcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRASW5qZWN0KEpXVF9DT05GSUcpIHByaXZhdGUgX2NvbmZpZzogSnd0Q29uZmlnLFxyXG5cdFx0cHJpdmF0ZSB0b2tlblNlcnZpY2U6IFRva2VuU2VydmljZVxyXG5cdCkge31cclxuXHJcblx0aW50ZXJjZXB0KFxyXG5cdFx0cmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcclxuXHRcdG5leHQ6IEh0dHBIYW5kbGVyXHJcblx0KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xyXG5cdFx0Ly8gdG9kbzogSXMgdGhlcmUgYSB3YXkgdG8gaWdub3JlIHNvbWUgaW50ZXJlY2VwdG9ycyBsaWtlIEFuZ3VsYXIgMSBoYXZlIGl0P1xyXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTgxNTUjaXNzdWVjb21tZW50LTMyNjEzNjQ4NFxyXG5cdFx0Ly8gSWYgdGhpcyBoZWFkZXIgaXMgcHJlc2VudCB0aGUgdG9rZW4gd2lsbCBub3QgYmUgcmVmcmVzaGVkIVxyXG5cdFx0Ly8gVXNlIHRoaXMgZm9yIHVucHJvdGVjdGVkIHVybHMgbGlrZSB0b2tlbiBlbmRwb2ludCBpdHNlbGYsXHJcblx0XHQvLyBvdGhlcndpc2UgeW91IHdpbGwgcnVuIGludG8gYW4gaW5maW5pdGUgbG9vcC5cclxuXHRcdGNvbnN0IHNraXBJc3N1aW5nVG9rZW46IGJvb2xlYW4gPSByZXF1ZXN0LmhlYWRlcnMuaGFzKCdTa2lwLVRva2VuJyk7XHJcblxyXG5cdFx0Ly8gVGhpcyBoZWFkZXJzIG9ubHkgaGF2ZSBcImludGVybmFsXCIgcHVycG9zZXMgZm9yIEFuZ3VsYXJcclxuXHRcdC8vIHNvIHdlIGFjdHVhbGx5IGRvbid0IG5lZWQgdG8gc2VuZCB0aGVtIHRvIHRoZSBzZXJ2ZXIhXHJcblx0XHRjb25zdCBoZWFkZXJzID0gcmVxdWVzdC5oZWFkZXJzLmRlbGV0ZSgnU2tpcC1Ub2tlbicpO1xyXG5cclxuXHRcdGlmIChza2lwSXNzdWluZ1Rva2VuKSB7XHJcblx0XHRcdHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0LmNsb25lKHsgaGVhZGVycyB9KSk7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuX2lzUmVmcmVzaGluZ1Rva2VuID09PSBmYWxzZSkge1xyXG5cdFx0XHQvLyBUaGFua3MgdG86IGh0dHBzOi8vZ2l0aHViLmNvbS9JbnRlcnRlY2hJbmMvaHR0cC1pbnRlcmNlcHRvci1yZWZyZXNoLXRva2VuXHJcblx0XHRcdHRoaXMuX2lzUmVmcmVzaGluZ1Rva2VuID0gdHJ1ZTtcclxuXHJcblx0XHRcdC8vIFJlc2V0IGhlcmUgc28gdGhhdCB0aGUgZm9sbG93aW5nIHJlcXVlc3RzIHdhaXQgdW50aWwgdGhlIHRva2VuXHJcblx0XHRcdC8vIGNvbWVzIGJhY2sgZnJvbSB0aGUgcmVmcmVzaFRva2VuIGNhbGwgKGUuZy4gZm9yIHBvbGxpbmcpLlxyXG5cdFx0XHR0aGlzLl90b2tlblN1YmplY3QubmV4dChudWxsKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLnRva2VuU2VydmljZS5nZXQoKS5waXBlKFxyXG5cdFx0XHRcdG1lcmdlTWFwKHRva2VuID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuX3Rva2VuU3ViamVjdC5uZXh0KHRva2VuKTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gbmV4dC5oYW5kbGUodGhpcy5fYWRkVG9rZW4ocmVxdWVzdCwgaGVhZGVycywgdG9rZW4pKTtcclxuXHRcdFx0XHR9KSxcclxuXHRcdFx0XHRmaW5hbGl6ZSgoKSA9PiAodGhpcy5faXNSZWZyZXNoaW5nVG9rZW4gPSBmYWxzZSkpXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3Rva2VuU3ViamVjdC5waXBlKFxyXG5cdFx0XHRmaWx0ZXIodG9rZW4gPT4gdG9rZW4gIT0gbnVsbCksXHJcblx0XHRcdHRha2UoMSksXHJcblx0XHRcdHN3aXRjaE1hcCh0b2tlbiA9PlxyXG5cdFx0XHRcdG5leHQuaGFuZGxlKHRoaXMuX2FkZFRva2VuKHJlcXVlc3QsIGhlYWRlcnMsIHRva2VuKSlcclxuXHRcdFx0KVxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgX2FkZFRva2VuKFxyXG5cdFx0cmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcclxuXHRcdGhlYWRlcnM6IEh0dHBIZWFkZXJzLFxyXG5cdFx0dG9rZW46IEp3dFRva2VuUmVzcG9uc2VcclxuXHQpOiBIdHRwUmVxdWVzdDxhbnk+IHtcclxuXHRcdGlmIChcclxuXHRcdFx0dG9rZW4gJiZcclxuXHRcdFx0dGhpcy5faXNXaGl0ZWxpc3RlZEhvc3QoXHJcblx0XHRcdFx0cmVxdWVzdC51cmwsXHJcblx0XHRcdFx0dGhpcy5fY29uZmlnLndoaXRlbGlzdGVkRG9tYWluc1xyXG5cdFx0XHQpXHJcblx0XHQpIHtcclxuXHRcdFx0cmV0dXJuIHJlcXVlc3QuY2xvbmUoe1xyXG5cdFx0XHRcdGhlYWRlcnM6IGhlYWRlcnMuc2V0KFxyXG5cdFx0XHRcdFx0dGhpcy5fY29uZmlnLmhlYWRlck5hbWUsXHJcblx0XHRcdFx0XHRgJHt0aGlzLl9jb25maWcuYXV0aFNjaGVtZX0ke3Rva2VuLmFjY2Vzc190b2tlbn1gXHJcblx0XHRcdFx0KVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVxdWVzdDtcclxuXHR9XHJcblxyXG5cdC8vIHRvZG86IEBvcHRlbi9naW4tdG9uaWM/XHJcblx0cHJpdmF0ZSBfaXNXaGl0ZWxpc3RlZEhvc3QodXJsOiBzdHJpbmcsIHdoaXRlbGlzdDogQXJyYXk8c3RyaW5nPik6IGJvb2xlYW4ge1xyXG5cdFx0Y29uc3QgaG9zdDogc3RyaW5nID0gdGhpcy5fZ2V0SG9zdCh1cmwpO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdHdoaXRlbGlzdFxyXG5cdFx0XHRcdC5tYXAobyA9PiB0aGlzLl9nZXRIb3N0KG8pLnRvTG93ZXJDYXNlKCkpXHJcblx0XHRcdFx0LmluZGV4T2YoaG9zdC50b0xvd2VyQ2FzZSgpKSA+IC0xXHJcblx0XHQpO1xyXG5cdH1cclxuXHJcblx0Ly8gdG9kbzogQG9wdGVuL2dpbi10b25pYz9cclxuXHRwcml2YXRlIF9nZXRIb3N0KGhyZWY6IHN0cmluZykge1xyXG5cdFx0aWYgKHdpbmRvdy5VUkwpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBVUkwoaHJlZikuaG9zdDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBJRSAxMVxyXG5cdFx0cmV0dXJuIGhyZWYubWF0Y2goXHJcblx0XHRcdC9eKGh0dHBzP1xcOilcXC9cXC8oKFteOlxcLz8jXSopKD86XFw6KFswLTldKykpPykoW1xcL117MCwxfVtePyNdKikoXFw/W14jXSp8KSgjLip8KSQvXHJcblx0XHQpWzJdO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG5cdE5nTW9kdWxlLFxyXG5cdE9wdGlvbmFsLFxyXG5cdFNraXBTZWxmLFxyXG5cdE1vZHVsZVdpdGhQcm92aWRlcnNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgSnd0Q29uZmlnLCBKV1RfQ09ORklHIH0gZnJvbSAnLi90b2tlbi5jb25maWcnO1xyXG5pbXBvcnQgeyBKd3RJbnRlcmNlcHRvciB9IGZyb20gJy4vdG9rZW4uaW50ZXJjZXB0b3InO1xyXG5pbXBvcnQgeyBUb2tlblNlcnZpY2UgfSBmcm9tICcuL3Rva2VuLnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKClcclxuZXhwb3J0IGNsYXNzIEp3dE1vZHVsZSB7XHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRAT3B0aW9uYWwoKVxyXG5cdFx0QFNraXBTZWxmKClcclxuXHRcdHBhcmVudE1vZHVsZTogSnd0TW9kdWxlXHJcblx0KSB7XHJcblx0XHRpZiAocGFyZW50TW9kdWxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcclxuXHRcdFx0XHRgSnd0TW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJdCBzaG91bGQgb25seSBiZSBpbXBvcnRlZCBpbiB5b3VyIGFwcGxpY2F0aW9uJ3MgbWFpbiBtb2R1bGUuYFxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGZvclJvb3QoY29uZmlnOiBKd3RDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG5nTW9kdWxlOiBKd3RNb2R1bGUsXHJcblx0XHRcdHByb3ZpZGVyczogW1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLFxyXG5cdFx0XHRcdFx0dXNlQ2xhc3M6IEp3dEludGVyY2VwdG9yLFxyXG5cdFx0XHRcdFx0bXVsdGk6IHRydWVcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHByb3ZpZGU6IEpXVF9DT05GSUcsXHJcblx0XHRcdFx0XHR1c2VWYWx1ZTogY29uZmlnXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRUb2tlblNlcnZpY2VcclxuXHRcdFx0XVxyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuIl0sIm5hbWVzIjpbIm9ic2VydmFibGVPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUVBLFNBQVMsc0JBQXNCLENBQUMsS0FBdUI7SUFDdEQsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtRQUNqRCxPQUFPLElBQUksQ0FBQztLQUNaOztVQUVLLElBQUksR0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDOUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFckMsT0FBTyxJQUFJLENBQUM7Q0FDWjs7Ozs7O0FBRUQsU0FBZ0IsY0FBYyxDQUM3QixLQUF1QixFQUN2QixhQUFzQjtJQUV0QixhQUFhLEdBQUcsYUFBYSxJQUFJLENBQUMsQ0FBQzs7VUFFN0IsSUFBSSxHQUFTLHNCQUFzQixDQUFDLEtBQUssQ0FBQztJQUVoRCxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7UUFDMUIsT0FBTyxJQUFJLENBQUM7S0FDWjtJQUVELE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUM7Q0FDdkU7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQkQ7QUFlQSxNQUFhLFVBQVUsR0FBRyxJQUFJLGNBQWMsQ0FBWSxZQUFZLENBQUM7Ozs7OztBQ2ZyRSxNQWFhLFlBQVk7Ozs7O0lBQ3hCLFlBQzZCLE1BQWlCLEVBQ3JDLElBQWdCO1FBREksV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNyQyxTQUFJLEdBQUosSUFBSSxD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