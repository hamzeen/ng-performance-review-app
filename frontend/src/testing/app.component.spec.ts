import { TestBed, async, fakeAsync, ComponentFixture, inject } from '@angular/core/testing';
import { AppComponent } from '../app/app.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule
      ]
    }).compileComponents();
  }));

  let fixture: ComponentFixture<AppComponent>,
    component: AppComponent;

  beforeEach(() => {
    this.fixture = fixture = TestBed.createComponent(AppComponent);
    this.component = component = this.fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    expect(this.component).toBeTruthy();
  });
});
