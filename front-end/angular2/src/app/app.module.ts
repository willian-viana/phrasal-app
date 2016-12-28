import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './components/app/app.component';
import { Header } from './components/header/app.header';
import { Footer } from './components/footer/app.footer';
import { Contact } from './components/contact/app.contact';
import { About } from './components/about/app.about';
import { searchVerbs } from './components/search-verbs/app.search-verbs';

// Services
import { HttpService } from './services/get-verbs.service';


const appRoutes: Routes = [
  {
    path: 'about',
    component: About
  },
  {
    path: 'contact',
    component: Contact
  },
  { path: '', component: searchVerbs },
  { path: '**', component: searchVerbs }
];


@NgModule({
  declarations: [
    AppComponent,
    Header,
    Footer,
    Contact,
    About,
    searchVerbs
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
