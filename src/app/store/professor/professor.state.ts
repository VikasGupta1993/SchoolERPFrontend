import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProfessorModel } from './professor';
import { ProfessorAction } from './professor.action';
import { ProfessorService } from 'src/app/professors/service/professor.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';


export class ProfessorStateModel {
    professor: ProfessorModel[] | undefined;
}

@State<ProfessorStateModel>({
    name: 'professor',
    defaults: {
        professor: [],
    }
})


@Injectable()
export class ProfessorState {
    constructor(
        private router: Router, private professorService: ProfessorService, private utilityService: UtilityService) { }

    @Selector()
    static getProfessorList(state: ProfessorStateModel) {
        return state.professor;
    }

    @Action(ProfessorAction.GetProfessorList)
    getProfessors({ getState, setState }: StateContext<ProfessorStateModel>) {
        return this.professorService.getProfessors().pipe(tap((result: any) => {
            if (result.statusCode == 200) {
                const models = result.data;
                const state = getState();
                setState({
                    ...state,
                    professor: models,
                });
            }
        }));
    }

    @Action(ProfessorAction.RemoveProfessor)
    removeTenant({ getState, setState }: StateContext<ProfessorStateModel>, { professorId }: ProfessorAction.RemoveProfessor) {
        return this.professorService.deleteProfessor(professorId).pipe(tap((response: any) => {
            if (response.statusCode == '200') {
                this.utilityService.showSnackBar(response.message);
                const state = getState();
                const filteredTenantList = state.professor?.filter(item => item.id !== professorId)
                setState({
                    ...state,
                    professor: filteredTenantList,
                });
            } else {
                this.utilityService.showSnackBar(response.message);
            }
        }))
    }

    @Action(ProfessorAction.UpdateProfessor)
    updateTenant({ getState, setState }: StateContext<ProfessorStateModel>, { payload, navigationUrl }: ProfessorAction.UpdateProfessor) {
        return this.professorService.updateProfessor(payload).pipe(tap((result: any) => {
            if (result.statusCode === 200) {
                const state = getState();
                const profList = [...state.professor];
                const professorIndex = profList?.findIndex(item => item.id === payload.id);
                profList[professorIndex] = payload;
                this.utilityService.showSnackBar(result.message);
                setState({
                    ...state,
                    professor: profList,
                });
                this.router.navigate(['/professors/all-professors']);
            } else {
                this.utilityService.showSnackBar(result.message);
            }
        }));
    }

    @Action(ProfessorAction.AddProfessor)
    addProfessor({ getState, patchState }: StateContext<ProfessorStateModel>, { payload }: ProfessorAction.AddProfessor) {
        return this.professorService.saveProfessor(payload).pipe(tap((result: any) => {
            if (result.statusCode == '200') {
                this.utilityService.showSnackBar(result.message);
                const state = getState();
                patchState({
                    professor: [...state.professor, result]
                });
                this.router.navigate(['/professors/all-professors']);
            } else {
                this.utilityService.showSnackBar(result.message);
            }
        }));
    }
    //  @Action(ProfessorAction.HoldProfessorData)
    //  holdProfessor({getState, setState}: StateContext<ProfessorStateModel>, {payload}: ProfessorAction.AddProfessor) {
    //      if (payload) {
    //         const state = getState();
    //         state.professor.forEach(data => {
    //             if (data.id == payload.id) {
    //              state.professor.push(payload);
    //             }
    //         })
    //         // state.professor?.push(payload);
    //         setState({
    //             ...state,
    //             professor: state.professor
    //         })
    //      }   
    //         //  this.router.navigate([navigationUrl]);
    //  }
}