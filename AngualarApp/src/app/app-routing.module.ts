import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CartComponent } from './header/cart/cart.component';
import { FavoritesComponent } from './header/favorites/favorites.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { ProductsComponent } from './products/products.component';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { AuthGuard } from './shared/auth.guard';
// import { ProductsComponent } from './products/products.component';
// import { SearchpageComponent } from './searchpage/searchpage.component';

const routes: Routes = [
  // { path: "",component: ProductsComponent},
                        // {path : "search/:name", component:SearchpageComponent},
                        {path:"",component:ProductsComponent},
                        {path : "authenticate", component:AuthComponent},
                        {path : "search/:name", component:SearchpageComponent},
                        {path : "user/:id", component:ProductsComponent},
                        {path : "favorites", component:FavoritesComponent,canActivate:[AuthGuard]},
                        {path : "cart", component:CartComponent,canActivate:[AuthGuard]},
                        {path:"**",component:NoPageFoundComponent},
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
