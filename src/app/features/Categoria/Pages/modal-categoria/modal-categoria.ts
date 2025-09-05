import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ProductosService } from '../../../Productos/Services/productos/productos';
import { CategoryModel } from '../../Models/Category.Model';
import { CategoriaService } from '../../Services/categoria/categoria';
import { GeneralResponse } from '../../../../Shared/Models/GeneralResponse.Model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-modal-categoria',
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
  templateUrl: './modal-categoria.html',
  styleUrl: './modal-categoria.scss'
})
export class ModalCategoria {
  form: FormGroup = {} as FormGroup;
  categories: CategoryModel[] = [];
  loading = true;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private dialogRef: MatDialogRef<ModalCategoria>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildForm();
    this.getCategories();
    
    if (data.isEditing) {
      this.form.patchValue(data.categoria);
    }
  }

  buildForm() {
      this.form = this.fb.group({
      nombreCategoria: ['', Validators.required],
      estado: [true],
    });

  }

  getCategories() {
    this.categoriaService.getAll().subscribe({
      next: (cats: GeneralResponse<CategoryModel[]>) => {
        this.categories = cats.objectResponse ?? [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
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
    const nuevaCategoria = this.form.value;

    if (this.data.isEditing) {
      this.updateCategoria(nuevaCategoria);
    } else {
      this.createCategoria(nuevaCategoria);
    }
  }

  private createCategoria(categoria: any) {
    this.categoriaService.create(categoria).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.dialogRef.close(res);
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Error al guardar categoria:', err);
      }
    });
  }

  public updateCategoria(categoria: any) {
    categoria.idCategoria = this.data.categoria.idCategoria;
    this.categoriaService.update(categoria).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.dialogRef.close(res);
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Error al actualizar categoria:', err);
      }
    });
  }
}
