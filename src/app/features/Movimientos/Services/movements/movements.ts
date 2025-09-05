import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovimientosModel } from '../../Models/Movimientos.Model';
import { GeneralResponse } from '../../../../Shared/Models/GeneralResponse.Model';
import { MovementsRoutes } from '../../../../Shared/Models/Routes.Model';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<GeneralResponse<MovimientosModel[]>> {
    return this.http.get<GeneralResponse<MovimientosModel[]>>(`${MovementsRoutes.GetAll}`);
  }

  create(movement: MovimientosModel): Observable<GeneralResponse<number>> {
    return this.http.post<GeneralResponse<number>>(`${MovementsRoutes.SaveMovements}`, movement);
  }
}
