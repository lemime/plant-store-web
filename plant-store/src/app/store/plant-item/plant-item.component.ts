import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { Plant } from 'src/app/models/plant.model';
import { AppService } from 'src/app/app.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-plant-item',
  templateUrl: './plant-item.component.html',
  styleUrls: ['./plant-item.component.scss']
})
export class PlantItemComponent implements OnInit, AfterViewInit {
  constructor(
    private appService: AppService,
    public ngxSmartModalService: NgxSmartModalService
  ) {}
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

  edit() {
    this.ngxSmartModalService.resetModalData('plant');
    this.ngxSmartModalService.setModalData(this.plant, 'plant');
    this.ngxSmartModalService.getModal('plant').open();
    this.ngxSmartModalService
      .getModal('plant')
      .onClose.subscribe(() => this.changePlant.emit());
  }

  ngAfterViewInit() {}
}
