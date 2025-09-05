export class GeneralResponse<T> {
  objectResponse?: T;
  successMessage?: string;
  errorMessage?: string;
  operationSuccess!: boolean;
}
