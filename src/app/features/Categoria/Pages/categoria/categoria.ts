import { Component,OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common'; 
import { CategoriaService } from '../../Services/categoria/categoria';
import { ModalCategoria } from '../modal-categoria/modal-categoria';
import { CategoryModel } from '../../Models/Category.Model';
import { NotificationService } from '../../../../Shared/Service/NotificationService';

@Component({
  selector: 'app-categoria',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    CommonModule
  ],  
  templateUrl: './categoria.html',
  styleUrl: './categoria.scss'
})
export class Categoria implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<CategoryModel> = new MatTableDataSource<CategoryModel>();

  constructor(private categoryService: CategoriaService, public dialog: MatDialog, private notifycationService: NotificationService) { 
  
  }

  ngOnInit(): void {
    this.loadCategory();
  }
  
  loadCategory() {
    this.notifycationService.loading();
    this.categoryService.getAll().subscribe({
      next: response => {
        if (response.operationSuccess) {
            this.notifycationService.close();
            this.dataSource.data = response.objectResponse ?? [];
            this.dataSource.paginator = this.paginator;
        }else{
            this.notifycationService.error('Ocurrió un error al cargar las categorías.');
        }
      },
      error: err => {
        this.notifycationService.close();
        this.notifycationService.error('Ocurrió un error al cargar las categorías.');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createCategoria() {
    const dialogRef = this.dialog.open(ModalCategoria, {
      width: '400px',
      data: { isEditing: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCategory();
      }
    });
  }

  editCategoria(categoria: CategoryModel) {
    const dialogRef = this.dialog.open(ModalCategoria, {
      width: '500px',
      maxHeight: '90vh',
      data: { isEditing: true, categoria }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCategory();
      }
    });
  }

  async deleteCategoria(id: number) {
    if (await this.notifycationService.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.categoryService.deleteProductos(id).subscribe({
        next: response => {
          if (response.operationSuccess) {
            this.loadCategory();
          }else{
            this.notifycationService.error('Ocurrió un error al eliminar la categoría.');
          }
        },
        error: err => {
          this.notifycationService.error('Ocurrió un error al eliminar la categoría.');
        }
    });
    }
  }
}
