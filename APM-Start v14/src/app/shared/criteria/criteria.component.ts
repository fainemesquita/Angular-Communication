import { Component, ElementRef, Input, OnInit, AfterViewInit, OnChanges, ViewChild, SimpleChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {
  @Input() displayDetail: boolean | undefined;
  @Input() hitCount: number | undefined;
  hitMessage = '';
  @Output() valueChange: EventEmitter<string> = 
              new EventEmitter<string>();

  @ViewChild('filterElement') filterElementRef: ElementRef | undefined;

  private _listFilter!: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }

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
      this.hitMessage = 'Results: ' + this.hitCount
    }
  }

  ngOnInit(): void {
  }

}
