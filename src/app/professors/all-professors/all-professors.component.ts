import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProfessorsService } from './professors.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Professors } from './professors.model';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { Select, Store } from '@ngxs/store';
import { ProfessorAction } from 'src/app/store/professor/professor.action';
import { ProfessorState } from 'src/app/store/professor';
import { ProfessorModel } from 'src/app/store/professor/professor';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DELETE_PROFESSOR } from 'src/app/constants/url';

@Component({
  selector: 'app-all-professors',
  templateUrl: './all-professors.component.html',
  styleUrls: ['./all-professors.component.sass'],
})
export class AllprofessorsComponent implements OnInit {
  displayedColumns = [
    'select',
    'img',
    'name',
    'department',
    'gender',
    'degree',
    'mobile',
    'email',
    'date',
    'actions',
  ];
  exampleDatabase: ProfessorsService | null;
  selection = new SelectionModel<Professors>(true, []);
  professors: Professors | null;
  @Select(ProfessorState.getProfessorList) todos$: Observable<ProfessorModel[]>;
  professorList: ProfessorModel[] = [];
  dataSource: MatTableDataSource<ProfessorModel>;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public professorsService: ProfessorsService,
    private snackBar: MatSnackBar,
    private store: Store,
    private route: Router
  ) {
     this.store.dispatch(new ProfessorAction.GetProfessorList());
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {
  //  this.loadData();
  if(this.todos$) {
    this.todos$.subscribe(res => {
      this.professorList = res;
      this.loadData();
     })
     }
  }
  
  refresh() {
    // this.loadData();
  }
  // addNew() {
  //   const dialogRef = this.dialog.open(FormDialogComponent, {
  //     data: {
  //       professors: this.professors,
  //       action: 'add',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result === 1) {
  //       // After dialog is closed we're doing frontend updates
  //       // For add we're just pushing a new row inside DataServicex
  //       this.exampleDatabase.dataChange.value.unshift(
  //         this.professorsService.getDialogData()
  //       );
  //       this.refreshTable();
  //       this.showNotification(
  //         'snackbar-success',
  //         'Add Record Successfully...!!!',
  //         'bottom',
  //         'center'
  //       );
  //     }
  //   });
  // }
  editCall(row) {
    let professorId = row.id;
    this.route.navigateByUrl('professors/edit-professor');
    //  this.store.dispatch(new ProfessorAction.HoldProfessorData(row ,'/edit-professor'));
    // const dialogRef = this.dialog.open(FormDialogComponent, {
    //   data: {
    //     professors: row,
    //     action: 'edit',
    //   },
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 1) {
    //     // When using an edit things are little different, firstly we find record inside DataService by id
    //     const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
    //       (x) => x.id === this.id
    //     );
    //     // Then you update that record using data from dialogData (values you enetered)
    //     this.exampleDatabase.dataChange.value[
    //       foundIndex
    //     ] = this.professorsService.getDialogData();
    //     // And lastly refresh table
    //     this.refreshTable();
    //     this.showNotification(
    //       'black',
    //       'Edit Record Successfully...!!!',
    //       'bottom',
    //       'center'
    //     );
    //   }
    // });
  }
  deleteItem(row) {
    let professorId = row.id;
    // console.log(this.id);
    this.store.dispatch(new ProfessorAction.RemoveProfessor(professorId));
    // const dialogRef = this.dialog.open(DeleteDialogComponent, {
    //   data: row,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 1) {
    //     const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
    //       (x) => x.id === this.id
    //     );
    //     // for delete we use splice in order to remove single object from DataService
    //     this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
    //     this.refreshTable();
    //     this.showNotification(
    //       'snackbar-danger',
    //       'Delete Record Successfully...!!!',
    //       'bottom',
    //       'center'
    //     );
    //   }
    // });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.renderedData.length;
  //   return numSelected === numRows;
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected()
  //     ? this.selection.clear()
  //     : this.dataSource.renderedData.forEach((row) =>
  //         this.selection.select(row)
  //       );
  // }
  // removeSelectedRows() {
  //   const totalSelect = this.selection.selected.length;
  //   this.selection.selected.forEach((item) => {
  //     const index: number = this.dataSource.renderedData.findIndex(
  //       (d) => d === item
  //     );
  //     // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
  //     this.exampleDatabase.dataChange.value.splice(index, 1);
  //     this.refreshTable();
  //     this.selection = new SelectionModel<Professors>(true, []);
  //   });
  //   this.showNotification(
  //     'snackbar-danger',
  //     totalSelect + ' Record Delete Successfully...!!!',
  //     'bottom',
  //     'center'
  //   );
  // }
  public loadData() {
      this.dataSource = new MatTableDataSource(this.professorList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; 
    // fromEvent(this.filter.nativeElement, 'keyup')
    //   // .debounceTime(150)
    //   // .distinctUntilChanged()
    //   .subscribe(() => {
    //     if (!this.dataSource) {
    //       return;
    //     }
    //     this.dataSource.filter = this.filter.nativeElement.value;
    //   });
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  // context menu
  // onContextMenu(event: MouseEvent, item: Professors) {
  //   event.preventDefault();
  //   this.contextMenuPosition.x = event.clientX + 'px';
  //   this.contextMenuPosition.y = event.clientY + 'px';
  //   this.contextMenu.menuData = { item: item };
  //   this.contextMenu.menu.focusFirstItem('mouse');
  //   this.contextMenu.openMenu();
  // }
}
