import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { Header } from './components/header/app.header';
import { Footer } from './components/footer/app.footer';
import { Contact } from './components/contact/app.contact';
import { About } from './components/about/app.about';


const appRoutes: Routes = [
  {
    path: 'about',
    component: About
  },
  {
    path: 'contact',
    component: Contact
  },
  { path: '', component: About },
  { path: '**', component: Contact }
];


@NgModule({
  declarations: [
    AppComponent,
    Header,
    Footer,
    Contact,
    About
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
