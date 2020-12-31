import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteclasssectionComponent } from './deleteclasssection.component';

describe('DeleteclasssectionComponent', () => {
  let component: DeleteclasssectionComponent;
  let fixture: ComponentFixture<DeleteclasssectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteclasssectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteclasssectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
