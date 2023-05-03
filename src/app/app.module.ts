import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatStepperModule} from '@angular/material/stepper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { VisualizeItemComponent } from './components/visualize-item/visualize-item.component';
import { PublicarInmuebleComponent } from './components/publicar-inmueble/publicar-inmueble.component';
import { MakeOpinionComponent } from './components/make-opinion/make-opinion.component'
import {FormBuilder, Validators} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PrincipalComponent,
    PropertyCardComponent,
    VisualizeItemComponent,
    PublicarInmuebleComponent,
    MakeOpinionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatStepperModule,
    NgbModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
