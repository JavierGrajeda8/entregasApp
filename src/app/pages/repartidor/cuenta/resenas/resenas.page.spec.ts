import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResenasPage } from './resenas.page';

describe('ResenasPage', () => {
  let component: ResenasPage;
  let fixture: ComponentFixture<ResenasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResenasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResenasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
