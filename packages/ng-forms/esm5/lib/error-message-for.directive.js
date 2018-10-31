/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of as observableOf } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { formatDate } from '@angular/common';
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
         */
        function () {
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
                                date: formatDate(error.min, this.dateFormat, this.translate.currentLang)
                            });
                        }
                        else if (propertyName === 'datepickerMax' ||
                            propertyName === 'matDatepickerMax') {
                            return this._translate('Max Date', {
                                date: formatDate(error.max, this.dateFormat, this.translate.currentLang)
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
            return observableOf(null);
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
        { type: Directive, args: [{
                    selector: '[op10ErrorMessageFor]'
                },] }
    ];
    /** @nocollapse */
    ErrorMessageForDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: TranslateService }
    ]; };
    ErrorMessageForDirective.propDecorators = {
        control: [{ type: Input, args: ['op10ErrorMessageFor',] }]
    };
    return ErrorMessageForDirective;
}());
export { ErrorMessageForDirective };
if (false) {
    /** @type {?} */
    ErrorMessageForDirective.prototype.control;
    /** @type {?} */
    ErrorMessageForDirective.prototype.dateFormat;
    /** @type {?} */
    ErrorMessageForDirective.prototype._translateSubscription;
    /** @type {?} */
    ErrorMessageForDirective.prototype._element;
    /** @type {?} */
    ErrorMessageForDirective.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbWVzc2FnZS1mb3IuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG9wdGVuL25nLWZvcm1zLyIsInNvdXJjZXMiOlsibGliL2Vycm9yLW1lc3NhZ2UtZm9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNOLFNBQVMsRUFDVCxLQUFLLEVBR0wsVUFBVSxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQWMsRUFBRSxJQUFJLFlBQVksRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTdDO0lBWUMsa0NBQ1MsUUFBb0IsRUFDcEIsU0FBMkI7UUFEM0IsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUNwQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQU41QixlQUFVLEdBQUcsWUFBWSxDQUFDO0lBTy9CLENBQUM7Ozs7SUFFSixxREFBa0I7OztJQUFsQjtRQUFBLGlCQU1DO1FBTEEsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQUEsT0FBTztZQUM1RCxJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO2dCQUMvQixLQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO2FBQ2hEO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDOzs7O0lBRUQsOENBQVc7OztJQUFYO1FBQ0MsbUJBQW1CO1FBQ25CLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQ2hDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUMxQztJQUNGLENBQUM7SUFFRCxz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blx0SW5wdXQsXHJcblx0QWZ0ZXJWaWV3Q2hlY2tlZCxcclxuXHRPbkRlc3Ryb3ksXHJcblx0RWxlbWVudFJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBmb3JtYXREYXRlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG5cdHNlbGVjdG9yOiAnW29wMTBFcnJvck1lc3NhZ2VGb3JdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRXJyb3JNZXNzYWdlRm9yRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcclxuXHJcblx0QElucHV0KCdvcDEwRXJyb3JNZXNzYWdlRm9yJylcclxuXHRjb250cm9sOiBGb3JtQ29udHJvbDtcclxuXHJcblx0cHJpdmF0ZSBkYXRlRm9ybWF0ID0gJ0RELk1NLllZWVknO1xyXG5cclxuXHRwcml2YXRlIF90cmFuc2xhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxyXG5cdFx0cHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2VcclxuXHQpIHt9XHJcblxyXG5cdG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcclxuXHRcdHRoaXMuX3RyYW5zbGF0ZVN1YnNjcmlwdGlvbiA9IHRoaXMuX21lc3NhZ2Uuc3Vic2NyaWJlKG1lc3NhZ2UgPT4ge1xyXG5cdFx0XHRpZiAobWVzc2FnZSAmJiBtZXNzYWdlICE9IG51bGwpIHtcclxuXHRcdFx0XHR0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gbWVzc2FnZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRuZ09uRGVzdHJveSgpIHtcclxuXHRcdC8vIERhcyBpc3QgZWluIHRlc3RcclxuXHRcdGlmICh0aGlzLl90cmFuc2xhdGVTdWJzY3JpcHRpb24pIHtcclxuXHRcdFx0dGhpcy5fdHJhbnNsYXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgX21lc3NhZ2UoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuXHRcdGlmICh0aGlzLmNvbnRyb2wpIHtcclxuXHRcdFx0Zm9yIChjb25zdCBwcm9wZXJ0eU5hbWUgaW4gdGhpcy5jb250cm9sLmVycm9ycykge1xyXG5cdFx0XHRcdGlmICh0aGlzLmNvbnRyb2wuZXJyb3JzLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIHtcclxuXHRcdFx0XHRcdGNvbnN0IGVycm9yOiB7XHJcblx0XHRcdFx0XHRcdGFjdHVhbDogRGF0ZTtcclxuXHRcdFx0XHRcdFx0bWluOiBEYXRlO1xyXG5cdFx0XHRcdFx0XHRtYXg6IERhdGU7XHJcblx0XHRcdFx0XHRcdGFjdHVhbExlbmd0aDogbnVtYmVyO1xyXG5cdFx0XHRcdFx0XHRyZXF1aXJlZExlbmd0aDogbnVtYmVyO1xyXG5cdFx0XHRcdFx0fSA9IHRoaXMuY29udHJvbC5lcnJvcnNbcHJvcGVydHlOYW1lXTtcclxuXHJcblx0XHRcdFx0XHRpZiAocHJvcGVydHlOYW1lID09PSAncmVxdWlyZWQnKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl90cmFuc2xhdGUoJ1JlcXVpcmVkJyk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5TmFtZSA9PT0gJ21pbmxlbmd0aCcpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZSgnTWluIExlbmd0aCcsIHtcclxuXHRcdFx0XHRcdFx0XHRsZW5ndGg6IGVycm9yLnJlcXVpcmVkTGVuZ3RoXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eU5hbWUgPT09ICdtYXhsZW5ndGgnKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl90cmFuc2xhdGUoJ01heCBMZW5ndGgnLCB7XHJcblx0XHRcdFx0XHRcdFx0bGVuZ3RoOiBlcnJvci5yZXF1aXJlZExlbmd0aFxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHlOYW1lID09PSAnZW1haWwnKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl90cmFuc2xhdGUoJ0VtYWlsJyk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5TmFtZSA9PT0gJ3VybCcpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZSgnVXJsJyk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKFxyXG5cdFx0XHRcdFx0XHRwcm9wZXJ0eU5hbWUgPT09ICdkYXRlcGlja2VyTWluJyB8fFxyXG5cdFx0XHRcdFx0XHRwcm9wZXJ0eU5hbWUgPT09ICdtYXREYXRlcGlja2VyTWluJ1xyXG5cdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl90cmFuc2xhdGUoJ01pbiBEYXRlJywge1xyXG5cdFx0XHRcdFx0XHRcdGRhdGU6IGZvcm1hdERhdGUoZXJyb3IubWluLCB0aGlzLmRhdGVGb3JtYXQsIHRoaXMudHJhbnNsYXRlLmN1cnJlbnRMYW5nKVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoXHJcblx0XHRcdFx0XHRcdHByb3BlcnR5TmFtZSA9PT0gJ2RhdGVwaWNrZXJNYXgnIHx8XHJcblx0XHRcdFx0XHRcdHByb3BlcnR5TmFtZSA9PT0gJ21hdERhdGVwaWNrZXJNYXgnXHJcblx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZSgnTWF4IERhdGUnLCB7XHJcblx0XHRcdFx0XHRcdFx0ZGF0ZTogZm9ybWF0RGF0ZShlcnJvci5tYXgsIHRoaXMuZGF0ZUZvcm1hdCwgdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmcpXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChcclxuXHRcdFx0XHRcdFx0cHJvcGVydHlOYW1lID09PSAnZGF0ZXBpY2tlckZpbHRlcicgfHxcclxuXHRcdFx0XHRcdFx0cHJvcGVydHlOYW1lID09PSAnbWF0ZGF0ZXBpY2tlckZpbHRlcicgfHxcclxuXHRcdFx0XHRcdFx0cHJvcGVydHlOYW1lID09PSAnZGF0ZXBpY2tlclBhcnNlJyB8fFxyXG5cdFx0XHRcdFx0XHRwcm9wZXJ0eU5hbWUgPT09ICdtYXREYXRlcGlja2VyUGFyc2UnXHJcblx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZSgnRGF0ZScpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvYnNlcnZhYmxlT2YobnVsbCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIF90cmFuc2xhdGUoa2V5OiBzdHJpbmcsIHBhcmFtcz86IE9iamVjdCkge1xyXG5cdFx0cmV0dXJuIHRoaXMudHJhbnNsYXRlLmdldChgVmFsaWRhdGlvbi5GaWVsZC4ke2tleX1gLCBwYXJhbXMpO1xyXG5cdH1cclxufVxyXG4iXX0=