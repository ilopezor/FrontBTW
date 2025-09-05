import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CategoryModel } from '../../../Categoria/Models/Category.Model';
import { CategoriaService } from '../../../Categoria/Services/categoria/categoria';
import { ProductosService } from '../../Services/productos/productos';
import { ProductosModel } from '../../Models/Productos.Model';

@Component({
  selector: 'app-modal-productos',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
  ],  
  templateUrl: './modal-productos.html',
  styleUrl: './modal-productos.scss'
})
export class ModalProductos {
  form: FormGroup = {} as FormGroup;
  categories: CategoryModel[] = [];

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private productosService: ProductosService,
    private dialogRef: MatDialogRef<ModalProductos>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildForm();
    this.getCategories();
    
    if (data.isEditing) {
      this.form.patchValue(data.product);
    }
  }

  buildForm() {
      this.form = this.fb.group({
      nombreProducto: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      estado: [true],
      idCategoria: [null as number | null, Validators.required],
      precioUnitario: [0, [Validators.required, Validators.min(0)]],
    });

  }


  getCategories() {
    this.categoriaService.getAll().subscribe({
      next: (cats) => {
        this.categories = cats.objectResponse ?? [];

      },
      error: (err) => {
        console.error('Error al guardar producto:', err);

      },
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const nuevoProducto = this.form.value;

    if (this.data.isEditing) {
      this.updateProducto(nuevoProducto);
    } else {
      this.createProducto(nuevoProducto);
    }
  }

  public createProducto(producto: ProductosModel) {
    this.productosService.createProductos(producto).subscribe({
      next: (res) => {
        this.dialogRef.close(res);
      },
      error: (err) => {
        console.error('Error al guardar producto:', err);
      }
    });
  }

  public updateProducto(producto: ProductosModel) {
    producto.idProducto = this.data.product.idProducto;
    this.productosService.updateProductos(producto).subscribe({
      next: (res) => {
        this.dialogRef.close(res);
      },
      error: (err) => {
        console.error('Error al actualizar producto:', err);
      }
    });
  }
}
