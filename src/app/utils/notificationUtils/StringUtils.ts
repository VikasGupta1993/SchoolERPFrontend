import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class StringUtils {

    constructor(private snackBar: MatSnackBar)
    {}

    showNotification(colorName, text, placementFrom, placementAlign) {
        this.snackBar.open(text, '', {
          duration: 4000,
          verticalPosition: placementFrom,
          horizontalPosition: placementAlign,
          panelClass: colorName,
        });
    }

    /*
       Below are the Class CRUD Messages.
     */


    createClassSuccessMsg()
    {
        this.showNotification(
            'snackbar-success',
            ' Class Added Successfully!!!!...',
            'top',
            'center'
           );   
    }

    editClassSuccessMsg()
    {
        this.showNotification(
            'snackbar-success',
            ' Class Update Successfully!!!!...',
            'top',
            'center'
           );  
    }

    deleteClassSuccessMsg()
    {
        this.showNotification(
            'snackbar-success',
            'Class Deleted Successfully!!!!...', 
            'top',
            'center'
           );
    }

    errorClassListMsg()
    {
        this.showNotification(
            'snackbar-danger',
            ' There is some error while fetching Class Data list from Database.',
            'top',
            'center'
          );
    }


    /*
       Below are the Section CRUD Messages.
     */


    createSectionSuccessMsg()
    {
        this.showNotification(
            'snackbar-success',
            ' Section Added Successfully!!!!...',
            'top',
            'center'
           );   
    }

    editSectionSuccessMsg()
    {
        this.showNotification(
            'snackbar-success',
            ' Section Update Successfully!!!!...',
            'top',
            'center'
           );  
    }

    deleteSectionSuccessMsg()
    {
        this.showNotification(
            'snackbar-success',
            'Section Deleted Successfully!!!!...', 
            'top',
            'center'
           );
    }

    errorSectionListMsg()
    {
        this.showNotification(
            'snackbar-danger',
            ' There is some error while fetching Section Data list from Database.',
            'top',
            'center'
          );
    }


    /*
       Below are the Class-Section CRUD Messages.
     */


    createClassSectionSuccessMsg()
    {
        this.showNotification(
            'snackbar-success',
            ' Added Class-Section Mapping Successfully!!!!...',
            'top',
            'center'
           );   
    }

    editClassSectionSuccessMsg()
    {
        this.showNotification(
            'snackbar-success',
            ' Edit Class-Section Mapping Successfully!!!!...',
            'top',
            'center'
           );  
    }

    deleteClassSectionSuccessMsg()
    {
        this.showNotification(
            'snackbar-success',
            ' Delete Class-Section Mapping Successfully!!!!...', 
            'top',
            'center'
           );
    }

    errorClassSectionListMsg()
    {
        this.showNotification(
            'snackbar-danger',
            ' There is some error while fetching Class-Section Data list from Database.',
            'top',
            'center'
          );
    }
    
}