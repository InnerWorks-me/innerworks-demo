import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontendFlowDemoPageComponent } from './frontend-flow-demo-page/frontend-flow-demo-page.component';
import { AuthFlowDemoPageComponent } from './auth-flow-demo-page/auth-flow-demo-page.component';
import { CallbackComponent } from './auth-flow-demo-page/callback/callback.component';
import { HomeComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: 'frontend-flow-demo', component: FrontendFlowDemoPageComponent },
  { path: 'auth-flow-demo', component: AuthFlowDemoPageComponent },
  { path: 'auth-flow-demo/callback', component: CallbackComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
