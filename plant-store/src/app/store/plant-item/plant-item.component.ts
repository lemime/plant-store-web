import { Component, OnInit, Input } from '@angular/core';
import { Plant } from 'src/app/models/plant.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-plant-item',
  templateUrl: './plant-item.component.html',
  styleUrls: ['./plant-item.component.scss']
})
export class PlantItemComponent implements OnInit {
  @Input()
  plant: Plant;

  constructor(private appService: AppService) {}

  ngOnInit() {}

  addToCart(plant): void {
    this.appService.addToCart(1, plant);
  }
}
