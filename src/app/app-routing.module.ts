import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { PublicarInmuebleComponent } from './components/publicar-inmueble/publicar-inmueble.component';
import { VisualizeItemComponent } from './components/visualize-item/visualize-item.component';
import { MakeOpinionComponent } from './components/make-opinion/make-opinion.component';



const routes: Routes = [
  {
    path:"user/:id",
    component: PrincipalComponent
  },
  {
    path:"visualizar/:id",
  component:VisualizeItemComponent
  },
  { path: '', component:PrincipalComponent },
  { path:'home', component:PrincipalComponent},
  { path: 'property-card', component:PropertyCardComponent },
  { path: 'publicar', component:PublicarInmuebleComponent },
  { path: 'visualizar', component:VisualizeItemComponent },
  {
  path: "resena/:id",
  component:MakeOpinionComponent
  },
  { path: 'resena', component:MakeOpinionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
