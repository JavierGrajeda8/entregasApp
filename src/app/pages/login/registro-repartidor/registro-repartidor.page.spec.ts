import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroRepartidorPage } from './registro-repartidor.page';

describe('RegistroRepartidorPage', () => {
  let component: RegistroRepartidorPage;
  let fixture: ComponentFixture<RegistroRepartidorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroRepartidorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroRepartidorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
