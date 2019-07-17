import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, MatDatepickerModule, MatNativeDateModule , MatCheckboxModule,MatRadioModule, MatTableModule , MatFormFieldModule, MatDividerModule,MatCardModule, MatInputModule, MatIconModule , MatOptionModule, MatSelectModule, MatButtonModule, MatSnackBarModule} from '@angular/material';

import { AppComponent } from './app.component';
import { ListComponent } from './employee/list/list.component';
import { CreateComponent } from './employee/create/create.component';
import { EditComponent } from './employee/edit/edit.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule,MatRadioModule,MatTableModule, MatFormFieldModule,MatDividerModule,MatCardModule, MatInputModule, MatIconModule, MatOptionModule, MatSelectModule, MatButtonModule, MatSnackBarModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
