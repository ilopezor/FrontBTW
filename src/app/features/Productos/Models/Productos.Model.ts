import { CategoryModel } from "../../Categoria/Models/Category.Model";

export interface ProductosModel{
    idProducto: number;
    nombreProducto: string;
    cantidad: number;
    estado: boolean;
    fechaCreacion: Date;
    idCategoria: number;
    precioUnitario: number;
    idCategoriaNavigation: CategoryModel
}