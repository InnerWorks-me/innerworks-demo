import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthFlowDemoPageComponent } from './auth-flow-demo-page/auth-flow-demo-page.component';
import { FrontendFlowDemoPageComponent } from './frontend-flow-demo-page/frontend-flow-demo-page.component';
import { CallbackComponent } from './auth-flow-demo-page/callback/callback.component';
import { HomeComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    AuthFlowDemoPageComponent,
    FrontendFlowDemoPageComponent,
    CallbackComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
