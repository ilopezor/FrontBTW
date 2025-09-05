import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ProductosModel } from '../../Models/Productos.Model';
import { GeneralResponse } from '../../../../Shared/Models/GeneralResponse.Model';
import { ProductsRoutes } from '../../../../Shared/Models/Routes.Model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) {}

  public getAllProducts(): Observable<GeneralResponse<ProductosModel[]>> {
    return this.http
      .get<GeneralResponse<ProductosModel[]>>(ProductsRoutes.GetAllProducts)
      .pipe(catchError(this.handleError));
  }

  public getProductosById(id: number): Observable<GeneralResponse<ProductosModel>> {
    return this.http
      .get<GeneralResponse<ProductosModel>>(`${ProductsRoutes.GetAllProducts}/${id}`)
      .pipe(catchError(this.handleError));
  }

  public createProductos(Productos: ProductosModel): Observable<GeneralResponse<ProductosModel>> {
    return this.http
      .post<GeneralResponse<ProductosModel>>(ProductsRoutes.SaveProducts, Productos)
      .pipe(catchError(this.handleError));
  }

  public updateProductos(Productos: ProductosModel): Observable<GeneralResponse<ProductosModel>> {
    return this.http
      .put<GeneralResponse<ProductosModel>>(ProductsRoutes.UpdateProducts, Productos)
      .pipe(catchError(this.handleError));
  }

  public deleteProductos(id: number): Observable<GeneralResponse<ProductosModel>> {
    return this.http
      .put<GeneralResponse<ProductosModel>>(`${ProductsRoutes.UpdateStatus}`,id)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Error del servidor - Código: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
