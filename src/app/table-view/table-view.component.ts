import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  displayedColumns: string[] = ['id', 'type', 'content']; // Add other columns as needed
  dataSource = new MatTableDataSource<any>([]); // Initialize with an empty array

  @ViewChild(MatSort, {static: true}) sort!: MatSort; // Use definite assignment assertion

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('../../assets/example.json').subscribe(data => {
      this.dataSource.data = data.data;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'content':
            return item.attributes.content.toLowerCase();
          default:
            return item[property];
        }
      };
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filterPredicate = (data, filter) => {
      const content = data.attributes.content.toLowerCase(); // Extract content from your data
      return content.includes(filter); // Check if the content includes the filter text
    };

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


