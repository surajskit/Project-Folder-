import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SeatBookingPageComponent } from './seat-booking-page/seat-booking-page.component';

const routes: Routes = [
  {path:'',redirectTo:'home-page',pathMatch:'full'},
  {path:'home-page',component:HomePageComponent},
  {path: 'seat-booking-page' ,component:SeatBookingPageComponent},
  {path:'**',component:HomePageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
