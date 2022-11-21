import { Component, ElementRef, Input, OnInit, AfterViewInit, OnChanges, ViewChild, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {
  listFilter: string = 'cart';
  @Input() displayDetail: boolean | undefined;
  @Input() hitCount: number | undefined;
  hitMessage = '';

  @ViewChild('filterElement') filterElementRef: ElementRef | undefined;

  constructor() { }

  ngAfterViewInit(): void {
    if (this.filterElementRef) {
        this.filterElementRef?.nativeElement.focus()
    }

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue){
      this.hitMessage = 'No matches found';
    } else {
      this.hitMessage = 'Hits: ' + this.hitCount
    }
  }

  ngOnInit(): void {
  }

}
