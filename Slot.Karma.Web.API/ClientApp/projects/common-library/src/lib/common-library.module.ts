import { CommonModule as AngualrCommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadMaskComponent } from './components/mask/load.mask.component'
import { CommonLibraryComponent } from './common-library.component';
import { MomentPipe, MomentUTCPipe } from './pipes/moment.pipe';
import { StylePipe } from './pipes/style.pipe';
import { SafeHtmlDirective, UnSafeHtmlDirective } from './directives/html.directive';
import { InputNumberFormatDirective } from './directives/input.number.format.directive';
import { InputFilterDirective } from './directives/input.filter.directive';
import { LoadingService } from './services/loading.service';

const MODULES = [
  AngualrCommonModule
]
const COMPONENTS = [
  CommonLibraryComponent,
  LoadMaskComponent
];

const PIPES = [
  StylePipe,
  MomentPipe,
  MomentUTCPipe
];
const DIRECTIVES = [
  InputFilterDirective,
  InputNumberFormatDirective,
  SafeHtmlDirective, UnSafeHtmlDirective
]

const SERVICES = [
  LoadingService
];
@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES
  ],
  providers: [
    ...SERVICES
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES
  ]
})
export class CommonLibraryModule { }
