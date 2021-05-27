import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProfessorModel } from './professor';
import { ProfessorAction } from './professor.action';
import { ProfessorService } from 'src/app/professors/service/professor.service';


export class ProfessorStateModel {
    professor: ProfessorModel[] | undefined;
}

@State<ProfessorStateModel>({
    name: 'professor',
})

@Injectable()
export class ProfessorState {
    constructor(
        private router: Router, private professorService:ProfessorService) {}

    @Selector()
    static getProfessorList(state: ProfessorStateModel) {
        return state.professor;
    }

    @Action(ProfessorAction.GetProfessorList)
    getProfessors({ getState, setState }: StateContext<ProfessorStateModel>) {
        return this.professorService.getProfessors().pipe(tap((result: any) => {
            const models = result.getModels();
            const state = getState();
            setState({
                ...state,
                 professor:models,
            });
        }));
    }

    // @Action(Tenant.RemoveTenant)
    // removeTenant({ getState, setState }: StateContext<TenantStateModel>, {id}: Tenant.RemoveTenant) {
    //     return this.executionService.deleteRecord(TenantModel, id).pipe(tap(() => {
    //         const state = getState();
    //         const filteredTenantList = state.tenant?.filter(item => item.id !== id)
    //         setState({
    //             ...state,
    //                tenant: filteredTenantList,
    //         });
    //     }))
    // }

//     @Action(Tenant.UpdateTenant)
//     updateTenant({getState, setState}: StateContext<TenantStateModel>, {id ,navigationUrl}: Tenant.UpdateTenant) {
//         return this.executionService.findRecord(TenantModel,id).pipe(tap((result) => {
//             let state = getState();
//             const tenantList = state.tenant;
//             const tenantIndex = tenantList?.findIndex(item => item.id === id);
//             if(tenantList && tenantIndex != undefined) {
//              tenantList[tenantIndex] = result;
//             setState({
//                 ...state,
//                    tenant: tenantList,
//             });
//             this.router.navigate([navigationUrl]);
//     }
//   }));
//  }

 @Action(ProfessorAction.AddProfessor)
 addProfessor({getState, setState}: StateContext<ProfessorStateModel>, {payload}: ProfessorAction.AddProfessor) {
     return this.professorService.saveProfessor(payload).pipe(tap((result: any) => {
         const state = getState();
         state.professor?.push(payload);
         setState({
             ...state,
             professor: state.professor
         })
        //  this.router.navigate([navigationUrl]);
     }));
 }
}