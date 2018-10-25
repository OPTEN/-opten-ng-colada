import {
	Directive,
	Input,
	AfterViewChecked,
	OnDestroy,
	ElementRef
} from '@angular/core';

import { FormControl } from '@angular/forms';

import { Observable, of as observableOf, Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { formatDate } from '@angular/common';

@Directive({
	selector: '[op10ErrorMessageFor]'
})
export class ErrorMessageForDirective implements AfterViewChecked, OnDestroy {

	@Input('op10ErrorMessageFor')
	control: FormControl;

	private dateFormat = 'DD.MM.YYYY';

	private _translateSubscription: Subscription;

	constructor(
		private _element: ElementRef,
		private translate: TranslateService
	) {}

	ngAfterViewChecked() {
		this._translateSubscription = this._message.subscribe(message => {
			if (message && message != null) {
				this._element.nativeElement.innerHTML = message;
			}
		});
	}

	ngOnDestroy() {
		if (this._translateSubscription) {
			this._translateSubscription.unsubscribe();
		}
	}

	get _message(): Observable<any> {
		if (this.control) {
			for (const propertyName in this.control.errors) {
				if (this.control.errors.hasOwnProperty(propertyName)) {
					const error: {
						actual: Date;
						min: Date;
						max: Date;
						actualLength: number;
						requiredLength: number;
					} = this.control.errors[propertyName];

					if (propertyName === 'required') {
						return this._translate('Required');
					} else if (propertyName === 'minlength') {
						return this._translate('Min Length', {
							length: error.requiredLength
						});
					} else if (propertyName === 'maxlength') {
						return this._translate('Max Length', {
							length: error.requiredLength
						});
					} else if (propertyName === 'email') {
						return this._translate('Email');
					} else if (propertyName === 'url') {
						return this._translate('Url');
					} else if (
						propertyName === 'datepickerMin' ||
						propertyName === 'matDatepickerMin'
					) {
						return this._translate('Min Date', {
							date: formatDate(error.min, this.dateFormat, this.translate.currentLang)
						});
					} else if (
						propertyName === 'datepickerMax' ||
						propertyName === 'matDatepickerMax'
					) {
						return this._translate('Max Date', {
							date: formatDate(error.max, this.dateFormat, this.translate.currentLang)
						});
					} else if (
						propertyName === 'datepickerFilter' ||
						propertyName === 'matdatepickerFilter' ||
						propertyName === 'datepickerParse' ||
						propertyName === 'matDatepickerParse'
					) {
						return this._translate('Date');
					}
				}
			}
		}

		return observableOf(null);
	}

	private _translate(key: string, params?: Object) {
		return this.translate.get(`Validation.Field.${key}`, params);
	}
}
