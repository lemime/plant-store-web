import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Observable } from 'rxjs';
import { Plant } from 'src/app/models/plant.model';
import { filter, map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { Categories } from 'src/app/models/categories';

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

  foliages: Observable<Plant[]>;
  flowerings: Observable<Plant[]>;
  succulents: Observable<Plant[]>;

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

    this.flowerings = this.getPlantsOfCategory(
      this.plants,
      Categories.flowering
    );

    this.foliages = this.getPlantsOfCategory(this.plants, Categories.foliage);
    this.succulents = this.getPlantsOfCategory(
      this.plants,
      Categories.succulents
    );
  }

  clear(): void {
    this.isEmpty = true;
    this.plants = this.service.getPlantsList();
    this.flowerings = this.getPlantsOfCategory(
      this.plants,
      Categories.flowering
    );

    this.foliages = this.getPlantsOfCategory(this.plants, Categories.foliage);

    this.succulents = this.getPlantsOfCategory(
      this.plants,
      Categories.succulents
    );
    this.searchTab.controls.text.setValue('');
  }

  getPlantsOfCategory(
    plants: Observable<Plant[]>,
    category: Categories
  ): Observable<Plant[]> {
    return plants.pipe(
      map(plantList => plantList.filter(plant => plant.category === category))
    );
  }

  ngOnInit() {
    this.plants = this.service.getPlantsList();

    this.flowerings = this.getPlantsOfCategory(
      this.plants,
      Categories.flowering
    );

    this.foliages = this.getPlantsOfCategory(this.plants, Categories.foliage);

    this.succulents = this.getPlantsOfCategory(
      this.plants,
      Categories.succulents
    );
  }
}
