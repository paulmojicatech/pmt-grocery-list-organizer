import { Component, OnInit } from '@angular/core';
import { Plugins } from'@capacitor/core';

@Component({
  selector: 'paulmojicatech-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {
    
  }

  ngOnInit(): void {
    const { SecureConfigStorage } = Plugins;
    SecureConfigStorage.getValueFromConfig({key: 'testing'}).then((value: { result: string }) => {
      console.log(value.result);
    })
  }
}
