import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../guards/auth-inteceptor';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ]
})
export class Coremodule {
    constructor(@Optional() @SkipSelf() parentModule: Coremodule) {
        if (parentModule) {
            throw new Error(" CoreModule is already loaded. Import only in AppModule");
        }
    }
}
