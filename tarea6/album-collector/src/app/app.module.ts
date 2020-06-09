import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CollectionComponent } from './collection/collection.component';
import { MenuComponent } from './menu/menu.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CollectionsState } from './collections.state';
import { environment } from 'src/environments/environment';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    DashboardComponent,
    CollectionComponent,
    CarouselComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    CarouselModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([CollectionsState], { developmentMode: !environment.production }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
