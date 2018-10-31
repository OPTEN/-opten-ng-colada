import { AfterViewChecked, OnDestroy, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
export declare class ErrorMessageForDirective implements AfterViewChecked, OnDestroy {
    private _element;
    private translate;
    control: FormControl;
    private dateFormat;
    private _translateSubscription;
    constructor(_element: ElementRef, translate: TranslateService);
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    readonly _message: Observable<any>;
    private _translate;
}
