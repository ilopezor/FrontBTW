

import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common'; 
import { ProductosModel } from '../../Models/Productos.Model';
import { ProductosService } from '../../Services/productos/productos';
import { ModalProductos } from '../modal-productos/modal-productos';

@Component({
  selector: 'app-productos',
  standalone: true, 
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule,
    CommonModule
  ],
  templateUrl: './productos.html',
  styleUrls: ['./productos.scss']
})
export class ProductosComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'stock', 'categoria', 'acciones'];
  dataSource: MatTableDataSource<ProductosModel>= new MatTableDataSource<ProductosModel>();

  constructor(private productService: ProductosService, public dialog: MatDialog) { 
    this.loadProducts();
  }


  loadProducts() {
    this.productService.getAllProducts().subscribe(response => {
      if (response.operationSuccess) {
        this.dataSource.data = response.objectResponse ?? [];
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createProduct() {
    const dialogRef = this.dialog.open(ModalProductos, {
      width: '400px',
      data: { isEditing: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  editProduct(product: ProductosModel) {
    const dialogRef = this.dialog.open(ModalProductos, {
      width: '500px',
      maxHeight: '90vh',
      data: { isEditing: true, product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  deleteProduct(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productService.deleteProductos(id).subscribe(response => {
        if (response.operationSuccess) {
          this.loadProducts();
        }
      });
    }
  }
}