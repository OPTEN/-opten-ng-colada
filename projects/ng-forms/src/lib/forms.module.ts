import { ErrorMessageForDirective } from './error-message-for.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [CommonModule],
	declarations: [ErrorMessageForDirective],
	exports: [ErrorMessageForDirective]
})
export class FormsModule {}
