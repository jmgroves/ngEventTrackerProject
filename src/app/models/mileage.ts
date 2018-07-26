export class Mileage {

  id: number;
  milesDriven: number;
  gallonsUsed: number;
  gasStation: string;
  comment: string;

  constructor(id?: number, milesDriven?: number, gallonsUsed?: number, gasStation?: string, comment?: string) {
    this.id = id;
    this. milesDriven = milesDriven;
    this.gallonsUsed = gallonsUsed;
    this.gasStation = gasStation;
    this.comment = comment;
  }
}
