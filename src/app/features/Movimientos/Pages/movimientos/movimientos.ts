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
import { ModalMovimientos } from '../modal-movimientos/modal-movimientos';
import { MovementsService } from '../../Services/movements/movements';
import { MovimientosModel } from '../../Models/Movimientos.Model';
import { NotificationService } from '../../../../Shared/Service/NotificationService';

@Component({
  selector: 'app-movimientos',
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
  templateUrl: './movimientos.html',
  styleUrl: './movimientos.scss'
})
export class Movimientos {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'producto', 'tipoMovimiento', 'cantidad', 'fecha', 'acciones'];
  dataSource: MatTableDataSource<MovimientosModel>= new MatTableDataSource<MovimientosModel>();

  constructor(private movementsService: MovementsService, public dialog: MatDialog, private notifycationService: NotificationService) { 
    this.loadMovements();
  }


  loadMovements() {
    this.notifycationService.loading();
    this.movementsService.getAll().subscribe({
      next: response => {
        if (response.operationSuccess) {
          this.notifycationService.close();
          this.dataSource.data = response.objectResponse ?? [];
          this.dataSource.paginator = this.paginator;
        }
     },
      error: err => {
        this.notifycationService.close();
        this.notifycationService.error('Ocurrió un error al cargar los movimientos.');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createMovements() {
    const dialogRef = this.dialog.open(ModalMovimientos, {
      width: '500px',
      maxHeight: '90vh',
      data: { isView: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMovements();
      }
    });
  }

  seeMovements(movement: MovimientosModel) {
    this.dialog.open(ModalMovimientos, {
      width: '500px',
      maxHeight: '90vh',
      data: { isView: true, movement }
    });
  }
}
