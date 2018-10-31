(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@ngx-translate/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@opten/ng-forms', ['exports', '@angular/core', 'rxjs', '@ngx-translate/core', '@angular/common'], factory) :
    (factory((global.opten = global.opten || {}, global.opten['ng-forms'] = {}),global.ng.core,global.rxjs,global['ngx-translate-core'],global.ng.common));
}(this, (function (exports,core,rxjs,core$1,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var ErrorMessageForDirective = /** @class */ (function () {
        function ErrorMessageForDirective(_element, translate) {
            this._element = _element;
            this.translate = translate;
            this.dateFormat = 'DD.MM.YYYY';
        }
        /**
         * @return {?}
         */
        ErrorMessageForDirective.prototype.ngAfterViewChecked = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this._translateSubscription = this._message.subscribe(function (message) {
                    if (message && message != null) {
                        _this._element.nativeElement.innerHTML = message;
                    }
                });
            };
        /**
         * @return {?}
         */
        ErrorMessageForDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                // Das ist ein test
                if (this._translateSubscription) {
                    this._translateSubscription.unsubscribe();
                }
            };
        Object.defineProperty(ErrorMessageForDirective.prototype, "_message", {
            get: /**
             * @return {?}
             */ function () {
                if (this.control) {
                    for (var propertyName in this.control.errors) {
                        if (this.control.errors.hasOwnProperty(propertyName)) {
                            /** @type {?} */
                            var error = this.control.errors[propertyName];
                            if (propertyName === 'required') {
                                return this._translate('Required');
                            }
                            else if (propertyName === 'minlength') {
                                return this._translate('Min Length', {
                                    length: error.requiredLength
                                });
                            }
                            else if (propertyName === 'maxlength') {
                                return this._translate('Max Length', {
                                    length: error.requiredLength
                                });
                            }
                            else if (propertyName === 'email') {
                                return this._translate('Email');
                            }
                            else if (propertyName === 'url') {
                                return this._translate('Url');
                            }
                            else if (propertyName === 'datepickerMin' ||
                                propertyName === 'matDatepickerMin') {
                                return this._translate('Min Date', {
                                    date: common.formatDate(error.min, this.dateFormat, this.translate.currentLang)
                                });
                            }
                            else if (propertyName === 'datepickerMax' ||
                                propertyName === 'matDatepickerMax') {
                                return this._translate('Max Date', {
                                    date: common.formatDate(error.max, this.dateFormat, this.translate.currentLang)
                                });
                            }
                            else if (propertyName === 'datepickerFilter' ||
                                propertyName === 'matdatepickerFilter' ||
                                propertyName === 'datepickerParse' ||
                                propertyName === 'matDatepickerParse') {
                                return this._translate('Date');
                            }
                        }
                    }
                }
                return rxjs.of(null);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} key
         * @param {?=} params
         * @return {?}
         */
        ErrorMessageForDirective.prototype._translate = /**
         * @param {?} key
         * @param {?=} params
         * @return {?}
         */
            function (key, params) {
                return this.translate.get("Validation.Field." + key, params);
            };
        ErrorMessageForDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[op10ErrorMessageFor]'
                    },] }
        ];
        /** @nocollapse */
        ErrorMessageForDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core$1.TranslateService }
            ];
        };
        ErrorMessageForDirective.propDecorators = {
            control: [{ type: core.Input, args: ['op10ErrorMessageFor',] }]
        };
        return ErrorMessageForDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var FormsModule = /** @class */ (function () {
        function FormsModule() {
        }
        FormsModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [ErrorMessageForDirective],
                        exports: [ErrorMessageForDirective]
                    },] }
        ];
        return FormsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    exports.FormsModule = FormsModule;
    exports.ErrorMessageForDirective = ErrorMessageForDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0ZW4tbmctZm9ybXMudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9Ab3B0ZW4vbmctZm9ybXMvbGliL2Vycm9yLW1lc3NhZ2UtZm9yLmRpcmVjdGl2ZS50cyIsIm5nOi8vQG9wdGVuL25nLWZvcm1zL2xpYi9mb3Jtcy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuXHREaXJlY3RpdmUsXHJcblx0SW5wdXQsXHJcblx0QWZ0ZXJWaWV3Q2hlY2tlZCxcclxuXHRPbkRlc3Ryb3ksXHJcblx0RWxlbWVudFJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBmb3JtYXREYXRlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG5cdHNlbGVjdG9yOiAnW29wMTBFcnJvck1lc3NhZ2VGb3JdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRXJyb3JNZXNzYWdlRm9yRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcclxuXHJcblx0QElucHV0KCdvcDEwRXJyb3JNZXNzYWdlRm9yJylcclxuXHRjb250cm9sOiBGb3JtQ29udHJvbDtcclxuXHJcblx0cHJpdmF0ZSBkYXRlRm9ybWF0ID0gJ0RELk1NLllZWVknO1xyXG5cclxuXHRwcml2YXRlIF90cmFuc2xhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxyXG5cdFx0cHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2VcclxuXHQpIHt9XHJcblxyXG5cdG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcclxuXHRcdHRoaXMuX3RyYW5zbGF0ZVN1YnNjcmlwdGlvbiA9IHRoaXMuX21lc3NhZ2Uuc3Vic2NyaWJlKG1lc3NhZ2UgPT4ge1xyXG5cdFx0XHRpZiAobWVzc2FnZSAmJiBtZXNzYWdlICE9IG51bGwpIHtcclxuXHRcdFx0XHR0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gbWVzc2FnZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRuZ09uRGVzdHJveSgpIHtcclxuXHRcdC8vIERhcyBpc3QgZWluIHRlc3RcclxuXHRcdGlmICh0aGlzLl90cmFuc2xhdGVTdWJzY3JpcHRpb24pIHtcclxuXHRcdFx0dGhpcy5fdHJhbnNsYXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgX21lc3NhZ2UoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuXHRcdGlmICh0aGlzLmNvbnRyb2wpIHtcclxuXHRcdFx0Zm9yIChjb25zdCBwcm9wZXJ0eU5hbWUgaW4gdGhpcy5jb250cm9sLmVycm9ycykge1xyXG5cdFx0XHRcdGlmICh0aGlzLmNvbnRyb2wuZXJyb3JzLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIHtcclxuXHRcdFx0XHRcdGNvbnN0IGVycm9yOiB7XHJcblx0XHRcdFx0XHRcdGFjdHVhbDogRGF0ZTtcclxuXHRcdFx0XHRcdFx0bWluOiBEYXRlO1xyXG5cdFx0XHRcdFx0XHRtYXg6IERhdGU7XHJcblx0XHRcdFx0XHRcdGFjdHVhbExlbmd0aDogbnVtYmVyO1xyXG5cdFx0XHRcdFx0XHRyZXF1aXJlZExlbmd0aDogbnVtYmVyO1xyXG5cdFx0XHRcdFx0fSA9IHRoaXMuY29udHJvbC5lcnJvcnNbcHJvcGVydHlOYW1lXTtcclxuXHJcblx0XHRcdFx0XHRpZiAocHJvcGVydHlOYW1lID09PSAncmVxdWlyZWQnKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl90cmFuc2xhdGUoJ1JlcXVpcmVkJyk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5TmFtZSA9PT0gJ21pbmxlbmd0aCcpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZSgnTWluIExlbmd0aCcsIHtcclxuXHRcdFx0XHRcdFx0XHRsZW5ndGg6IGVycm9yLnJlcXVpcmVkTGVuZ3RoXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eU5hbWUgPT09ICdtYXhsZW5ndGgnKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl90cmFuc2xhdGUoJ01heCBMZW5ndGgnLCB7XHJcblx0XHRcdFx0XHRcdFx0bGVuZ3RoOiBlcnJvci5yZXF1aXJlZExlbmd0aFxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHlOYW1lID09PSAnZW1haWwnKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl90cmFuc2xhdGUoJ0VtYWlsJyk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5TmFtZSA9PT0gJ3VybCcpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZSgnVXJsJyk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKFxyXG5cdFx0XHRcdFx0XHRwcm9wZXJ0eU5hbWUgPT09ICdkYXRlcGlja2VyTWluJyB8fFxyXG5cdFx0XHRcdFx0XHRwcm9wZXJ0eU5hbWUgPT09ICdtYXREYXRlcGlja2VyTWluJ1xyXG5cdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl90cmFuc2xhdGUoJ01pbiBEYXRlJywge1xyXG5cdFx0XHRcdFx0XHRcdGRhdGU6IGZvcm1hdERhdGUoZXJyb3IubWluLCB0aGlzLmRhdGVGb3JtYXQsIHRoaXMudHJhbnNsYXRlLmN1cnJlbnRMYW5nKVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoXHJcblx0XHRcdFx0XHRcdHByb3BlcnR5TmFtZSA9PT0gJ2RhdGVwaWNrZXJNYXgnIHx8XHJcblx0XHRcdFx0XHRcdHByb3BlcnR5TmFtZSA9PT0gJ21hdERhdGVwaWNrZXJNYXgnXHJcblx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZSgnTWF4IERhdGUnLCB7XHJcblx0XHRcdFx0XHRcdFx0ZGF0ZTogZm9ybWF0RGF0ZShlcnJvci5tYXgsIHRoaXMuZGF0ZUZvcm1hdCwgdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmcpXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChcclxuXHRcdFx0XHRcdFx0cHJvcGVydHlOYW1lID09PSAnZGF0ZXBpY2tlckZpbHRlcicgfHxcclxuXHRcdFx0XHRcdFx0cHJvcGVydHlOYW1lID09PSAnbWF0ZGF0ZXBpY2tlckZpbHRlcicgfHxcclxuXHRcdFx0XHRcdFx0cHJvcGVydHlOYW1lID09PSAnZGF0ZXBpY2tlclBhcnNlJyB8fFxyXG5cdFx0XHRcdFx0XHRwcm9wZXJ0eU5hbWUgPT09ICdtYXREYXRlcGlja2VyUGFyc2UnXHJcblx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZSgnRGF0ZScpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvYnNlcnZhYmxlT2YobnVsbCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIF90cmFuc2xhdGUoa2V5OiBzdHJpbmcsIHBhcmFtcz86IE9iamVjdCkge1xyXG5cdFx0cmV0dXJuIHRoaXMudHJhbnNsYXRlLmdldChgVmFsaWRhdGlvbi5GaWVsZC4ke2tleX1gLCBwYXJhbXMpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBFcnJvck1lc3NhZ2VGb3JEaXJlY3RpdmUgfSBmcm9tICcuL2Vycm9yLW1lc3NhZ2UtZm9yLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG5cdGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG5cdGRlY2xhcmF0aW9uczogW0Vycm9yTWVzc2FnZUZvckRpcmVjdGl2ZV0sXHJcblx0ZXhwb3J0czogW0Vycm9yTWVzc2FnZUZvckRpcmVjdGl2ZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1zTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6WyJmb3JtYXREYXRlIiwib2JzZXJ2YWJsZU9mIiwiRGlyZWN0aXZlIiwiRWxlbWVudFJlZiIsIlRyYW5zbGF0ZVNlcnZpY2UiLCJJbnB1dCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUEyQkMsa0NBQ1MsUUFBb0IsRUFDcEIsU0FBMkI7WUFEM0IsYUFBUSxHQUFSLFFBQVEsQ0FBWTtZQUNwQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtZQU41QixlQUFVLEdBQUcsWUFBWSxDQUFDO1NBTzlCOzs7O1FBRUoscURBQWtCOzs7WUFBbEI7Z0JBQUEsaUJBTUM7Z0JBTEEsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQUEsT0FBTztvQkFDNUQsSUFBSSxPQUFPLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTt3QkFDL0IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztxQkFDaEQ7aUJBQ0QsQ0FBQyxDQUFDO2FBQ0g7Ozs7UUFFRCw4Q0FBVzs7O1lBQVg7O2dCQUVDLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO29CQUNo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