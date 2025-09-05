import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMovimientos } from './modal-movimientos';

describe('ModalMovimientos', () => {
  let component: ModalMovimientos;
  let fixture: ComponentFixture<ModalMovimientos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalMovimientos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMovimientos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
