import { Mileage } from './../models/mileage';
import { MileageService } from './../mileage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mileage',
  templateUrl: './mileage.component.html',
  styleUrls: ['./mileage.component.css']
})
export class MileageComponent implements OnInit {
  constructor(private mileageService: MileageService) {}
  mileages = [];
  selected = null;
  title = '';
  newMileage = new Mileage();
  editMileage = null;
  totalMpg = 0;
  amount = '';
  distance = '';
  boolMetric = false;

  mpgRate = 1;
  distanceRate = 1;
  volumeRate = 1;

   setEditMileage() {
    this.editMileage = Object.assign({}, this.selected);
  }

  displayEvent = function(event) {
    this.selected = event;
  };

  setCancel() {
    this.selected = null;
    this.editMileage = null;
    this.newMileage = new Mileage();
  }

  reload() {
    this.mileageService
      .index()
      .subscribe(data => (this.mileages = data), err => console.log(err));
    this.getTotalMpg();

    if (this.boolMetric) {

      this.amount = 'Liters';
      this.distance = 'Kilometers';
      this.mpgRate = 0.4521;
      this.distanceRate = 1.609344;
      this.volumeRate = 3.785411784;
      this.newMileage.milesDriven = this.newMileage.milesDriven * this.distanceRate;
      this.newMileage.gallonsUsed = this.newMileage.gallonsUsed * this.volumeRate;
    } else {
      this.newMileage.milesDriven = this.newMileage.milesDriven / this.distanceRate;
      this.newMileage.gallonsUsed = this.newMileage.gallonsUsed / this.volumeRate;
      this.amount = 'Gallons';
      this.distance = 'Miles';
      this.mpgRate = 1;
      this.distanceRate = 1;
      this.volumeRate = 1;
    }
  }

  getTotalMpg() {
    this.mileageService
      .totalMpg()
      .subscribe(data => (this.totalMpg = data), err => console.log(err));
  }

  create() {
    if (this.boolMetric) {
      this.newMileage.milesDriven = this.newMileage.milesDriven / this.distanceRate;
      this.newMileage.gallonsUsed = this.newMileage.gallonsUsed / this.volumeRate;
    }
    this.mileageService.create(this.newMileage).subscribe(
      data => {
        this.newMileage = new Mileage();
        this.reload();
      },
      err => console.log(err)
    );
  }

  deleteEvent(id: number) {
    this.mileageService.destroy(id).subscribe(
      data => {
        this.editMileage = null;
        this.selected = null;
        this.reload();
      },
      err => console.log(err)
    );
    this.reload();
  }

  updateMileage(mileage) {
    if (this.boolMetric) {
      this.newMileage.milesDriven = this.newMileage.milesDriven / this.distanceRate;
      this.newMileage.gallonsUsed = this.newMileage.gallonsUsed / this.volumeRate;
    }
    this.mileageService.update(mileage.id, mileage).subscribe(
      data => {
        this.editMileage = null;
        this.selected = null;
        this.reload();
      },
      err => console.log(err)
    );
  }

  ngOnInit() {
    this.reload();
  }
}
