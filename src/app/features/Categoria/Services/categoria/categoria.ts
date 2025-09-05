import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../../../../Shared/Models/GeneralResponse.Model';
import { CategoryModel } from '../../Models/Category.Model';
import { CategoriesRoutes } from '../../../../Shared/Models/Routes.Model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<GeneralResponse<CategoryModel[]>> {
    return this.http.get<GeneralResponse<CategoryModel[]>>(`${CategoriesRoutes.GetAll}`);
  }

  create(order: CategoryModel): Observable<GeneralResponse<number>> {
    return this.http.post<GeneralResponse<number>>(`${CategoriesRoutes.SaveCategory}`, order);
  }

  update(order: CategoryModel): Observable<GeneralResponse<number>> {
    return this.http.put<GeneralResponse<number>>(`${CategoriesRoutes.UpdateCategory}`, order);
  }

  deleteProductos(id: number): Observable<GeneralResponse<number>> {
    return this.http.put<GeneralResponse<number>>(`${CategoriesRoutes.UpdateStatus}`,id);
  }
}
