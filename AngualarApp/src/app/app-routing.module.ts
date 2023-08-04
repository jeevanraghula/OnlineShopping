import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouritesComponent } from './favourites/favourites.component'
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { SearchpageComponent } from './searchpage/searchpage.component';

const routes: Routes = [{ path: "",component: ProductsComponent},
                        {path:"login",component: LoginComponent},
                        { path: "favorites", component: FavouritesComponent},
                        {path : "search/:name", component:SearchpageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
