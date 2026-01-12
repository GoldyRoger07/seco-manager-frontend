import { Routes } from '@angular/router';
import { HomePage } from './features/home/home.page';
import { EmployeePage } from './features/employees/employee.page';
import { DepartementPage } from './features/departements/departement.page';
import { BanquePage } from './features/banques/banque.page';
import { EtatCivilPage } from './features/etat-civils/etat-civil.page';
import { TypeCongePage } from './features/type-conge/type-conge.page';
import { PositionPage } from './features/positions/position.page';

export const routes: Routes = [
    {  path: '', component: HomePage, children:[
        {path: 'employees', component: EmployeePage},
        {path: 'departements', component: DepartementPage},
        {path: 'banques', component: BanquePage},
        {path: 'etat-civils', component: EtatCivilPage},
        {path: 'type-conges', component: TypeCongePage},
        {path: 'positions', component: PositionPage},
    ]}
];
