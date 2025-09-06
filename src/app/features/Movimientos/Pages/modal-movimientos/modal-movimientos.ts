import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CategoryModel } from '../../../Categoria/Models/Category.Model';
import { ProductosModel } from '../../../Productos/Models/Productos.Model';
import { ProductosService } from '../../../Productos/Services/productos/productos';
import { TipoMovimientoModel } from '../../Models/TipoMovimiento.Model';
import { TypeMovementsService } from '../../Services/typeMovements/typeMovements';
import { MovimientosModel } from '../../Models/Movimientos.Model';
import { MovementsService } from '../../Services/movements/movements';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NotificationService } from '../../../../Shared/Service/NotificationService';

@Component({
  selector: 'app-modal-movimientos',
    imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule
  ], 
  templateUrl: './modal-movimientos.html',
  styleUrl: './modal-movimientos.scss'
})
export class ModalMovimientos implements AfterViewInit {
  form: FormGroup = {} as FormGroup;
  categories: CategoryModel[] = [];
  products: ProductosModel[] = [];
  tipoMovimientos: TipoMovimientoModel[] = [];


  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private tipoMovimientoService: TypeMovementsService,
    private movimeintosService: MovementsService,
    private dialogRef: MatDialogRef<ModalMovimientos>, 
    private notifycationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildForm();
    this.getProducts();
    this.getTypeMovements();    

    if (data.isView) {
      this.form.patchValue(data.movement);
    }
  }
  
  ngAfterViewInit(): void {
    if (this.data.isView)
      this.form.disable();
  }

  buildForm() {
      this.form = this.fb.group({
      idProducto: [null as number | null, Validators.required],
      idTipoMovimiento: [null as number | null, [Validators.required, Validators.min(1)]],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      fechaMovimiento: ['', [Validators.required]],
      comentario: [''],
    });
  }

  getProducts() {
    this.notifycationService.loading();
    this.productosService.getAllProducts().subscribe({
      next:response => {
        this.notifycationService.close();
        if (response.operationSuccess) {
          this.products = response.objectResponse ?? [];
        }
      },
      error: err => {
        this.notifycationService.close();
        this.notifycationService.error('Ocurrió un error al obtener los productos.');
      }
    });
  }

  getTypeMovements() {
    this.notifycationService.loading();
    this.tipoMovimientoService.getTypeMovements().subscribe({
      next: response => {
        this.notifycationService.close();
        if (response.operationSuccess) {
          this.tipoMovimientos = response.objectResponse ?? [];
        }
      },
      error: err => {
        this.notifycationService.close();
        this.notifycationService.error('Ocurrió un error al obtener los tipos de movimientos.');
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.notifycationService.loading();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const nuevoMovimiento = this.form.value;
    this.createMovements(nuevoMovimiento);
   
  }

  public createMovements(movimiento: MovimientosModel) {
    this.movimeintosService.create(movimiento).subscribe({
      next: (res) => {
        this.notifycationService.close();
        if(res.operationSuccess){
          this.notifycationService.success('Movimiento guardado con exito.');
          this.dialogRef.close(res);
        }else{
          this.notifycationService.error('Ocurrió un error al guardar el movimiento.');
        }
      },
      error: (err) => {
          this.notifycationService.error('Ocurrió un error al guardar el movimiento.');
          this.notifycationService.close();}
    });
  }



}
