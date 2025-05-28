import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Output() searchEvent = new EventEmitter<string>();

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.searchEvent.emit(query);
  }
}
