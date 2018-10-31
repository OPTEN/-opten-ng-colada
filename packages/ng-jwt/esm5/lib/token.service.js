/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of as observableOf } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { isTokenExpired } from './is-token-expired';
import { JWT_CONFIG } from './token.config';
var TokenService = /** @class */ (function () {
    function TokenService(config, http) {
        this.config = config;
        this.http = http;
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
            .pipe(map(function (token) {
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
        return this.config.getToken().pipe(mergeMap(function (token) {
            if (token && isTokenExpired(token)) {
                /** @type {?} */
                var request = {
                    grant_type: 'refresh_token',
                    refresh_token: token.refresh_token
                };
                // todo: should we call authenticate? so we also set the member?
                return _this.token(request);
            }
            return observableOf(token);
        }));
    };
    TokenService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    TokenService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [JWT_CONFIG,] }] },
        { type: HttpClient }
    ]; };
    return TokenService;
}());
export { TokenService };
if (false) {
    /** @type {?} */
    TokenService.prototype.config;
    /** @type {?} */
    TokenService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BvcHRlbi9uZy1qd3QvIiwic291cmNlcyI6WyJsaWIvdG9rZW4uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWxELE9BQU8sRUFBYyxFQUFFLElBQUksWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBELE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUd2RDtJQUVDLHNCQUM2QixNQUFpQixFQUNyQyxJQUFnQjtRQURJLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDckMsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUN0QixDQUFDOzs7OztJQUVKLDRCQUFLOzs7O0lBQUwsVUFBTSxPQUF3QjtRQUE5QixpQkFlQztRQWRBLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDZCxJQUFJLENBQW1CLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRTtZQUMzRCxPQUFPLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFO1NBQ2pDLENBQUM7YUFDRCxJQUFJLENBQ0osR0FBRyxDQUFDLFVBQUEsS0FBSztZQUNSLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUU7Z0JBQ2hDLGNBQWM7Z0JBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUI7WUFFRCxPQUFPLEtBQUssQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7O0lBQ0gsMEJBQUc7Ozs7Ozs7SUFBSDtRQUFBLGlCQWdCQztRQWZBLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQ2pDLFFBQVEsQ0FBQyxVQUFBLEtBQUs7WUFDYixJQUFJLEtBQUssSUFBSSxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7O29CQUM3QixPQUFPLEdBQW9CO29CQUNoQyxVQUFVLEVBQUUsZUFBZTtvQkFDM0IsYUFBYSxFQUFFLEtBQUssQ0FBQyxhQUFhO2lCQUNsQztnQkFFRCxnRUFBZ0U7Z0JBQ2hFLE9BQU8sS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMzQjtZQUVELE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUNGLENBQUM7SUFDSCxDQUFDOztnQkE5Q0QsVUFBVTs7OztnREFHUixNQUFNLFNBQUMsVUFBVTtnQkFiWCxVQUFVOztJQXlEbkIsbUJBQUM7Q0FBQSxBQS9DRCxJQStDQztTQTlDWSxZQUFZOzs7SUFFdkIsOEJBQTZDOztJQUM3Qyw0QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWVyZ2VNYXAsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IGlzVG9rZW5FeHBpcmVkIH0gZnJvbSAnLi9pcy10b2tlbi1leHBpcmVkJztcclxuaW1wb3J0IHsgSnd0VG9rZW5SZXF1ZXN0IH0gZnJvbSAnLi9qd3QtdG9rZW4tcmVxdWVzdCc7XHJcbmltcG9ydCB7IEpXVF9DT05GSUcsIEp3dENvbmZpZyB9IGZyb20gJy4vdG9rZW4uY29uZmlnJztcclxuaW1wb3J0IHsgSnd0VG9rZW5SZXNwb25zZSB9IGZyb20gJy4vand0LXRva2VuLXJlc3BvbnNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRva2VuU2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRASW5qZWN0KEpXVF9DT05GSUcpIHByaXZhdGUgY29uZmlnOiBKd3RDb25maWcsXHJcblx0XHRwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRcclxuXHQpIHt9XHJcblxyXG5cdHRva2VuKHJlcXVlc3Q6IEp3dFRva2VuUmVxdWVzdCk6IE9ic2VydmFibGU8Snd0VG9rZW5SZXNwb25zZT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuaHR0cFxyXG5cdFx0XHQucG9zdDxKd3RUb2tlblJlc3BvbnNlPih0aGlzLmNvbmZpZy50b2tlbkVuZHBvaW50LCByZXF1ZXN0LCB7XHJcblx0XHRcdFx0aGVhZGVyczogeyAnU2tpcC1Ub2tlbic6ICd0cnVlJyB9XHJcblx0XHRcdH0pXHJcblx0XHRcdC5waXBlKFxyXG5cdFx0XHRcdG1hcCh0b2tlbiA9PiB7XHJcblx0XHRcdFx0XHRpZiAodG9rZW4gJiYgdG9rZW4uYWNjZXNzX3Rva2VuKSB7XHJcblx0XHRcdFx0XHRcdC8vIHN0b3JlIHRva2VuXHJcblx0XHRcdFx0XHRcdHRoaXMuY29uZmlnLnNldFRva2VuKHRva2VuKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gdG9rZW47XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoaXMgbWV0aG9kIGdldHMgdGhlIHRva2VuIGZyb20gdGhlIHN0b3JhZ2VcclxuXHQgKiBjaGVjayBpZiBpdCBpcyBzdGlsbCB2YWxpZCBpZiBpdCBpcyBpdCB3aWxsIGJlIHJldHVybmVkXHJcblx0ICogb3RoZXJ3aXNlIHRoZSB0b2tlbiBlbmRwb2ludCB3aWxsIGJlIGNhbGxlZCB0byBjcmVhdGUgYSBuZXcgdG9rZW5cclxuXHQgKiB3aXRoIHRoZSByZWZyZXNoX3Rva2VuXHJcblx0ICovXHJcblx0Z2V0KCk6IE9ic2VydmFibGU8Snd0VG9rZW5SZXNwb25zZT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29uZmlnLmdldFRva2VuKCkucGlwZShcclxuXHRcdFx0bWVyZ2VNYXAodG9rZW4gPT4ge1xyXG5cdFx0XHRcdGlmICh0b2tlbiAmJiBpc1Rva2VuRXhwaXJlZCh0b2tlbikpIHtcclxuXHRcdFx0XHRcdGNvbnN0IHJlcXVlc3Q6IEp3dFRva2VuUmVxdWVzdCA9IHtcclxuXHRcdFx0XHRcdFx0Z3JhbnRfdHlwZTogJ3JlZnJlc2hfdG9rZW4nLFxyXG5cdFx0XHRcdFx0XHRyZWZyZXNoX3Rva2VuOiB0b2tlbi5yZWZyZXNoX3Rva2VuXHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdC8vIHRvZG86IHNob3VsZCB3ZSBjYWxsIGF1dGhlbnRpY2F0ZT8gc28gd2UgYWxzbyBzZXQgdGhlIG1lbWJlcj9cclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLnRva2VuKHJlcXVlc3QpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIG9ic2VydmFibGVPZih0b2tlbik7XHJcblx0XHRcdH0pXHJcblx0XHQpO1xyXG5cdH1cclxufVxyXG4iXX0=