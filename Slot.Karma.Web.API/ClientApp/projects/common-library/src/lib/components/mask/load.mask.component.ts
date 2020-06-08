import { Component, Input} from '@angular/core';

@Component({
  selector: 'load-mask',
  templateUrl: './load.mask.component.html',
  styleUrls: ['./load.mask.component.less']
})
export class LoadMaskComponent {
  @Input() public type : string = "circle";
  @Input() public message: string = ""; 

  constructor() {
  }

}
