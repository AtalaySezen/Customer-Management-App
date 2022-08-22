import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UsersInfoComponent } from './components/users-info/users-info.component';
import { DashboardGuard } from './shared/dashboard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent,title:'Login'},
  { path: 'dashboard', component: DashboardComponent, canActivate: [DashboardGuard],title:'Dashboard'},
  { path: 'register', component: RegisterComponent,title:'Sign Up'},
  { path: 'users', component: UsersInfoComponent, canActivate: [DashboardGuard],title:'Users'},
  { path: 'calendar', component: CalendarComponent, canActivate: [DashboardGuard],title:'Calendar'},
  { path: 'settings', component: SettingsComponent, canActivate: [DashboardGuard],title:'Settings'},
  { path: '**', component: PageNotFoundComponent,title:'Page Not Found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
