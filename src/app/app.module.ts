import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes ,provideRoutes} from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { ServicesComponent } from './services/services.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { CompteComponent } from './compte/compte.component';
import { MenuComponent } from './menu/menu.component';

const appRoutes: Routes = [
  { path: '',  redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'compte', component: CompteComponent },
  { path: 'services', component: ServicesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    LoginComponent,
    ServicesComponent,
    RegisterComponent,
    LogoutComponent,
    CompteComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
