import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
// import { FavouritesComponent } from './favourites/favourites.component';
import { MatIconModule } from '@angular/material/icon'
// import { ProductsComponent } from './products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SearchpageComponent } from './searchpage/searchpage.component';
import { OrdersComponent } from './header/orders/orders.component';
import { CartComponent } from './header/cart/cart.component';
import { AuthComponent } from './auth/auth.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { ProductServiceService } from './Services/product-service.service';
import { FavoritesComponent } from './header/favorites/favorites.component';
import { SearchpageComponent } from './searchpage/searchpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    // FavouritesComponent,
    ProductsComponent,
    // SearchpageComponent,
    // FavouritesComponent,
    OrdersComponent,
    CartComponent,
    AuthComponent,
    NoPageFoundComponent,
    ProductsComponent,
    FavoritesComponent,
    SearchpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ProductServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
