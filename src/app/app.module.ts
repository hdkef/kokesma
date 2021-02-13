import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from './shared/shared.module';
import * as fromApp from './redux/reducer/app-reducer'
import { AuthEffects } from './redux/side-effects/auth-effects';
import { TomasEffects } from './redux/side-effects/tomas-effects';
import { AuthInterceptorService } from './http-interceptor/auth-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects,TomasEffects]),
    SharedModule,
  ],
  bootstrap: [AppComponent],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}]
})
export class AppModule { }
