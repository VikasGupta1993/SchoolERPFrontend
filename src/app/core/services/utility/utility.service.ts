import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LOCAL_STORAGE_KEYS } from 'src/app/constants/local-storage/localStorage.constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private snackBar: MatSnackBar ) { }

  showSnackBar(
    message: string,
    action: string = "Close",
  ) {
    this.snackBar.open(message, action, {
      duration :2000,
      verticalPosition: 'top',
      panelClass: ['red-snackbar'],
    });
  }

  clearStorage() {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
  }
  getAuthToken() {
    
    return localStorage.getItem(LOCAL_STORAGE_KEYS.token);
  }
  setAuthToken(token) {
    localStorage.setItem(environment.tokenKey, token);
  }
}
