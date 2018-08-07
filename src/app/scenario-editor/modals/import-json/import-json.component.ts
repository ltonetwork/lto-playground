import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'lto-import-json',
  templateUrl: './import-json.component.html',
  styleUrls: ['./import-json.component.scss']
})
export class ImportJsonComponent implements OnInit {
  @ViewChild('input') fileInput!: ElementRef<HTMLInputElement>;
  constructor(private _dialog: MatDialogRef<any>) {}

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
}
