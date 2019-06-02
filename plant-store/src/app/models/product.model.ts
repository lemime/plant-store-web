import { Plant } from './plant.model';

export class Product {
  count: number;
  plant: Plant;

  constructor(count: number = 1, plant: Plant) {
    this.count = count;
    this.plant = plant;
  }
}
