export interface Client {
  id?: string;
  firstName: string;
  lastName: string;
  clientKey: number;
  plusPoints: number;
  photo?: string;
  activities?: number;
}