(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@opten/ng-jwt', ['exports', '@angular/core', '@angular/common/http', 'rxjs', 'rxjs/operators'], factory) :
    (factory((global.opten = global.opten || {}, global.opten['ng-jwt'] = {}),global.ng.core,global.ng.common.http,global.rxjs,global.rxjs.operators));
}(this, (function (exports,core,http,rxjs,operators) { 'use strict';

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
        var date = new Date(0);
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
        var date = getTokenExpirationDate(token);
        if (!date || date == null) {
            return true;
        }
        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var JWT_CONFIG = new core.InjectionToken('jwt-config');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var TokenService = /** @class */ (function () {
        function TokenService(config, http$$1) {
            this.config = config;
            this.http = http$$1;
        }
        /**
         * @param {?} request
         * @return {?}
         */
        TokenService.prototype.token = /**
         * @param {?} request
         * @return {?}
         */
            function (request) {
                var _this = this;
                return this.http
                    .post(this.config.tokenEndpoint, request, {
                    headers: { 'Skip-Token': 'true' }
                })
                    .pipe(operators.map(function (token) {
                    if (token && token.access_token) {
                        // store token
                        _this.config.setToken(token);
                    }
                    return token;
                }));
            };
        /**
         * This method gets the token from the storage
         * check if it is still valid if it is it will be returned
         * otherwise the token endpoint will be called to create a new token
         * with the refresh_token
         */
        /**
         * This method gets the token from the storage
         * check if it is still valid if it is it will be returned
         * otherwise the token endpoint will be called to create a new token
         * with the refresh_token
         * @return {?}
         */
        TokenService.prototype.get = /**
         * This method gets the token from the storage
         * check if it is still valid if it is it will be returned
         * otherwise the token endpoint will be called to create a new token
         * with the refresh_token
         * @return {?}
         */
            function () {
                var _this = this;
                return this.config.getToken().pipe(operators.mergeMap(function (token) {
                    if (token && isTokenExpired(token)) {
                        /** @type {?} */
                        var request = {
                            grant_type: 'refresh_token',
                            refresh_token: token.refresh_token
                        };
                        // todo: should we call authenticate? so we also set the member?
                        return _this.token(request);
                    }
                    return rxjs.of(token);
                }));
            };
        TokenService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        TokenService.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [JWT_CONFIG,] }] },
                { type: http.HttpClient }
            ];
        };
        return TokenService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var JwtInterceptor = /** @class */ (function () {
        function JwtInterceptor(_config, tokenService) {
            this._config = _config;
            this.tokenService = tokenService;
            this._isRefreshingToken = false;
            this._tokenSubject = new rxjs.BehaviorSubject(null);
        }
        /**
         * @param {?} request
         * @param {?} next
         * @return {?}
         */
        JwtInterceptor.prototype.intercept = /**
         * @param {?} request
         * @param {?} next
         * @return {?}
         */
            function (request, next) {
                var _this = this;
                // todo: Is there a way to ignore some intereceptors like Angular 1 have it?
                // https://github.com/angular/angular/issues/18155#issuecomment-326136484
                // If this header is present the token will not be refreshed!
                // Use this for unprotected urls like token endpoint itself,
                // otherwise you will run into an infinite loop.
                /** @type {?} */
                var skipIssuingToken = request.headers.has('Skip-Token');
                // This headers only have "internal" purposes for Angular
                // so we actually don't need to send them to the server!
                /** @type {?} */
                var headers = request.headers.delete('Skip-Token');
                if (skipIssuingToken) {
                    return next.handle(request.clone({ headers: headers }));
                }
                else if (this._isRefreshingToken === false) {
                    // Thanks to: https://github.com/IntertechInc/http-interceptor-refresh-token
                    this._isRefreshingToken = true;
                    // Reset here so that the following requests wait until the token
                    // comes back from the refreshToken call (e.g. for polling).
                    this._tokenSubject.next(null);
                    return this.tokenService.get().pipe(operators.mergeMap(function (token) {
                        _this._tokenSubject.next(token);
                        return next.handle(_this._addToken(request, headers, token));
                    }), operators.finalize(function () { return (_this._isRefreshingToken = false); }));
                }
                return this._tokenSubject.pipe(operators.filter(function (token) { return token != null; }), operators.take(1), operators.switchMap(function (token) {
                    return next.handle(_this._addToken(request, headers, token));
                }));
            };
        /**
         * @param {?} request
         * @param {?} headers
         * @param {?} token
         * @return {?}
         */
        JwtInterceptor.prototype._addToken = /**
         * @param {?} request
         * @param {?} headers
         * @param {?} token
         * @return {?}
         */
            function (request, headers, token) {
                if (token &&
                    this._isWhitelistedHost(request.url, this._config.whitelistedDomains)) {
                    return request.clone({
                        headers: headers.set(this._config.headerName, "" + this._config.authScheme + token.access_token)
                    });
                }
                return request;
            };
        // todo: @opten/gin-tonic?
        // todo: @opten/gin-tonic?
        /**
         * @param {?} url
         * @param {?} whitelist
         * @return {?}
         */
        JwtInterceptor.prototype._isWhitelistedHost =
            // todo: @opten/gin-tonic?
            /**
             * @param {?} url
             * @param {?} whitelist
             * @return {?}
             */
            function (url, whitelist) {
                var _this = this;
                /** @type {?} */
                var host = this._getHost(url);
                return (whitelist
                    .map(function (o) { return _this._getHost(o).toLowerCase(); })
                    .indexOf(host.toLowerCase()) > -1);
            };
        // todo: @opten/gin-tonic?
        // todo: @opten/gin-tonic?
        /**
         * @param {?} href
         * @return {?}
         */
        JwtInterceptor.prototype._getHost =
            // todo: @opten/gin-tonic?
            /**
             * @param {?} href
             * @return {?}
             */
            function (href) {
                if (window.URL) {
                    return new URL(href).host;
                }
                // IE 11
                return href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/)[2];
            };
        JwtInterceptor.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        JwtInterceptor.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [JWT_CONFIG,] }] },
                { type: TokenService }
            ];
        };
        return JwtInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var JwtModule = /** @class */ (function () {
        function JwtModule(parentModule) {
            if (parentModule) {
                throw new Error("JwtModule is already loaded. It should only be imported in your application's main module.");
            }
        }
        /**
         * @param {?} config
         * @return {?}
         */
        JwtModule.forRoot = /**
         * @param {?} config
         * @return {?}
         */
            function (config) {
                return {
                    ngModule: JwtModule,
                    providers: [
                        {
                            provide: http.HTTP_INTERCEPTORS,
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
            };
        JwtModule.decorators = [
            { type: core.NgModule }
        ];
        /** @nocollapse */
        JwtModule.ctorParameters = function () {
            return [
                { type: JwtModule, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] }
            ];
        };
        return JwtModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    exports.isTokenExpired = isTokenExpired;
    exports.JwtModule = JwtModule;
    exports.JWT_CONFIG = JWT_CONFIG;
    exports.TokenService = TokenService;
    exports.ɵa = JwtInterceptor;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0ZW4tbmctand0LnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQG9wdGVuL25nLWp3dC9saWIvaXMtdG9rZW4tZXhwaXJlZC50cyIsIm5nOi8vQG9wdGVuL25nLWp3dC9saWIvdG9rZW4uY29uZmlnLnRzIiwibmc6Ly9Ab3B0ZW4vbmctand0L2xpYi90b2tlbi5zZXJ2aWNlLnRzIiwibmc6Ly9Ab3B0ZW4vbmctand0L2xpYi90b2tlbi5pbnRlcmNlcHRvci50cyIsIm5nOi8vQG9wdGVuL25nLWp3dC9saWIvand0Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKd3RUb2tlblJlc3BvbnNlIH0gZnJvbSAnLi9qd3QtdG9rZW4tcmVzcG9uc2UnO1xyXG5cclxuZnVuY3Rpb24gZ2V0VG9rZW5FeHBpcmF0aW9uRGF0ZSh0b2tlbjogSnd0VG9rZW5SZXNwb25zZSk6IERhdGUge1xyXG5cdGlmICghdG9rZW4gfHwgdG9rZW4gPT0gbnVsbCB8fCAhdG9rZW4uZXhwaXJhdGlvbikge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRjb25zdCBkYXRlOiBEYXRlID0gbmV3IERhdGUoMCk7IC8vIFRoZSAwIGhlcmUgaXMgdGhlIGtleSwgd2hpY2ggc2V0cyB0aGUgZGF0ZSB0byB0aGUgZXBvY2hcclxuXHRkYXRlLnNldFVUQ1NlY29uZHModG9rZW4uZXhwaXJhdGlvbik7XHJcblxyXG5cdHJldHVybiBkYXRlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNUb2tlbkV4cGlyZWQoXHJcblx0dG9rZW46IEp3dFRva2VuUmVzcG9uc2UsXHJcblx0b2Zmc2V0U2Vjb25kcz86IG51bWJlclxyXG4pOiBib29sZWFuIHtcclxuXHRvZmZzZXRTZWNvbmRzID0gb2Zmc2V0U2Vjb25kcyB8fCAwO1xyXG5cclxuXHRjb25zdCBkYXRlOiBEYXRlID0gZ2V0VG9rZW5FeHBpcmF0aW9uRGF0ZSh0b2tlbik7XHJcblxyXG5cdGlmICghZGF0ZSB8fCBkYXRlID09IG51bGwpIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuICEoZGF0ZS52YWx1ZU9mKCkgPiBuZXcgRGF0ZSgpLnZhbHVlT2YoKSArIG9mZnNldFNlY29uZHMgKiAxMDAwKTtcclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgSnd0VG9rZW5SZXNwb25zZSB9IGZyb20gJy4vand0LXRva2VuLXJlc3BvbnNlJztcclxuXHJcbmV4cG9ydCB0eXBlIEp3dENvbmZpZyA9IHtcclxuXHR0b2tlbkVuZHBvaW50OiBzdHJpbmc7XHJcblx0aGVhZGVyTmFtZTogc3RyaW5nO1xyXG5cdGF1dGhTY2hlbWU6IHN0cmluZztcclxuXHR3aGl0ZWxpc3RlZERvbWFpbnM6IEFycmF5PHN0cmluZz47XHJcblx0c2V0VG9rZW46ICh0b2tlbjogSnd0VG9rZW5SZXNwb25zZSkgPT4gdm9pZDtcclxuXHRnZXRUb2tlbjogKCkgPT4gT2JzZXJ2YWJsZTxKd3RUb2tlblJlc3BvbnNlPjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBKV1RfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPEp3dENvbmZpZz4oJ2p3dC1jb25maWcnKTtcclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1lcmdlTWFwLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBpc1Rva2VuRXhwaXJlZCB9IGZyb20gJy4vaXMtdG9rZW4tZXhwaXJlZCc7XHJcbmltcG9ydCB7IEp3dFRva2VuUmVxdWVzdCB9IGZyb20gJy4vand0LXRva2VuLXJlcXVlc3QnO1xyXG5pbXBvcnQgeyBKV1RfQ09ORklHLCBKd3RDb25maWcgfSBmcm9tICcuL3Rva2VuLmNvbmZpZyc7XHJcbmltcG9ydCB7IEp3dFRva2VuUmVzcG9uc2UgfSBmcm9tICcuL2p3dC10b2tlbi1yZXNwb25zZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBUb2tlblNlcnZpY2Uge1xyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0QEluamVjdChKV1RfQ09ORklHKSBwcml2YXRlIGNvbmZpZzogSnd0Q29uZmlnLFxyXG5cdFx0cHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50XHJcblx0KSB7fVxyXG5cclxuXHR0b2tlbihyZXF1ZXN0OiBKd3RUb2tlblJlcXVlc3QpOiBPYnNlcnZhYmxlPEp3dFRva2VuUmVzcG9uc2U+IHtcclxuXHRcdHJldHVybiB0aGlzLmh0dHBcclxuXHRcdFx0LnBvc3Q8Snd0VG9rZW5SZXNwb25zZT4odGhpcy5jb25maWcudG9rZW5FbmRwb2ludCwgcmVxdWVzdCwge1xyXG5cdFx0XHRcdGhlYWRlcnM6IHsgJ1NraXAtVG9rZW4nOiAndHJ1ZScgfVxyXG5cdFx0XHR9KVxyXG5cdFx0XHQucGlwZShcclxuXHRcdFx0XHRtYXAodG9rZW4gPT4ge1xyXG5cdFx0XHRcdFx0aWYgKHRva2VuICYmIHRva2VuLmFjY2Vzc190b2tlbikge1xyXG5cdFx0XHRcdFx0XHQvLyBzdG9yZSB0b2tlblxyXG5cdFx0XHRcdFx0XHR0aGlzLmNvbmZpZy5zZXRUb2tlbih0b2tlbik7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIHRva2VuO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGlzIG1ldGhvZCBnZXRzIHRoZSB0b2tlbiBmcm9tIHRoZSBzdG9yYWdlXHJcblx0ICogY2hlY2sgaWYgaXQgaXMgc3RpbGwgdmFsaWQgaWYgaXQgaXMgaXQgd2lsbCBiZSByZXR1cm5lZFxyXG5cdCAqIG90aGVyd2lzZSB0aGUgdG9rZW4gZW5kcG9pbnQgd2lsbCBiZSBjYWxsZWQgdG8gY3JlYXRlIGEgbmV3IHRva2VuXHJcblx0ICogd2l0aCB0aGUgcmVmcmVzaF90b2tlblxyXG5cdCAqL1xyXG5cdGdldCgpOiBPYnNlcnZhYmxlPEp3dFRva2VuUmVzcG9uc2U+IHtcclxuXHRcdHJldHVybiB0aGlzLmNvbmZpZy5nZXRUb2tlbigpLnBpcGUoXHJcblx0XHRcdG1lcmdlTWFwKHRva2VuID0+IHtcclxuXHRcdFx0XHRpZiAodG9rZW4gJiYgaXNUb2tlbkV4cGlyZWQodG9rZW4pKSB7XHJcblx0XHRcdFx0XHRjb25zdCByZXF1ZXN0OiBKd3RUb2tlblJlcXVlc3QgPSB7XHJcblx0XHRcdFx0XHRcdGdyYW50X3R5cGU6ICdyZWZyZXNoX3Rva2VuJyxcclxuXHRcdFx0XHRcdFx0cmVmcmVzaF90b2tlbjogdG9rZW4ucmVmcmVzaF90b2tlblxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHQvLyB0b2RvOiBzaG91bGQgd2UgY2FsbCBhdXRoZW50aWNhdGU/IHNvIHdlIGFsc28gc2V0IHRoZSBtZW1iZXI/XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy50b2tlbihyZXF1ZXN0KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBvYnNlcnZhYmxlT2YodG9rZW4pO1xyXG5cdFx0XHR9KVxyXG5cdFx0KTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQge1xyXG5cdEh0dHBSZXF1ZXN0LFxyXG5cdEh0dHBIYW5kbGVyLFxyXG5cdEh0dHBFdmVudCxcclxuXHRIdHRwSW50ZXJjZXB0b3IsXHJcblx0SHR0cEhlYWRlcnNcclxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWVyZ2VNYXAsIGZpbmFsaXplLCBmaWx0ZXIsIHRha2UsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEp3dENvbmZpZywgSldUX0NPTkZJRyB9IGZyb20gJy4vdG9rZW4uY29uZmlnJztcclxuaW1wb3J0IHsgSnd0VG9rZW5SZXNwb25zZSB9IGZyb20gJy4vand0LXRva2VuLXJlc3BvbnNlJztcclxuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi90b2tlbi5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEp3dEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcclxuXHRwcml2YXRlIF9pc1JlZnJlc2hpbmdUb2tlbiA9IGZhbHNlO1xyXG5cdHByaXZhdGUgX3Rva2VuU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Snd0VG9rZW5SZXNwb25zZT4obnVsbCk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0QEluamVjdChKV1RfQ09ORklHKSBwcml2YXRlIF9jb25maWc6IEp3dENvbmZpZyxcclxuXHRcdHByaXZhdGUgdG9rZW5TZXJ2aWNlOiBUb2tlblNlcnZpY2VcclxuXHQpIHt9XHJcblxyXG5cdGludGVyY2VwdChcclxuXHRcdHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXHJcblx0XHRuZXh0OiBIdHRwSGFuZGxlclxyXG5cdCk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcclxuXHRcdC8vIHRvZG86IElzIHRoZXJlIGEgd2F5IHRvIGlnbm9yZSBzb21lIGludGVyZWNlcHRvcnMgbGlrZSBBbmd1bGFyIDEgaGF2ZSBpdD9cclxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE4MTU1I2lzc3VlY29tbWVudC0zMjYxMzY0ODRcclxuXHRcdC8vIElmIHRoaXMgaGVhZGVyIGlzIHByZXNlbnQgdGhlIHRva2VuIHdpbGwgbm90IGJlIHJlZnJlc2hlZCFcclxuXHRcdC8vIFVzZSB0aGlzIGZvciB1bnByb3RlY3RlZCB1cmxzIGxpa2UgdG9rZW4gZW5kcG9pbnQgaXRzZWxmLFxyXG5cdFx0Ly8gb3RoZXJ3aXNlIHlvdSB3aWxsIHJ1biBpbnRvIGFuIGluZmluaXRlIGxvb3AuXHJcblx0XHRjb25zdCBza2lwSXNzdWluZ1Rva2VuOiBib29sZWFuID0gcmVxdWVzdC5oZWFkZXJzLmhhcygnU2tpcC1Ub2tlbicpO1xyXG5cclxuXHRcdC8vIFRoaXMgaGVhZGVycyBvbmx5IGhhdmUgXCJpbnRlcm5hbFwiIHB1cnBvc2VzIGZvciBBbmd1bGFyXHJcblx0XHQvLyBzbyB3ZSBhY3R1YWxseSBkb24ndCBuZWVkIHRvIHNlbmQgdGhlbSB0byB0aGUgc2VydmVyIVxyXG5cdFx0Y29uc3QgaGVhZGVycyA9IHJlcXVlc3QuaGVhZGVycy5kZWxldGUoJ1NraXAtVG9rZW4nKTtcclxuXHJcblx0XHRpZiAoc2tpcElzc3VpbmdUb2tlbikge1xyXG5cdFx0XHRyZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdC5jbG9uZSh7IGhlYWRlcnMgfSkpO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLl9pc1JlZnJlc2hpbmdUb2tlbiA9PT0gZmFsc2UpIHtcclxuXHRcdFx0Ly8gVGhhbmtzIHRvOiBodHRwczovL2dpdGh1Yi5jb20vSW50ZXJ0ZWNoSW5jL2h0dHAtaW50ZXJjZXB0b3ItcmVmcmVzaC10b2tlblxyXG5cdFx0XHR0aGlzLl9pc1JlZnJlc2hpbmdUb2tlbiA9IHRydWU7XHJcblxyXG5cdFx0XHQvLyBSZXNldCBoZXJlIHNvIHRoYXQgdGhlIGZvbGxvd2luZyByZXF1ZXN0cyB3YWl0IHVudGlsIHRoZSB0b2tlblxyXG5cdFx0XHQvLyBjb21lcyBiYWNrIGZyb20gdGhlIHJlZnJlc2hUb2tlbiBjYWxsIChlLmcuIGZvciBwb2xsaW5nKS5cclxuXHRcdFx0dGhpcy5fdG9rZW5TdWJqZWN0Lm5leHQobnVsbCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy50b2tlblNlcnZpY2UuZ2V0KCkucGlwZShcclxuXHRcdFx0XHRtZXJnZU1hcCh0b2tlbiA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLl90b2tlblN1YmplY3QubmV4dCh0b2tlbik7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIG5leHQuaGFuZGxlKHRoaXMuX2FkZFRva2VuKHJlcXVlc3QsIGhlYWRlcnMsIHRva2VuKSk7XHJcblx0XHRcdFx0fSksXHJcblx0XHRcdFx0ZmluYWxpemUoKCkgPT4gKHRoaXMuX2lzUmVmcmVzaGluZ1Rva2VuID0gZmFsc2UpKVxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl90b2tlblN1YmplY3QucGlwZShcclxuXHRcdFx0ZmlsdGVyKHRva2VuID0+IHRva2VuICE9IG51bGwpLFxyXG5cdFx0XHR0YWtlKDEpLFxyXG5cdFx0XHRzd2l0Y2hNYXAodG9rZW4gPT5cclxuXHRcdFx0XHRuZXh0LmhhbmRsZSh0aGlzLl9hZGRUb2tlbihyZXF1ZXN0LCBoZWFkZXJzLCB0b2tlbikpXHJcblx0XHRcdClcclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIF9hZGRUb2tlbihcclxuXHRcdHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXHJcblx0XHRoZWFkZXJzOiBIdHRwSGVhZGVycyxcclxuXHRcdHRva2VuOiBKd3RUb2tlblJlc3BvbnNlXHJcblx0KTogSHR0cFJlcXVlc3Q8YW55PiB7XHJcblx0XHRpZiAoXHJcblx0XHRcdHRva2VuICYmXHJcblx0XHRcdHRoaXMuX2lzV2hpdGVsaXN0ZWRIb3N0KFxyXG5cdFx0XHRcdHJlcXVlc3QudXJsLFxyXG5cdFx0XHRcdHRoaXMuX2NvbmZpZy53aGl0ZWxpc3RlZERvbWFpbnNcclxuXHRcdFx0KVxyXG5cdFx0KSB7XHJcblx0XHRcdHJldHVybiByZXF1ZXN0LmNsb25lKHtcclxuXHRcdFx0XHRoZWFkZXJzOiBoZWFkZXJzLnNldChcclxuXHRcdFx0XHRcdHRoaXMuX2NvbmZpZy5oZWFkZXJOYW1lLFxyXG5cdFx0XHRcdFx0YCR7dGhpcy5fY29uZmlnLmF1dGhTY2hlbWV9JHt0b2tlbi5hY2Nlc3NfdG9rZW59YFxyXG5cdFx0XHRcdClcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlcXVlc3Q7XHJcblx0fVxyXG5cclxuXHQvLyB0b2RvOiBAb3B0ZW4vZ2luLXRvbmljP1xyXG5cdHByaXZhdGUgX2lzV2hpdGVsaXN0ZWRIb3N0KHVybDogc3RyaW5nLCB3aGl0ZWxpc3Q6IEFycmF5PHN0cmluZz4pOiBib29sZWFuIHtcclxuXHRcdGNvbnN0IGhvc3Q6IHN0cmluZyA9IHRoaXMuX2dldEhvc3QodXJsKTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHR3aGl0ZWxpc3RcclxuXHRcdFx0XHQubWFwKG8gPT4gdGhpcy5fZ2V0SG9zdChvKS50b0xvd2VyQ2FzZSgpKVxyXG5cdFx0XHRcdC5pbmRleE9mKGhvc3QudG9Mb3dlckNhc2UoKSkgPiAtMVxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdC8vIHRvZG86IEBvcHRlbi9naW4tdG9uaWM/XHJcblx0cHJpdmF0ZSBfZ2V0SG9zdChocmVmOiBzdHJpbmcpIHtcclxuXHRcdGlmICh3aW5kb3cuVVJMKSB7XHJcblx0XHRcdHJldHVybiBuZXcgVVJMKGhyZWYpLmhvc3Q7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSUUgMTFcclxuXHRcdHJldHVybiBocmVmLm1hdGNoKFxyXG5cdFx0XHQvXihodHRwcz9cXDopXFwvXFwvKChbXjpcXC8/I10qKSg/OlxcOihbMC05XSspKT8pKFtcXC9dezAsMX1bXj8jXSopKFxcP1teI10qfCkoIy4qfCkkL1xyXG5cdFx0KVsyXTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuXHROZ01vZHVsZSxcclxuXHRPcHRpb25hbCxcclxuXHRTa2lwU2VsZixcclxuXHRNb2R1bGVXaXRoUHJvdmlkZXJzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IEp3dENvbmZpZywgSldUX0NPTkZJRyB9IGZyb20gJy4vdG9rZW4uY29uZmlnJztcclxuaW1wb3J0IHsgSnd0SW50ZXJjZXB0b3IgfSBmcm9tICcuL3Rva2VuLmludGVyY2VwdG9yJztcclxuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi90b2tlbi5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSgpXHJcbmV4cG9ydCBjbGFzcyBKd3RNb2R1bGUge1xyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0QE9wdGlvbmFsKClcclxuXHRcdEBTa2lwU2VsZigpXHJcblx0XHRwYXJlbnRNb2R1bGU6IEp3dE1vZHVsZVxyXG5cdCkge1xyXG5cdFx0aWYgKHBhcmVudE1vZHVsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXHJcblx0XHRcdFx0YEp3dE1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSXQgc2hvdWxkIG9ubHkgYmUgaW1wb3J0ZWQgaW4geW91ciBhcHBsaWNhdGlvbidzIG1haW4gbW9kdWxlLmBcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBmb3JSb290KGNvbmZpZzogSnd0Q29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRuZ01vZHVsZTogSnd0TW9kdWxlLFxyXG5cdFx0XHRwcm92aWRlcnM6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUyxcclxuXHRcdFx0XHRcdHVzZUNsYXNzOiBKd3RJbnRlcmNlcHRvcixcclxuXHRcdFx0XHRcdG11bHRpOiB0cnVlXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRwcm92aWRlOiBKV1RfQ09ORklHLFxyXG5cdFx0XHRcdFx0dXNlVmFsdWU6IGNvbmZpZ1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0VG9rZW5TZXJ2aWNlXHJcblx0XHRcdF1cclxuXHRcdH07XHJcblx0fVxyXG59XHJcbiJdLCJuYW1lcyI6WyJJbmplY3Rpb25Ub2tlbiIsImh0dHAiLCJtYXAiLCJtZXJnZU1hcCIsIm9ic2VydmFibGVPZiIsIkluamVjdGFibGUiLCJJbmplY3QiLCJIdHRwQ2xpZW50IiwiQmVoYXZpb3JTdWJqZWN0IiwiZmluYWxpemUiLCJmaWx0ZXIiLCJ0YWtlIiwic3dpdGNoTWFwIiwiSFRUUF9JTlRFUkNFUFRPUlMiLCJOZ01vZHVsZSIsIk9wdGlvbmFsIiwiU2tpcFNlbGYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBRUEsU0FBUyxzQkFBc0IsQ0FBQyxLQUF1QjtRQUN0RCxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO1lBQ2pELE9BQU8sSUFBSSxDQUFDO1NBQ1o7O1lBRUssSUFBSSxHQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVyQyxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7Ozs7OztBQUVELGFBQWdCLGNBQWMsQ0FDN0IsS0FBdUIsRUFDdkIsYUFBc0I7UUFFdEIsYUFBYSxHQUFHLGFBQWEsSUFBSSxDQUFDLENBQUM7O1lBRTdCLElBQUksR0FBUyxzQkFBc0IsQ0FBQyxLQUFLLENBQUM7UUFFaEQsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFFRCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsYUFB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