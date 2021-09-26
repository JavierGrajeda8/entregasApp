import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResenaComponent } from './resena.component';

describe('ResenaComponent', () => {
  let component: ResenaComponent;
  let fixture: ComponentFixture<ResenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResenaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
