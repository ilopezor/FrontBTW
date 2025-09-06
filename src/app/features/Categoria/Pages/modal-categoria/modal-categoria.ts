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
import { noop } from 'rxjs';
import { NotificationService } from '../../../../Shared/Service/NotificationService';

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

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private dialogRef: MatDialogRef<ModalCategoria>, 
    private notifycationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildForm();
    
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

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.notifycationService.loading();
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

  public createCategoria(categoria: any) {
    this.categoriaService.create(categoria).subscribe({
      next: (res: any) => {
        this.notifycationService.close();
          if(res.operationSuccess){  
            this.dialogRef.close(res);
            this.notifycationService.success('Categoria guardada con exito.');
          }else{
            this.notifycationService.error('Ocurrió un error al guardar la categoria.');
          }
      },
      error: (err: any) => {
        this.notifycationService.close();
        this.notifycationService.error('Ocurrió un error al guardar la categoria.');
      }
    });
  }

  public updateCategoria(categoria: any) {
    categoria.idCategoria = this.data.categoria.idCategoria;
    this.categoriaService.update(categoria).subscribe({
      next: (res: any) => {
        this.notifycationService.close();
        if(res.operationSuccess){  
          this.notifycationService.success('Categoria actualizada con exito.');
          this.dialogRef.close(res);
        }else{
          this.notifycationService.error('Ocurrió un error al actualizar la categoria.');
        }
      },
      error: (err: any) => {
        this.notifycationService.close();
        this.notifycationService.error('Ocurrió un error al actualizar la categoria.');
      }
    });
  }
}
