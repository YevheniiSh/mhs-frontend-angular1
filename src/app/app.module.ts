import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [TestComponent]
})
export class AppModule {
}
