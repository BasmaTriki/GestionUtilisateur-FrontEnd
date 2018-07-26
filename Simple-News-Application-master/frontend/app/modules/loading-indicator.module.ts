import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
	LoadingIndicatorService 
} from 'services/loading-indicator.service';

import { 
	LoadingIndicatorComponent,
} from 'includes/loading-indicator.component';

export { LoadingIndicatorService } from 'services/loading-indicator.service';

@NgModule({
	declarations: [
		LoadingIndicatorComponent
	],
	imports: [CommonModule],
	exports: [LoadingIndicatorComponent],
	providers: [LoadingIndicatorService]
})

export class LoadingIndicatorModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: LoadingIndicatorModule,
			providers: [LoadingIndicatorService]
		};
	}
}