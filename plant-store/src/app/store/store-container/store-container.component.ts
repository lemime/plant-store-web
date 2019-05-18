import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Observable } from 'rxjs';
import { Plant } from 'src/app/models/plant.model';

@Component({
  selector: 'app-store-container',
  templateUrl: './store-container.component.html',
  styleUrls: ['./store-container.component.scss']
})
export class StoreContainerComponent implements OnInit {
  plants: Observable<Plant[]>;

  constructor(private service: AppService) {}

  ngOnInit() {
    this.plants = this.service.getPlantsList();
  }
}
