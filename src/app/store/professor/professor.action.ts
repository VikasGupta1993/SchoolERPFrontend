import { ProfessorModel } from "../professor/professor";

export namespace ProfessorAction {
    export class GetProfessorList {
        static readonly type = '[Professor] Fetch All';
    }
    export class RemoveProfessor{
        static readonly type = '[Professor] Remove';
        constructor(public professorId: any) {}
    }
    export class UpdateProfessor {
        static readonly type = '[Professor] Update';
        constructor(public payload: ProfessorModel, public navigationUrl: string ) {}
    }
    export class AddProfessor {
        static readonly type = '[Profesor] Add';
        constructor(public payload: FormData) {}
    }
    export class HoldProfessorData {
        static readonly type = '[Professor] HoldData';
        constructor(public payload: ProfessorModel , public navigationUrl: string ) {}
    }
}