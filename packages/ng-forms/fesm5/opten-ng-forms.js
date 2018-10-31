import { Directive, Input, ElementRef, NgModule } from '@angular/core';
import '@angular/forms';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { formatDate, CommonModule } from '@angular/common';

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
            return of(null);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var FormsModule = /** @class */ (function () {
    function FormsModule() {
    }
    FormsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
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

export { FormsModule, ErrorMessageForDirective };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0ZW4tbmctZm9ybXMuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BvcHRlbi9uZy1mb3Jtcy9saWIvZXJyb3ItbWVzc2FnZS1mb3IuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ab3B0ZW4vbmctZm9ybXMvbGliL2Zvcm1zLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG5cdERpcmVjdGl2ZSxcclxuXHRJbnB1dCxcclxuXHRBZnRlclZpZXdDaGVja2VkLFxyXG5cdE9uRGVzdHJveSxcclxuXHRFbGVtZW50UmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIGFzIG9ic2VydmFibGVPZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcblx0c2VsZWN0b3I6ICdbb3AxMEVycm9yTWVzc2FnZUZvcl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFcnJvck1lc3NhZ2VGb3JEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kge1xyXG5cclxuXHRASW5wdXQoJ29wMTBFcnJvck1lc3NhZ2VGb3InKVxyXG5cdGNvbnRyb2w6IEZvcm1Db250cm9sO1xyXG5cclxuXHRwcml2YXRlIGRhdGVGb3JtYXQgPSAnREQuTU0uWVlZWSc7XHJcblxyXG5cdHByaXZhdGUgX3RyYW5zbGF0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcblx0XHRwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZVxyXG5cdCkge31cclxuXHJcblx0bmdBZnRlclZpZXdDaGVja2VkKCkge1xyXG5cdFx0dGhpcy5fdHJhbnNsYXRlU3Vic2NyaXB0aW9uID0gdGhpcy5fbWVzc2FnZS5zdWJzY3JpYmUobWVzc2FnZSA9PiB7XHJcblx0XHRcdGlmIChtZXNzYWdlICYmIG1lc3NhZ2UgIT0gbnVsbCkge1xyXG5cdFx0XHRcdHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBtZXNzYWdlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG5nT25EZXN0cm95KCkge1xyXG5cdFx0Ly8gRGFzIGlzdCBlaW4gdGVzdFxyXG5cdFx0aWYgKHRoaXMuX3RyYW5zbGF0ZVN1YnNjcmlwdGlvbikge1xyXG5cdFx0XHR0aGlzLl90cmFuc2xhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBfbWVzc2FnZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cdFx0aWYgKHRoaXMuY29udHJvbCkge1xyXG5cdFx0XHRmb3IgKGNvbnN0IHByb3BlcnR5TmFtZSBpbiB0aGlzLmNvbnRyb2wuZXJyb3JzKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuY29udHJvbC5lcnJvcnMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xyXG5cdFx0XHRcdFx0Y29uc3QgZXJyb3I6IHtcclxuXHRcdFx0XHRcdFx0YWN0dWFsOiBEYXRlO1xyXG5cdFx0XHRcdFx0XHRtaW46IERhdGU7XHJcblx0XHRcdFx0XHRcdG1heDogRGF0ZTtcclxuXHRcdFx0XHRcdFx0YWN0dWFsTGVuZ3RoOiBudW1iZXI7XHJcblx0XHRcdFx0XHRcdHJlcXVpcmVkTGVuZ3RoOiBudW1iZXI7XHJcblx0XHRcdFx0XHR9ID0gdGhpcy5jb250cm9sLmVycm9yc1twcm9wZXJ0eU5hbWVdO1xyXG5cclxuXHRcdFx0XHRcdGlmIChwcm9wZXJ0eU5hbWUgPT09ICdyZXF1aXJlZCcpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZSgnUmVxdWlyZWQnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHlOYW1lID09PSAnbWlubGVuZ3RoJykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fdHJhbnNsYXRlKCdNaW4gTGVuZ3RoJywge1xyXG5cdFx0XHRcdFx0XHRcdGxlbmd0aDogZXJyb3IucmVxdWlyZWRMZW5ndGhcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5TmFtZSA9PT0gJ21heGxlbmd0aCcpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZSgnTWF4IExlbmd0aCcsIHtcclxuXHRcdFx0XHRcdFx0XHRsZW5ndGg6IGVycm9yLnJlcXVpcmVkTGVuZ3RoXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eU5hbWUgPT09ICdlbWFpbCcpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZSgnRW1haWwnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHlOYW1lID09PSAndXJsJykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fdHJhbnNsYXRlKCdVcmwnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoXHJcblx0XHRcdFx0XHRcdHByb3BlcnR5TmFtZSA9PT0gJ2RhdGVwaWNrZXJNaW4nIHx8XHJcblx0XHRcdFx0XHRcdHByb3BlcnR5TmFtZSA9PT0gJ21hdERhdGVwaWNrZXJNaW4nXHJcblx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZSgnTWluIERhdGUnLCB7XHJcblx0XHRcdFx0XHRcdFx0ZGF0ZTogZm9ybWF0RGF0ZShlcnJvci5taW4sIHRoaXMuZGF0ZUZvcm1hdCwgdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmcpXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChcclxuXHRcdFx0XHRcdFx0cHJvcGVydHlOYW1lID09PSAnZGF0ZXBpY2tlck1heCcgfHxcclxuXHRcdFx0XHRcdFx0cHJvcGVydHlOYW1lID09PSAnbWF0RGF0ZXBpY2tlck1heCdcclxuXHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fdHJhbnNsYXRlKCdNYXggRGF0ZScsIHtcclxuXHRcdFx0XHRcdFx0XHRkYXRlOiBmb3JtYXREYXRlKGVycm9yLm1heCwgdGhpcy5kYXRlRm9ybWF0LCB0aGlzLnRyYW5zbGF0ZS5jdXJyZW50TGFuZylcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKFxyXG5cdFx0XHRcdFx0XHRwcm9wZXJ0eU5hbWUgPT09ICdkYXRlcGlja2VyRmlsdGVyJyB8fFxyXG5cdFx0XHRcdFx0XHRwcm9wZXJ0eU5hbWUgPT09ICdtYXRkYXRlcGlja2VyRmlsdGVyJyB8fFxyXG5cdFx0XHRcdFx0XHRwcm9wZXJ0eU5hbWUgPT09ICdkYXRlcGlja2VyUGFyc2UnIHx8XHJcblx0XHRcdFx0XHRcdHByb3BlcnR5TmFtZSA9PT0gJ21hdERhdGVwaWNrZXJQYXJzZSdcclxuXHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fdHJhbnNsYXRlKCdEYXRlJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG9ic2VydmFibGVPZihudWxsKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgX3RyYW5zbGF0ZShrZXk6IHN0cmluZywgcGFyYW1zPzogT2JqZWN0KSB7XHJcblx0XHRyZXR1cm4gdGhpcy50cmFuc2xhdGUuZ2V0KGBWYWxpZGF0aW9uLkZpZWxkLiR7a2V5fWAsIHBhcmFtcyk7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7IEVycm9yTWVzc2FnZUZvckRpcmVjdGl2ZSB9IGZyb20gJy4vZXJyb3ItbWVzc2FnZS1mb3IuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcblx0aW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcblx0ZGVjbGFyYXRpb25zOiBbRXJyb3JNZXNzYWdlRm9yRGlyZWN0aXZlXSxcclxuXHRleHBvcnRzOiBbRXJyb3JNZXNzYWdlRm9yRGlyZWN0aXZlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybXNNb2R1bGUge31cclxuIl0sIm5hbWVzIjpbIm9ic2VydmFibGVPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0lBMkJDLGtDQUNTLFFBQW9CLEVBQ3BCLFNBQTJCO1FBRDNCLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFONUIsZUFBVSxHQUFHLFlBQVksQ0FBQztLQU85Qjs7OztJQUVKLHFEQUFrQjs7O0lBQWxCO1FBQUEsaUJBTUM7UUFMQSxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPO1lBQzVELElBQUksT0FBTyxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0JBQy9CLEtBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7YUFDaEQ7U0FDRCxDQUFDLENBQUM7S0FDSDs7OztJQUVELDhDQUFXOzs7SUFBWDs7UUFFQyxJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUNoQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDMUM7S0FDRDtJQUVELHNCQUFJLDhDQUFROzs7O1FBQVo7WUFDQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVB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