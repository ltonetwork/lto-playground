import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Component({
  selector: 'lto-import-json',
  templateUrl: './import-json.component.html',
  styleUrls: ['./import-json.component.scss']
})
export class ImportJsonComponent implements OnInit {
  @ViewChild('input') fileInput!: ElementRef<HTMLInputElement>;
  availableTemplates = [
    {
      id: 'license_flow',
      name: 'Issue License Workflow',
      resource: 'scenarios/license_flow.json'
    },
    {
      id: 'shipment_flow',
      name: 'Shipment Workflow',
      resource: 'scenarios/shipment_flow.json'
    }
  ];

  selectedJson = 'license_flow';

  constructor(private _dialog: MatDialogRef<any>,
    private _http: HttpClient) { }

  ngOnInit() {}

  import() {
    if (!this.fileInput.nativeElement.files) {
      return;
    }

    const file = this.fileInput.nativeElement.files[0];
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      const fileContent = evt.target.result;
      this._dialog.close(fileContent);
    };

    reader.readAsText(file);
  }

  importFromTemplate() {
    const selected = this.availableTemplates.find(j => j.id === this.selectedJson)!;

    this._http.get(`/assets/${selected.resource}`).pipe(take(1)).subscribe(response => {
      this._dialog.close(JSON.stringify(response));
    });
  }
}
