import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosModel } from './movimientos';

describe('Movimientos', () => {
  let component: MovimientosModel;
  let fixture: ComponentFixture<MovimientosModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientosModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientosModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
