import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';

@Component({
  selector: 'app-auction-round-type',
  templateUrl: './auction-round-type.component.html',
  styleUrls: ['./auction-round-type.component.css']
})
export class AuctionRoundTypeComponent implements OnInit, OnChanges {

  gameServiceFactory;
  showInputs: Boolean;
  @Input() disableNext: Boolean;
  @Input() results;
  @Output() saved = new EventEmitter<any>();
  round;
  routeParams;

  constructor(@Inject('GameServiceFactory') gameServiceFactory,
              @Inject('$routeParams') routeParams) {
    this.gameServiceFactory = gameServiceFactory;
    this.routeParams = routeParams;
  }

  ngOnInit() {
    this.showInputs = true;
    console.log(this.routeParams.gameId);


    this.gameServiceFactory.getRoundByGameAndId(this.routeParams.gameId, this.routeParams.roundNumber)
      .then((round) => {
        this.round = round;
      });
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    for (let propName in changes) {
      if (propName === 'disableNext') {
        this.switchEditState()
      }
    }
  }

  private getCheckboxValue(status){
    return status ? 1 : -1;
  }

  onSave(result){
    result.score = result.rate * this.getCheckboxValue(result.status);
    console.log(result);
    this.saved.emit(result);
  }

  switchEditState() {
    this.showInputs = !this.showInputs;
    if (!this.showInputs) {
      this.results.forEach((item) => {
        if (item.status === false) {
          item.checked = false;
        }
        else {
          item.checked = true;
        }
      });
    }
    else {
      this.results.forEach((item) => {
        delete item["auction"];

        if (item.score !== 0 && item.score !== undefined) {
          item.checked = true;
        }
        else {
          item.checked = false;
        }
      });
    }
  }

}
