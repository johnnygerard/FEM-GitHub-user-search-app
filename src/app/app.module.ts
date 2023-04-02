import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { GitHubMentionsDirective } from './git-hub-mentions.directive';

@NgModule({
  declarations: [
    AppComponent,
    ThemeSwitchComponent,
    SearchBarComponent,
    UserInfoComponent,
    GitHubMentionsDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
