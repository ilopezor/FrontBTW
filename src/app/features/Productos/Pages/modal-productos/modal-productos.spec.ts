import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProductos } from './modal-productos';

describe('ModalProductos', () => {
  let component: ModalProductos;
  let fixture: ComponentFixture<ModalProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
