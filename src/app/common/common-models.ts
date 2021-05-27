export interface ApiResponse<T={}> {
    statusCode: number;
    message?: string;
    data: T;
}

export interface IRoute {
    path:string,
    fullUrl:string
}

export interface IPopupData {
    title?: string;
    message: string;
    cancelButtonText?: string;
    confirmButtonText?: string;
    showTextBox?: boolean;
    hideCancelButton?: boolean;
    prefillText?:string;
}

export interface IPopupResponse {
    note?: string;
}