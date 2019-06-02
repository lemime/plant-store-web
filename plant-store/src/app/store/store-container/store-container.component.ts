import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Observable } from 'rxjs';
import { Plant } from 'src/app/models/plant.model';
import { filter, map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-store-container',
  templateUrl: './store-container.component.html',
  styleUrls: ['./store-container.component.scss']
})
export class StoreContainerComponent implements OnInit {
  searchTab = new FormGroup({
    text: new FormControl('')
  });

  isEmpty = true;

  plants: Observable<Plant[]>;

  constructor(private service: AppService) {}

  onSubmit(): void {
    this.isEmpty = false;
    this.plants = this.service.getPlantsList().pipe(
      map(plantList =>
        plantList.filter(plant => {
          return (
            plant.name
              .toLowerCase()
              .includes(this.searchTab.controls.text.value.toLowerCase()) ||
            plant.description
              .toLowerCase()
              .includes(this.searchTab.controls.text.value.toLowerCase())
          );
        })
      )
    );
  }

  clear(): void {
    this.isEmpty = true;
    this.plants = this.service.getPlantsList();
    this.searchTab.controls.text.setValue('');
  }

  ngOnInit() {
    this.plants = this.service.getPlantsList();
  }
}
