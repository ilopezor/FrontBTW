
export interface MovimientosModel {
    idMovimientos: number;
    cantidad: number;
    comentario?: string;
    fechaCreacion: Date;
    idProducto: number;
    idTipoMovimiento: number;
    fechaMovimiento: Date;
    producto: string;
    tipoMovimiento: string;
  }