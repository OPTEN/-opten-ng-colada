/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWT_CONFIG } from './token.config';
import { JwtInterceptor } from './token.interceptor';
import { TokenService } from './token.service';
export class JwtModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BvcHRlbi9uZy1qd3QvIiwic291cmNlcyI6WyJsaWIvand0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNOLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUVSLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELE9BQU8sRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRy9DLE1BQU0sT0FBTyxTQUFTOzs7O0lBQ3JCLFlBR0MsWUFBdUI7UUFFdkIsSUFBSSxZQUFZLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FDZCw0RkFBNEYsQ0FDNUYsQ0FBQztTQUNGO0lBQ0YsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQWlCO1FBQy9CLE9BQU87WUFDTixRQUFRLEVBQUUsU0FBUztZQUNuQixTQUFTLEVBQUU7Z0JBQ1Y7b0JBQ0MsT0FBTyxFQUFFLGlCQUFpQjtvQkFDMUIsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLEtBQUssRUFBRSxJQUFJO2lCQUNYO2dCQUNEO29CQUNDLE9BQU8sRUFBRSxVQUFVO29CQUNuQixRQUFRLEVBQUUsTUFBTTtpQkFDaEI7Z0JBQ0QsWUFBWTthQUNaO1NBQ0QsQ0FBQztJQUNILENBQUM7OztZQTlCRCxRQUFROzs7O1lBS08sU0FBUyx1QkFGdEIsUUFBUSxZQUNSLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG5cdE5nTW9kdWxlLFxyXG5cdE9wdGlvbmFsLFxyXG5cdFNraXBTZWxmLFxyXG5cdE1vZHVsZVdpdGhQcm92aWRlcnNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgSnd0Q29uZmlnLCBKV1RfQ09ORklHIH0gZnJvbSAnLi90b2tlbi5jb25maWcnO1xyXG5pbXBvcnQgeyBKd3RJbnRlcmNlcHRvciB9IGZyb20gJy4vdG9rZW4uaW50ZXJjZXB0b3InO1xyXG5pbXBvcnQgeyBUb2tlblNlcnZpY2UgfSBmcm9tICcuL3Rva2VuLnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKClcclxuZXhwb3J0IGNsYXNzIEp3dE1vZHVsZSB7XHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRAT3B0aW9uYWwoKVxyXG5cdFx0QFNraXBTZWxmKClcclxuXHRcdHBhcmVudE1vZHVsZTogSnd0TW9kdWxlXHJcblx0KSB7XHJcblx0XHRpZiAocGFyZW50TW9kdWxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcclxuXHRcdFx0XHRgSnd0TW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJdCBzaG91bGQgb25seSBiZSBpbXBvcnRlZCBpbiB5b3VyIGFwcGxpY2F0aW9uJ3MgbWFpbiBtb2R1bGUuYFxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGZvclJvb3QoY29uZmlnOiBKd3RDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG5nTW9kdWxlOiBKd3RNb2R1bGUsXHJcblx0XHRcdHByb3ZpZGVyczogW1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLFxyXG5cdFx0XHRcdFx0dXNlQ2xhc3M6IEp3dEludGVyY2VwdG9yLFxyXG5cdFx0XHRcdFx0bXVsdGk6IHRydWVcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHByb3ZpZGU6IEpXVF9DT05GSUcsXHJcblx0XHRcdFx0XHR1c2VWYWx1ZTogY29uZmlnXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRUb2tlblNlcnZpY2VcclxuXHRcdFx0XVxyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuIl19