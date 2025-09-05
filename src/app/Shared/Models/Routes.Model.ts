import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

const RoutesEnum = {
    TypeMovements : API_URL + '/TipoMovimiento',
    Category : API_URL + '/Categoria',
    Movements : API_URL + '/Movimientos',
    Products : API_URL + '/Productos',
}

export const TypeMovementsRoutes = {
    TypeMovements: `${RoutesEnum.TypeMovements}`
}

export const CategoriesRoutes = {
    GetAll: `${RoutesEnum.Category}`,
    SaveCategory: `${RoutesEnum.Category}`,
    UpdateCategory: `${RoutesEnum.Category}`,
    UpdateStatus: `${RoutesEnum.Category}/Status`
}

export const MovementsRoutes = {
    GetAll: `${RoutesEnum.Movements}`,
    SaveMovements: `${RoutesEnum.Movements}`,
}



export const ProductsRoutes = {
    GetAllProducts: `${RoutesEnum.Products}`,
    SaveProducts: `${RoutesEnum.Products}`,
    UpdateProducts: `${RoutesEnum.Products}`,
    UpdateStatus: `${RoutesEnum.Products}/status`
}
