import { Plant } from './plant.model';

export class Product {
  _id: string;
  count: number;
  plant: Plant;

  constructor(count: number = 1, plant: Plant) {
    this.count = count;
    this.plant = plant;
  }
}
