/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWT_CONFIG } from './token.config';
import { JwtInterceptor } from './token.interceptor';
import { TokenService } from './token.service';
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
    };
    JwtModule.decorators = [
        { type: NgModule }
    ];
    /** @nocollapse */
    JwtModule.ctorParameters = function () { return [
        { type: JwtModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    return JwtModule;
}());
export { JwtModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BvcHRlbi9uZy1qd3QvIiwic291cmNlcyI6WyJsaWIvand0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNOLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUVSLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELE9BQU8sRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DO0lBRUMsbUJBR0MsWUFBdUI7UUFFdkIsSUFBSSxZQUFZLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FDZCw0RkFBNEYsQ0FDNUYsQ0FBQztTQUNGO0lBQ0YsQ0FBQzs7Ozs7SUFFTSxpQkFBTzs7OztJQUFkLFVBQWUsTUFBaUI7UUFDL0IsT0FBTztZQUNOLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFNBQVMsRUFBRTtnQkFDVjtvQkFDQyxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixRQUFRLEVBQUUsY0FBYztvQkFDeEIsS0FBSyxFQUFFLElBQUk7aUJBQ1g7Z0JBQ0Q7b0JBQ0MsT0FBTyxFQUFFLFVBQVU7b0JBQ25CLFFBQVEsRUFBRSxNQUFNO2lCQUNoQjtnQkFDRCxZQUFZO2FBQ1o7U0FDRCxDQUFDO0lBQ0gsQ0FBQzs7Z0JBOUJELFFBQVE7Ozs7Z0JBS08sU0FBUyx1QkFGdEIsUUFBUSxZQUNSLFFBQVE7O0lBMkJYLGdCQUFDO0NBQUEsQUEvQkQsSUErQkM7U0E5QlksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcblx0TmdNb2R1bGUsXHJcblx0T3B0aW9uYWwsXHJcblx0U2tpcFNlbGYsXHJcblx0TW9kdWxlV2l0aFByb3ZpZGVyc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBKd3RDb25maWcsIEpXVF9DT05GSUcgfSBmcm9tICcuL3Rva2VuLmNvbmZpZyc7XHJcbmltcG9ydCB7IEp3dEludGVyY2VwdG9yIH0gZnJvbSAnLi90b2tlbi5pbnRlcmNlcHRvcic7XHJcbmltcG9ydCB7IFRva2VuU2VydmljZSB9IGZyb20gJy4vdG9rZW4uc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoKVxyXG5leHBvcnQgY2xhc3MgSnd0TW9kdWxlIHtcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdEBPcHRpb25hbCgpXHJcblx0XHRAU2tpcFNlbGYoKVxyXG5cdFx0cGFyZW50TW9kdWxlOiBKd3RNb2R1bGVcclxuXHQpIHtcclxuXHRcdGlmIChwYXJlbnRNb2R1bGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxyXG5cdFx0XHRcdGBKd3RNb2R1bGUgaXMgYWxyZWFkeSBsb2FkZWQuIEl0IHNob3VsZCBvbmx5IGJlIGltcG9ydGVkIGluIHlvdXIgYXBwbGljYXRpb24ncyBtYWluIG1vZHVsZS5gXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZm9yUm9vdChjb25maWc6IEp3dENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0bmdNb2R1bGU6IEp3dE1vZHVsZSxcclxuXHRcdFx0cHJvdmlkZXJzOiBbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0cHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsXHJcblx0XHRcdFx0XHR1c2VDbGFzczogSnd0SW50ZXJjZXB0b3IsXHJcblx0XHRcdFx0XHRtdWx0aTogdHJ1ZVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0cHJvdmlkZTogSldUX0NPTkZJRyxcclxuXHRcdFx0XHRcdHVzZVZhbHVlOiBjb25maWdcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdFRva2VuU2VydmljZVxyXG5cdFx0XHRdXHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG4iXX0=