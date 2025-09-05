import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoMovimientoModel } from '../../Models/TipoMovimiento.Model';
import { TypeMovementsRoutes } from '../../../../Shared/Models/Routes.Model';
import { GeneralResponse } from '../../../../Shared/Models/GeneralResponse.Model';

@Injectable({
  providedIn: 'root'
})
export class TypeMovementsService {

  constructor(private http: HttpClient) { }

  getTypeMovements(): Observable<GeneralResponse<TipoMovimientoModel[]>> {
    return this.http.get<GeneralResponse<TipoMovimientoModel[]>>(`${TypeMovementsRoutes.TypeMovements}`);
  }
}
