import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Route, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { IonicAddListComponent } from "./add-list.page";

const routes: Route[] = [
    {
        path: '',
        component: IonicAddListComponent,
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        IonicAddListComponent
    ]
})
export class IonicAddListModule{}