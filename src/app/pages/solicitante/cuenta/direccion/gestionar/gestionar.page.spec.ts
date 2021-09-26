import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionarPage } from './gestionar.page';

describe('GestionarPage', () => {
  let component: GestionarPage;
  let fixture: ComponentFixture<GestionarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
