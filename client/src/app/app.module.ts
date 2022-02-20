import {LayoutModule} from "@angular/cdk/layout";
import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ChatListComponent} from "app/chat-list/chat-list.component";
import {ApiHttpClient} from "app/com";
import {NewChatComponent} from "app/new-chat/new-chat.component";

import {AppComponent} from "./app.component";

/**
 * App module
 */
@NgModule({
    declarations: [
        AppComponent,
        ChatListComponent,
        NewChatComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        LayoutModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
    ],
    providers: [ApiHttpClient],
    bootstrap: [AppComponent],
})
export class AppModule {
}
