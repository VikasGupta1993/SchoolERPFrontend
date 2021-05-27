import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel
} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class LoaderService {
  loading$ = new Subject<boolean>();
  constructor() {
    this.loading$.next(false);
  }

  showLoader(state: boolean) {
    this.loading$.next(state);
  }
}
