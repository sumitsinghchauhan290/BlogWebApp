import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogRegisterComponent } from './Component/blog-register/blog-register.component';
import { BlogComponent } from './Component/blog/blog.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorInterceptor } from './Interceptor/http-interceptor.interceptor';
import { DatePipe } from '@angular/common';
import { GlobalErrorHandlerInterceptor } from './Interceptor/global-error-handler.interceptor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BlogRegisterComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DatePipe
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:HttpInterceptorInterceptor,
    multi: true,
  },{
    provide:ErrorHandler,
    useClass:GlobalErrorHandlerInterceptor
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
