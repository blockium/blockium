export interface IService {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  duration?: string | null; // a Date.toJSON() with only hours and minutes
  total?: number; // computed = price * quantity
  dayInterval?: number; // days from a service date to another
  group?: string;
}
