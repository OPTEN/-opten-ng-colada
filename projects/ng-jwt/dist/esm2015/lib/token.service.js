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
export class TokenService {
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
            return observableOf(token);
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
if (false) {
    /** @type {?} */
    TokenService.prototype.config;
    /** @type {?} */
    TokenService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BvcHRlbi9uZy1qd3QvIiwic291cmNlcyI6WyJsaWIvdG9rZW4uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWxELE9BQU8sRUFBYyxFQUFFLElBQUksWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBELE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUl2RCxNQUFNLE9BQU8sWUFBWTs7Ozs7SUFDeEIsWUFDNkIsTUFBaUIsRUFDckMsSUFBZ0I7UUFESSxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ3JDLFNBQUksR0FBSixJQUFJLENBQVk7SUFDdEIsQ0FBQzs7Ozs7SUFFSixLQUFLLENBQUMsT0FBd0I7UUFDN0IsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNkLElBQUksQ0FBbUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFO1lBQzNELE9BQU8sRUFBRSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUU7U0FDakMsQ0FBQzthQUNELElBQUksQ0FDSixHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDWCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFO2dCQUNoQyxjQUFjO2dCQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVCO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7Ozs7Ozs7SUFRRCxHQUFHO1FBQ0YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FDakMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hCLElBQUksS0FBSyxJQUFJLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTs7c0JBQzdCLE9BQU8sR0FBb0I7b0JBQ2hDLFVBQVUsRUFBRSxlQUFlO29CQUMzQixhQUFhLEVBQUUsS0FBSyxDQUFDLGFBQWE7aUJBQ2xDO2dCQUVELGdFQUFnRTtnQkFDaEUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzNCO1lBRUQsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQ0YsQ0FBQztJQUNILENBQUM7OztZQTlDRCxVQUFVOzs7OzRDQUdSLE1BQU0sU0FBQyxVQUFVO1lBYlgsVUFBVTs7OztJQWFqQiw4QkFBNkM7O0lBQzdDLDRCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIGFzIG9ic2VydmFibGVPZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtZXJnZU1hcCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgaXNUb2tlbkV4cGlyZWQgfSBmcm9tICcuL2lzLXRva2VuLWV4cGlyZWQnO1xyXG5pbXBvcnQgeyBKd3RUb2tlblJlcXVlc3QgfSBmcm9tICcuL2p3dC10b2tlbi1yZXF1ZXN0JztcclxuaW1wb3J0IHsgSldUX0NPTkZJRywgSnd0Q29uZmlnIH0gZnJvbSAnLi90b2tlbi5jb25maWcnO1xyXG5pbXBvcnQgeyBKd3RUb2tlblJlc3BvbnNlIH0gZnJvbSAnLi9qd3QtdG9rZW4tcmVzcG9uc2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVG9rZW5TZXJ2aWNlIHtcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdEBJbmplY3QoSldUX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IEp3dENvbmZpZyxcclxuXHRcdHByaXZhdGUgaHR0cDogSHR0cENsaWVudFxyXG5cdCkge31cclxuXHJcblx0dG9rZW4ocmVxdWVzdDogSnd0VG9rZW5SZXF1ZXN0KTogT2JzZXJ2YWJsZTxKd3RUb2tlblJlc3BvbnNlPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5odHRwXHJcblx0XHRcdC5wb3N0PEp3dFRva2VuUmVzcG9uc2U+KHRoaXMuY29uZmlnLnRva2VuRW5kcG9pbnQsIHJlcXVlc3QsIHtcclxuXHRcdFx0XHRoZWFkZXJzOiB7ICdTa2lwLVRva2VuJzogJ3RydWUnIH1cclxuXHRcdFx0fSlcclxuXHRcdFx0LnBpcGUoXHJcblx0XHRcdFx0bWFwKHRva2VuID0+IHtcclxuXHRcdFx0XHRcdGlmICh0b2tlbiAmJiB0b2tlbi5hY2Nlc3NfdG9rZW4pIHtcclxuXHRcdFx0XHRcdFx0Ly8gc3RvcmUgdG9rZW5cclxuXHRcdFx0XHRcdFx0dGhpcy5jb25maWcuc2V0VG9rZW4odG9rZW4pO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiB0b2tlbjtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhpcyBtZXRob2QgZ2V0cyB0aGUgdG9rZW4gZnJvbSB0aGUgc3RvcmFnZVxyXG5cdCAqIGNoZWNrIGlmIGl0IGlzIHN0aWxsIHZhbGlkIGlmIGl0IGlzIGl0IHdpbGwgYmUgcmV0dXJuZWRcclxuXHQgKiBvdGhlcndpc2UgdGhlIHRva2VuIGVuZHBvaW50IHdpbGwgYmUgY2FsbGVkIHRvIGNyZWF0ZSBhIG5ldyB0b2tlblxyXG5cdCAqIHdpdGggdGhlIHJlZnJlc2hfdG9rZW5cclxuXHQgKi9cclxuXHRnZXQoKTogT2JzZXJ2YWJsZTxKd3RUb2tlblJlc3BvbnNlPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5jb25maWcuZ2V0VG9rZW4oKS5waXBlKFxyXG5cdFx0XHRtZXJnZU1hcCh0b2tlbiA9PiB7XHJcblx0XHRcdFx0aWYgKHRva2VuICYmIGlzVG9rZW5FeHBpcmVkKHRva2VuKSkge1xyXG5cdFx0XHRcdFx0Y29uc3QgcmVxdWVzdDogSnd0VG9rZW5SZXF1ZXN0ID0ge1xyXG5cdFx0XHRcdFx0XHRncmFudF90eXBlOiAncmVmcmVzaF90b2tlbicsXHJcblx0XHRcdFx0XHRcdHJlZnJlc2hfdG9rZW46IHRva2VuLnJlZnJlc2hfdG9rZW5cclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0Ly8gdG9kbzogc2hvdWxkIHdlIGNhbGwgYXV0aGVudGljYXRlPyBzbyB3ZSBhbHNvIHNldCB0aGUgbWVtYmVyP1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMudG9rZW4ocmVxdWVzdCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gb2JzZXJ2YWJsZU9mKHRva2VuKTtcclxuXHRcdFx0fSlcclxuXHRcdCk7XHJcblx0fVxyXG59XHJcbiJdfQ==