import { Component, OnInit, Input } from '@angular/core';
import { Plant } from 'src/app/models/plant.model';

@Component({
  selector: 'app-plant-item',
  templateUrl: './plant-item.component.html',
  styleUrls: ['./plant-item.component.scss']
})
export class PlantItemComponent implements OnInit {
  @Input()
  plant: Plant;

  constructor() {}

  ngOnInit() {}
}
