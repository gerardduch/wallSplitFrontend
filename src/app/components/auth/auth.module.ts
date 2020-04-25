import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { IonicStorageModule } from '@ionic/storage';
import { tokenGetter } from 'src/app/services/auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:8100'],
        blacklistedRoutes: [],
      },
    }),
  ],
})
export class AuthModule {}
