import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Plant } from 'src/app/models/plant.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-plant-item',
  templateUrl: './plant-item.component.html',
  styleUrls: ['./plant-item.component.scss']
})
export class PlantItemComponent implements OnInit {
  constructor(private appService: AppService) {}
  @Input()
  plant: Plant;

  @Input()
  role: string;

  @Output()
  changePlant: EventEmitter<void> = new EventEmitter();

  delete(plant: Plant): void {
    this.appService.deletePlant(plant._id).subscribe(() => {
      this.changePlant.emit();
    });
  }

  ngOnInit() {}

  addToCart(plant): void {
    this.appService.addToCart(1, plant);
  }
}
