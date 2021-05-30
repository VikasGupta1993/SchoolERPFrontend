import  { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ProfessorState } from './professor/professor.state';
import { environment } from 'src/environments/environment';
 
const states = [ProfessorState];

@NgModule({
  imports: [
    NgxsModule.forRoot(states,{ developmentMode: !environment.production }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  exports: [NgxsModule],
  declarations: [],
  providers: [],
})
export class StoreModule {
}