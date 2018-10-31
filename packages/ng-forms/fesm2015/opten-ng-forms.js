import { Directive, Input, ElementRef, NgModule } from '@angular/core';
import '@angular/forms';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { formatDate, CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class ErrorMessageForDirective {
    /**
     * @param {?} _element
     * @param {?} translate
     */
    constructor(_element, translate) {
        this._element = _element;
        this.translate = translate;
        this.dateFormat = 'DD.MM.YYYY';
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        this._translateSubscription = this._message.subscribe(message => {
            if (message && message != null) {
                this._element.nativeElement.innerHTML = message;
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // Das ist ein test
        if (this._translateSubscription) {
            this._translateSubscription.unsubscribe();
        }
    }
    /**
     * @return {?}
     */
    get _message() {
        if (this.control) {
            for (const propertyName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(propertyName)) {
                    /** @type {?} */
                    const error = this.control.errors[propertyName];
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
    }
    /**
     * @param {?} key
     * @param {?=} params
     * @return {?}
     */
    _translate(key, params) {
        return this.translate.get(`Validation.Field.${key}`, params);
    }
}
ErrorMessageForDirective.decorators = [
    { type: Directive, args: [{
                selector: '[op10ErrorMessageFor]'
            },] }
];
/** @nocollapse */
ErrorMessageForDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: TranslateService }
];
ErrorMessageForDirective.propDecorators = {
    control: [{ type: Input, args: ['op10ErrorMessageFor',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class FormsModule {
}
FormsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [ErrorMessageForDirective],
                exports: [ErrorMessageForDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { FormsModule, ErrorMessageForDirective };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0ZW4tbmctZm9ybXMuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BvcHRlbi9uZy1mb3Jtcy9saWIvZXJyb3ItbWVzc2FnZS1mb3IuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ab3B0ZW4vbmctZm9ybXMvbGliL2Zvcm1zLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG5cdERpcmVjdGl2ZSxcclxuXHRJbnB1dCxcclxuXHRBZnRlclZpZXdDaGVja2VkLFxyXG5cdE9uRGVzdHJveSxcclxuXHRFbGVtZW50UmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIGFzIG9ic2VydmFibGVPZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcblx0c2VsZWN0b3I6ICdbb3AxMEVycm9yTWVzc2FnZUZvcl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFcnJvck1lc3NhZ2VGb3JEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kge1xyXG5cclxuXHRASW5wdXQoJ29wMTBFcnJvck1lc3NhZ2VGb3InKVxyXG5cdGNvbnRyb2w6IEZvcm1Db250cm9sO1xyXG5cclxuXHRwcml2YXRlIGRhdGVGb3JtYXQgPSAnREQuTU0uWVlZWSc7XHJcblxyXG5cdHByaXZhdGUgX3RyYW5zbGF0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcblx0XHRwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZVxyXG5cdCkge31cclxuXHJcblx0bmdBZnRlclZpZXdDaGVja2VkKCkge1xyXG5cdFx0dGhpcy5fdHJhbnNsYXRlU3Vic2NyaXB0aW9uID0gdGhpcy5fbWVzc2FnZS5zdWJzY3JpYmUobWVzc2FnZSA9PiB7XHJcblx0XHRcdGlmIChtZXNzYWdlICYmIG1lc3NhZ2UgIT0gbnVsbCkge1xyXG5cdFx0XHRcdHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBtZXNzYWdlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG5nT25EZXN0cm95KCkge1xyXG5cdFx0Ly8gRGFzIGlzdCBlaW4gdGVzdFxyXG5cdFx0aWYgKHRoaXMuX3RyYW5zbGF0ZVN1YnNjcmlwdGlvbikge1xyXG5cdFx0XHR0aGlzLl90cmFuc2xhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBfbWVzc2FnZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cdFx0aWYgKHRoaXMuY29udHJvbCkge1xyXG5cdFx0XHRmb3IgKGNvbnN0IHByb3BlcnR5TmFtZSBpbiB0aGlzLmNvbnRyb2wuZXJyb3JzKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuY29udHJvbC5lcnJvcnMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xyXG5cdFx0XHRcdFx0Y29uc3QgZXJyb3I6IHtcclxuXHRcdFx0XHRcdFx0YWN0dWFsOiBEYXRlO1xyXG5cdFx0XHRcdFx0XHRtaW46IERhdGU7XHJcblx0XHRcdFx0XHRcdG1heDogRGF0ZTtcclxuXHRcdFx0XHRcdFx0YWN0dWFsTGVuZ3RoOiBudW1iZXI7XHJcblx0XHRcdFx0XHRcdHJlcXVpcmVkTGVuZ3RoOiBudW1iZXI7XHJcblx0XHRcdFx0XHR9ID0gdGhpcy5jb250cm9sLmVycm9yc1twcm9wZXJ0eU5hbWVdO1xyXG5cclxuXHRcdFx0XHRcdGlmIChwcm9wZXJ0eU5hbWUgPT09ICdyZXF1aXJlZCcpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZSgnUmVxdWlyZWQnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHlOYW1lID09PSAnbWlubGVuZ3RoJykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fdHJhbnNsYXRlKCdNaW4gTGVuZ3RoJywge1xyXG5cdFx0XHRcdFx0XHRcdGxlbmd0aDogZXJyb3IucmVxdWlyZWRMZW5ndGhcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5TmFtZSA9PT0gJ21heGxlbmd0aCcpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZSgnTWF4IExlbmd0aCcsIHtcclxuXHRcdFx0XHRcdFx0XHRsZW5ndGg6IGVycm9yLnJlcXVpcmVkTGVuZ3RoXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eU5hbWUgPT09ICdlbWFpbCcpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZSgnRW1haWwnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHlOYW1lID09PSAndXJsJykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fdHJhbnNsYXRlKCdVcmwnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoXHJcblx0XHRcdFx0XHRcdHByb3BlcnR5TmFtZSA9PT0gJ2RhdGVwaWNrZXJNaW4nIHx8XHJcblx0XHRcdFx0XHRcdHByb3BlcnR5TmFtZSA9PT0gJ21hdERhdGVwaWNrZXJNaW4nXHJcblx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZSgnTWluIERhdGUnLCB7XHJcblx0XHRcdFx0XHRcdFx0ZGF0ZTogZm9ybWF0RGF0ZShlcnJvci5taW4sIHRoaXMuZGF0ZUZvcm1hdCwgdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmcpXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChcclxuXHRcdFx0XHRcdFx0cHJvcGVydHlOYW1lID09PSAnZGF0ZXBpY2tlck1heCcgfHxcclxuXHRcdFx0XHRcdFx0cHJvcGVydHlOYW1lID09PSAnbWF0RGF0ZXBpY2tlck1heCdcclxuXHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fdHJhbnNsYXRlKCdNYXggRGF0ZScsIHtcclxuXHRcdFx0XHRcdFx0XHRkYXRlOiBmb3JtYXREYXRlKGVycm9yLm1heCwgdGhpcy5kYXRlRm9ybWF0LCB0aGlzLnRyYW5zbGF0ZS5jdXJyZW50TGFuZylcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKFxyXG5cdFx0XHRcdFx0XHRwcm9wZXJ0eU5hbWUgPT09ICdkYXRlcGlja2VyRmlsdGVyJyB8fFxyXG5cdFx0XHRcdFx0XHRwcm9wZXJ0eU5hbWUgPT09ICdtYXRkYXRlcGlja2VyRmlsdGVyJyB8fFxyXG5cdFx0XHRcdFx0XHRwcm9wZXJ0eU5hbWUgPT09ICdkYXRlcGlja2VyUGFyc2UnIHx8XHJcblx0XHRcdFx0XHRcdHByb3BlcnR5TmFtZSA9PT0gJ21hdERhdGVwaWNrZXJQYXJzZSdcclxuXHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fdHJhbnNsYXRlKCdEYXRlJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG9ic2VydmFibGVPZihudWxsKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgX3RyYW5zbGF0ZShrZXk6IHN0cmluZywgcGFyYW1zPzogT2JqZWN0KSB7XHJcblx0XHRyZXR1cm4gdGhpcy50cmFuc2xhdGUuZ2V0KGBWYWxpZGF0aW9uLkZpZWxkLiR7a2V5fWAsIHBhcmFtcyk7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7IEVycm9yTWVzc2FnZUZvckRpcmVjdGl2ZSB9IGZyb20gJy4vZXJyb3ItbWVzc2FnZS1mb3IuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcblx0aW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcblx0ZGVjbGFyYXRpb25zOiBbRXJyb3JNZXNzYWdlRm9yRGlyZWN0aXZlXSxcclxuXHRleHBvcnRzOiBbRXJyb3JNZXNzYWdlRm9yRGlyZWN0aXZlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybXNNb2R1bGUge31cclxuIl0sIm5hbWVzIjpbIm9ic2VydmFibGVPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1Ba0JhLHdCQUF3Qjs7Ozs7SUFTcEMsWUFDUyxRQUFvQixFQUNwQixTQUEyQjtRQUQzQixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBTjVCLGVBQVUsR0FBRyxZQUFZLENBQUM7S0FPOUI7Ozs7SUFFSixrQkFBa0I7UUFDakIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU87WUFDNUQsSUFBSSxPQUFPLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQzthQUNoRDtTQUNELENBQUMsQ0FBQztLQUNIOzs7O0lBRUQsV0FBVzs7UUFFVixJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUNoQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDMUM7S0FDRDs7OztJQUVELElBQUksUUFBUTtRQUNYLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixLQUFLLE1BQU0sWUFB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