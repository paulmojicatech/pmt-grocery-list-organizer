import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { IonicAppStateService } from '../../../../libs/grocery-shared-business-logic/src/lib/app-view-model/ionic/ionic-app-state.service';
import { AppViewModel } from '../../../../libs/grocery-shared-business-logic/src/lib/app-view-model/app-state.interface';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'paulmojicatech-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  viewModel$!: Observable<AppViewModel>;

  constructor(
    public appStateSvc: IonicAppStateService,
    private _storage: Storage
  ) {}

  async ngOnInit(): Promise<void> {
    await this._storage.create();
    this.viewModel$ = this.appStateSvc
      .getViewModel()
      .pipe(filter((vm) => !!vm.headerData));
  }
}
