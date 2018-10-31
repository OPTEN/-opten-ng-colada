/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { mergeMap, finalize, filter, take, switchMap } from 'rxjs/operators';
import { JWT_CONFIG } from './token.config';
import { TokenService } from './token.service';
export class JwtInterceptor {
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
if (false) {
    /** @type {?} */
    JwtInterceptor.prototype._isRefreshingToken;
    /** @type {?} */
    JwtInterceptor.prototype._tokenSubject;
    /** @type {?} */
    JwtInterceptor.prototype._config;
    /** @type {?} */
    JwtInterceptor.prototype.tokenService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ab3B0ZW4vbmctand0LyIsInNvdXJjZXMiOlsibGliL3Rva2VuLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVVuRCxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0UsT0FBTyxFQUFhLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUcvQyxNQUFNLE9BQU8sY0FBYzs7Ozs7SUFJMUIsWUFDNkIsT0FBa0IsRUFDdEMsWUFBMEI7UUFETixZQUFPLEdBQVAsT0FBTyxDQUFXO1FBQ3RDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBTDNCLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUMzQixrQkFBYSxHQUFHLElBQUksZUFBZSxDQUFtQixJQUFJLENBQUMsQ0FBQztJQUtqRSxDQUFDOzs7Ozs7SUFFSixTQUFTLENBQ1IsT0FBeUIsRUFDekIsSUFBaUI7Ozs7Ozs7Y0FPWCxnQkFBZ0IsR0FBWSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7Ozs7Y0FJN0QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUVwRCxJQUFJLGdCQUFnQixFQUFFO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQy9DO2FBQU0sSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssS0FBSyxFQUFFO1lBQzdDLDRFQUE0RTtZQUM1RSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1lBRS9CLGlFQUFpRTtZQUNqRSw0REFBNEQ7WUFDNUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFOUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FDbEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFL0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzdELENBQUMsQ0FBQyxFQUNGLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUNqRCxDQUFDO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEVBQzlCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FDcEQsQ0FDRCxDQUFDO0lBQ0gsQ0FBQzs7Ozs7OztJQUVPLFNBQVMsQ0FDaEIsT0FBeUIsRUFDekIsT0FBb0IsRUFDcEIsS0FBdUI7UUFFdkIsSUFDQyxLQUFLO1lBQ0wsSUFBSSxDQUFDLGtCQUFrQixDQUN0QixPQUFPLENBQUMsR0FBRyxFQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQy9CLEVBQ0E7WUFDRCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ3BCLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFDdkIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQ2pEO2FBQ0QsQ0FBQyxDQUFDO1NBQ0g7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNoQixDQUFDOzs7Ozs7O0lBR08sa0JBQWtCLENBQUMsR0FBVyxFQUFFLFNBQXdCOztjQUN6RCxJQUFJLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFFdkMsT0FBTyxDQUNOLFNBQVM7YUFDUCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDbEMsQ0FBQztJQUNILENBQUM7Ozs7OztJQUdPLFFBQVEsQ0FBQyxJQUFZO1FBQzVCLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNmLE9BQU8sSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQzFCO1FBRUQsUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FDaEIsK0VBQStFLENBQy9FLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDOzs7WUFsR0QsVUFBVTs7Ozs0Q0FNUixNQUFNLFNBQUMsVUFBVTtZQVJYLFlBQVk7Ozs7SUFJcEIsNENBQW1DOztJQUNuQyx1Q0FBb0U7O0lBR25FLGlDQUE4Qzs7SUFDOUMsc0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQge1xyXG5cdEh0dHBSZXF1ZXN0LFxyXG5cdEh0dHBIYW5kbGVyLFxyXG5cdEh0dHBFdmVudCxcclxuXHRIdHRwSW50ZXJjZXB0b3IsXHJcblx0SHR0cEhlYWRlcnNcclxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWVyZ2VNYXAsIGZpbmFsaXplLCBmaWx0ZXIsIHRha2UsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEp3dENvbmZpZywgSldUX0NPTkZJRyB9IGZyb20gJy4vdG9rZW4uY29uZmlnJztcclxuaW1wb3J0IHsgSnd0VG9rZW5SZXNwb25zZSB9IGZyb20gJy4vand0LXRva2VuLXJlc3BvbnNlJztcclxuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi90b2tlbi5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEp3dEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcclxuXHRwcml2YXRlIF9pc1JlZnJlc2hpbmdUb2tlbiA9IGZhbHNlO1xyXG5cdHByaXZhdGUgX3Rva2VuU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Snd0VG9rZW5SZXNwb25zZT4obnVsbCk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0QEluamVjdChKV1RfQ09ORklHKSBwcml2YXRlIF9jb25maWc6IEp3dENvbmZpZyxcclxuXHRcdHByaXZhdGUgdG9rZW5TZXJ2aWNlOiBUb2tlblNlcnZpY2VcclxuXHQpIHt9XHJcblxyXG5cdGludGVyY2VwdChcclxuXHRcdHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXHJcblx0XHRuZXh0OiBIdHRwSGFuZGxlclxyXG5cdCk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcclxuXHRcdC8vIHRvZG86IElzIHRoZXJlIGEgd2F5IHRvIGlnbm9yZSBzb21lIGludGVyZWNlcHRvcnMgbGlrZSBBbmd1bGFyIDEgaGF2ZSBpdD9cclxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE4MTU1I2lzc3VlY29tbWVudC0zMjYxMzY0ODRcclxuXHRcdC8vIElmIHRoaXMgaGVhZGVyIGlzIHByZXNlbnQgdGhlIHRva2VuIHdpbGwgbm90IGJlIHJlZnJlc2hlZCFcclxuXHRcdC8vIFVzZSB0aGlzIGZvciB1bnByb3RlY3RlZCB1cmxzIGxpa2UgdG9rZW4gZW5kcG9pbnQgaXRzZWxmLFxyXG5cdFx0Ly8gb3RoZXJ3aXNlIHlvdSB3aWxsIHJ1biBpbnRvIGFuIGluZmluaXRlIGxvb3AuXHJcblx0XHRjb25zdCBza2lwSXNzdWluZ1Rva2VuOiBib29sZWFuID0gcmVxdWVzdC5oZWFkZXJzLmhhcygnU2tpcC1Ub2tlbicpO1xyXG5cclxuXHRcdC8vIFRoaXMgaGVhZGVycyBvbmx5IGhhdmUgXCJpbnRlcm5hbFwiIHB1cnBvc2VzIGZvciBBbmd1bGFyXHJcblx0XHQvLyBzbyB3ZSBhY3R1YWxseSBkb24ndCBuZWVkIHRvIHNlbmQgdGhlbSB0byB0aGUgc2VydmVyIVxyXG5cdFx0Y29uc3QgaGVhZGVycyA9IHJlcXVlc3QuaGVhZGVycy5kZWxldGUoJ1NraXAtVG9rZW4nKTtcclxuXHJcblx0XHRpZiAoc2tpcElzc3VpbmdUb2tlbikge1xyXG5cdFx0XHRyZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdC5jbG9uZSh7IGhlYWRlcnMgfSkpO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLl9pc1JlZnJlc2hpbmdUb2tlbiA9PT0gZmFsc2UpIHtcclxuXHRcdFx0Ly8gVGhhbmtzIHRvOiBodHRwczovL2dpdGh1Yi5jb20vSW50ZXJ0ZWNoSW5jL2h0dHAtaW50ZXJjZXB0b3ItcmVmcmVzaC10b2tlblxyXG5cdFx0XHR0aGlzLl9pc1JlZnJlc2hpbmdUb2tlbiA9IHRydWU7XHJcblxyXG5cdFx0XHQvLyBSZXNldCBoZXJlIHNvIHRoYXQgdGhlIGZvbGxvd2luZyByZXF1ZXN0cyB3YWl0IHVudGlsIHRoZSB0b2tlblxyXG5cdFx0XHQvLyBjb21lcyBiYWNrIGZyb20gdGhlIHJlZnJlc2hUb2tlbiBjYWxsIChlLmcuIGZvciBwb2xsaW5nKS5cclxuXHRcdFx0dGhpcy5fdG9rZW5TdWJqZWN0Lm5leHQobnVsbCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy50b2tlblNlcnZpY2UuZ2V0KCkucGlwZShcclxuXHRcdFx0XHRtZXJnZU1hcCh0b2tlbiA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLl90b2tlblN1YmplY3QubmV4dCh0b2tlbik7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIG5leHQuaGFuZGxlKHRoaXMuX2FkZFRva2VuKHJlcXVlc3QsIGhlYWRlcnMsIHRva2VuKSk7XHJcblx0XHRcdFx0fSksXHJcblx0XHRcdFx0ZmluYWxpemUoKCkgPT4gKHRoaXMuX2lzUmVmcmVzaGluZ1Rva2VuID0gZmFsc2UpKVxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl90b2tlblN1YmplY3QucGlwZShcclxuXHRcdFx0ZmlsdGVyKHRva2VuID0+IHRva2VuICE9IG51bGwpLFxyXG5cdFx0XHR0YWtlKDEpLFxyXG5cdFx0XHRzd2l0Y2hNYXAodG9rZW4gPT5cclxuXHRcdFx0XHRuZXh0LmhhbmRsZSh0aGlzLl9hZGRUb2tlbihyZXF1ZXN0LCBoZWFkZXJzLCB0b2tlbikpXHJcblx0XHRcdClcclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIF9hZGRUb2tlbihcclxuXHRcdHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXHJcblx0XHRoZWFkZXJzOiBIdHRwSGVhZGVycyxcclxuXHRcdHRva2VuOiBKd3RUb2tlblJlc3BvbnNlXHJcblx0KTogSHR0cFJlcXVlc3Q8YW55PiB7XHJcblx0XHRpZiAoXHJcblx0XHRcdHRva2VuICYmXHJcblx0XHRcdHRoaXMuX2lzV2hpdGVsaXN0ZWRIb3N0KFxyXG5cdFx0XHRcdHJlcXVlc3QudXJsLFxyXG5cdFx0XHRcdHRoaXMuX2NvbmZpZy53aGl0ZWxpc3RlZERvbWFpbnNcclxuXHRcdFx0KVxyXG5cdFx0KSB7XHJcblx0XHRcdHJldHVybiByZXF1ZXN0LmNsb25lKHtcclxuXHRcdFx0XHRoZWFkZXJzOiBoZWFkZXJzLnNldChcclxuXHRcdFx0XHRcdHRoaXMuX2NvbmZpZy5oZWFkZXJOYW1lLFxyXG5cdFx0XHRcdFx0YCR7dGhpcy5fY29uZmlnLmF1dGhTY2hlbWV9JHt0b2tlbi5hY2Nlc3NfdG9rZW59YFxyXG5cdFx0XHRcdClcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlcXVlc3Q7XHJcblx0fVxyXG5cclxuXHQvLyB0b2RvOiBAb3B0ZW4vZ2luLXRvbmljP1xyXG5cdHByaXZhdGUgX2lzV2hpdGVsaXN0ZWRIb3N0KHVybDogc3RyaW5nLCB3aGl0ZWxpc3Q6IEFycmF5PHN0cmluZz4pOiBib29sZWFuIHtcclxuXHRcdGNvbnN0IGhvc3Q6IHN0cmluZyA9IHRoaXMuX2dldEhvc3QodXJsKTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHR3aGl0ZWxpc3RcclxuXHRcdFx0XHQubWFwKG8gPT4gdGhpcy5fZ2V0SG9zdChvKS50b0xvd2VyQ2FzZSgpKVxyXG5cdFx0XHRcdC5pbmRleE9mKGhvc3QudG9Mb3dlckNhc2UoKSkgPiAtMVxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdC8vIHRvZG86IEBvcHRlbi9naW4tdG9uaWM/XHJcblx0cHJpdmF0ZSBfZ2V0SG9zdChocmVmOiBzdHJpbmcpIHtcclxuXHRcdGlmICh3aW5kb3cuVVJMKSB7XHJcblx0XHRcdHJldHVybiBuZXcgVVJMKGhyZWYpLmhvc3Q7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSUUgMTFcclxuXHRcdHJldHVybiBocmVmLm1hdGNoKFxyXG5cdFx0XHQvXihodHRwcz9cXDopXFwvXFwvKChbXjpcXC8/I10qKSg/OlxcOihbMC05XSspKT8pKFtcXC9dezAsMX1bXj8jXSopKFxcP1teI10qfCkoIy4qfCkkL1xyXG5cdFx0KVsyXTtcclxuXHR9XHJcbn1cclxuIl19