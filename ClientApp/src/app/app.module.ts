import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { PresentacionComponent } from './components/presentacion/presentacion.component';
import { EquipoComponent } from './components/equipo/equipo.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { BibliografiaComponent } from './components/bibliografia/bibliografia.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/users-table/admin.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UsersFormComponent } from './components/admin/users-form/users-form.component';
import { LogosComponent } from './components/home/logos/logos.component';
import { ContentComponent } from './components/home/content/content.component';
import { FooterComponent } from './components/home/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    PresentacionComponent,
    EquipoComponent,
    ConsultaComponent,
    BibliografiaComponent,
    LoginComponent,
    UsersFormComponent,
    AdminComponent,
    LogosComponent,
    ContentComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' }      
    ]),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
