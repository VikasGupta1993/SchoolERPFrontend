import  { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ProfessorState } from './professor/professor.state';
 
const states = [ProfessorState];

@NgModule({
  imports: [
    NgxsModule.forRoot(states),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  exports: [NgxsModule],
  declarations: [],
  providers: [],
})
export class StoreModule {
}