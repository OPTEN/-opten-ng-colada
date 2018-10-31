/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { mergeMap, finalize, filter, take, switchMap } from 'rxjs/operators';
import { JWT_CONFIG } from './token.config';
import { TokenService } from './token.service';
var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor(_config, tokenService) {
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
            return this.tokenService.get().pipe(mergeMap(function (token) {
                _this._tokenSubject.next(token);
                return next.handle(_this._addToken(request, headers, token));
            }), finalize(function () { return (_this._isRefreshingToken = false); }));
        }
        return this._tokenSubject.pipe(filter(function (token) { return token != null; }), take(1), switchMap(function (token) {
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
        { type: Injectable }
    ];
    /** @nocollapse */
    JwtInterceptor.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [JWT_CONFIG,] }] },
        { type: TokenService }
    ]; };
    return JwtInterceptor;
}());
export { JwtInterceptor };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ab3B0ZW4vbmctand0LyIsInNvdXJjZXMiOlsibGliL3Rva2VuLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVVuRCxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0UsT0FBTyxFQUFhLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQztJQUtDLHdCQUM2QixPQUFrQixFQUN0QyxZQUEwQjtRQUROLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFDdEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFMM0IsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzNCLGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQW1CLElBQUksQ0FBQyxDQUFDO0lBS2pFLENBQUM7Ozs7OztJQUVKLGtDQUFTOzs7OztJQUFULFVBQ0MsT0FBeUIsRUFDekIsSUFBaUI7UUFGbEIsaUJBMENDOzs7Ozs7O1lBakNNLGdCQUFnQixHQUFZLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQzs7OztZQUk3RCxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBRXBELElBQUksZ0JBQWdCLEVBQUU7WUFDckIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLFNBQUEsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMvQzthQUFNLElBQUksSUFBSSxDQUFDLGtC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QUM5QyxzQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7XHJcblx0SHR0cFJlcXVlc3QsXHJcblx0SHR0cEhhbmRsZXIsXHJcblx0SHR0cEV2ZW50LFxyXG5cdEh0dHBJbnRlcmNlcHRvcixcclxuXHRIdHRwSGVhZGVyc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtZXJnZU1hcCwgZmluYWxpemUsIGZpbHRlciwgdGFrZSwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgSnd0Q29uZmlnLCBKV1RfQ09ORklHIH0gZnJvbSAnLi90b2tlbi5jb25maWcnO1xyXG5pbXBvcnQgeyBKd3RUb2tlblJlc3BvbnNlIH0gZnJvbSAnLi9qd3QtdG9rZW4tcmVzcG9uc2UnO1xyXG5pbXBvcnQgeyBUb2tlblNlcnZpY2UgfSBmcm9tICcuL3Rva2VuLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSnd0SW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG5cdHByaXZhdGUgX2lzUmVmcmVzaGluZ1Rva2VuID0gZmFsc2U7XHJcblx0cHJpdmF0ZSBfdG9rZW5TdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxKd3RUb2tlblJlc3BvbnNlPihudWxsKTtcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRASW5qZWN0KEpXVF9DT05GSUcpIHByaXZhdGUgX2NvbmZpZzogSnd0Q29uZmlnLFxyXG5cdFx0cHJpdmF0ZSB0b2tlblNlcnZpY2U6IFRva2VuU2VydmljZVxyXG5cdCkge31cclxuXHJcblx0aW50ZXJjZXB0KFxyXG5cdFx0cmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcclxuXHRcdG5leHQ6IEh0dHBIYW5kbGVyXHJcblx0KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xyXG5cdFx0Ly8gdG9kbzogSXMgdGhlcmUgYSB3YXkgdG8gaWdub3JlIHNvbWUgaW50ZXJlY2VwdG9ycyBsaWtlIEFuZ3VsYXIgMSBoYXZlIGl0P1xyXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTgxNTUjaXNzdWVjb21tZW50LTMyNjEzNjQ4NFxyXG5cdFx0Ly8gSWYgdGhpcyBoZWFkZXIgaXMgcHJlc2VudCB0aGUgdG9rZW4gd2lsbCBub3QgYmUgcmVmcmVzaGVkIVxyXG5cdFx0Ly8gVXNlIHRoaXMgZm9yIHVucHJvdGVjdGVkIHVybHMgbGlrZSB0b2tlbiBlbmRwb2ludCBpdHNlbGYsXHJcblx0XHQvLyBvdGhlcndpc2UgeW91IHdpbGwgcnVuIGludG8gYW4gaW5maW5pdGUgbG9vcC5cclxuXHRcdGNvbnN0IHNraXBJc3N1aW5nVG9rZW46IGJvb2xlYW4gPSByZXF1ZXN0LmhlYWRlcnMuaGFzKCdTa2lwLVRva2VuJyk7XHJcblxyXG5cdFx0Ly8gVGhpcyBoZWFkZXJzIG9ubHkgaGF2ZSBcImludGVybmFsXCIgcHVycG9zZXMgZm9yIEFuZ3VsYXJcclxuXHRcdC8vIHNvIHdlIGFjdHVhbGx5IGRvbid0IG5lZWQgdG8gc2VuZCB0aGVtIHRvIHRoZSBzZXJ2ZXIhXHJcblx0XHRjb25zdCBoZWFkZXJzID0gcmVxdWVzdC5oZWFkZXJzLmRlbGV0ZSgnU2tpcC1Ub2tlbicpO1xyXG5cclxuXHRcdGlmIChza2lwSXNzdWluZ1Rva2VuKSB7XHJcblx0XHRcdHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0LmNsb25lKHsgaGVhZGVycyB9KSk7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuX2lzUmVmcmVzaGluZ1Rva2VuID09PSBmYWxzZSkge1xyXG5cdFx0XHQvLyBUaGFua3MgdG86IGh0dHBzOi8vZ2l0aHViLmNvbS9JbnRlcnRlY2hJbmMvaHR0cC1pbnRlcmNlcHRvci1yZWZyZXNoLXRva2VuXHJcblx0XHRcdHRoaXMuX2lzUmVmcmVzaGluZ1Rva2VuID0gdHJ1ZTtcclxuXHJcblx0XHRcdC8vIFJlc2V0IGhlcmUgc28gdGhhdCB0aGUgZm9sbG93aW5nIHJlcXVlc3RzIHdhaXQgdW50aWwgdGhlIHRva2VuXHJcblx0XHRcdC8vIGNvbWVzIGJhY2sgZnJvbSB0aGUgcmVmcmVzaFRva2VuIGNhbGwgKGUuZy4gZm9yIHBvbGxpbmcpLlxyXG5cdFx0XHR0aGlzLl90b2tlblN1YmplY3QubmV4dChudWxsKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLnRva2VuU2VydmljZS5nZXQoKS5waXBlKFxyXG5cdFx0XHRcdG1lcmdlTWFwKHRva2VuID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuX3Rva2VuU3ViamVjdC5uZXh0KHRva2VuKTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gbmV4dC5oYW5kbGUodGhpcy5fYWRkVG9rZW4ocmVxdWVzdCwgaGVhZGVycywgdG9rZW4pKTtcclxuXHRcdFx0XHR9KSxcclxuXHRcdFx0XHRmaW5hbGl6ZSgoKSA9PiAodGhpcy5faXNSZWZyZXNoaW5nVG9rZW4gPSBmYWxzZSkpXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3Rva2VuU3ViamVjdC5waXBlKFxyXG5cdFx0XHRmaWx0ZXIodG9rZW4gPT4gdG9rZW4gIT0gbnVsbCksXHJcblx0XHRcdHRha2UoMSksXHJcblx0XHRcdHN3aXRjaE1hcCh0b2tlbiA9PlxyXG5cdFx0XHRcdG5leHQuaGFuZGxlKHRoaXMuX2FkZFRva2VuKHJlcXVlc3QsIGhlYWRlcnMsIHRva2VuKSlcclxuXHRcdFx0KVxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgX2FkZFRva2VuKFxyXG5cdFx0cmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcclxuXHRcdGhlYWRlcnM6IEh0dHBIZWFkZXJzLFxyXG5cdFx0dG9rZW46IEp3dFRva2VuUmVzcG9uc2VcclxuXHQpOiBIdHRwUmVxdWVzdDxhbnk+IHtcclxuXHRcdGlmIChcclxuXHRcdFx0dG9rZW4gJiZcclxuXHRcdFx0dGhpcy5faXNXaGl0ZWxpc3RlZEhvc3QoXHJcblx0XHRcdFx0cmVxdWVzdC51cmwsXHJcblx0XHRcdFx0dGhpcy5fY29uZmlnLndoaXRlbGlzdGVkRG9tYWluc1xyXG5cdFx0XHQpXHJcblx0XHQpIHtcclxuXHRcdFx0cmV0dXJuIHJlcXVlc3QuY2xvbmUoe1xyXG5cdFx0XHRcdGhlYWRlcnM6IGhlYWRlcnMuc2V0KFxyXG5cdFx0XHRcdFx0dGhpcy5fY29uZmlnLmhlYWRlck5hbWUsXHJcblx0XHRcdFx0XHRgJHt0aGlzLl9jb25maWcuYXV0aFNjaGVtZX0ke3Rva2VuLmFjY2Vzc190b2tlbn1gXHJcblx0XHRcdFx0KVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVxdWVzdDtcclxuXHR9XHJcblxyXG5cdC8vIHRvZG86IEBvcHRlbi9naW4tdG9uaWM/XHJcblx0cHJpdmF0ZSBfaXNXaGl0ZWxpc3RlZEhvc3QodXJsOiBzdHJpbmcsIHdoaXRlbGlzdDogQXJyYXk8c3RyaW5nPik6IGJvb2xlYW4ge1xyXG5cdFx0Y29uc3QgaG9zdDogc3RyaW5nID0gdGhpcy5fZ2V0SG9zdCh1cmwpO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdHdoaXRlbGlzdFxyXG5cdFx0XHRcdC5tYXAobyA9PiB0aGlzLl9nZXRIb3N0KG8pLnRvTG93ZXJDYXNlKCkpXHJcblx0XHRcdFx0LmluZGV4T2YoaG9zdC50b0xvd2VyQ2FzZSgpKSA+IC0xXHJcblx0XHQpO1xyXG5cdH1cclxuXHJcblx0Ly8gdG9kbzogQG9wdGVuL2dpbi10b25pYz9cclxuXHRwcml2YXRlIF9nZXRIb3N0KGhyZWY6IHN0cmluZykge1xyXG5cdFx0aWYgKHdpbmRvdy5VUkwpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBVUkwoaHJlZikuaG9zdDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBJRSAxMVxyXG5cdFx0cmV0dXJuIGhyZWYubWF0Y2goXHJcblx0XHRcdC9eKGh0dHBzP1xcOilcXC9cXC8oKFteOlxcLz8jXSopKD86XFw6KFswLTldKykpPykoW1xcL117MCwxfVtePyNdKikoXFw/W14jXSp8KSgjLip8KSQvXHJcblx0XHQpWzJdO1xyXG5cdH1cclxufVxyXG4iXX0=