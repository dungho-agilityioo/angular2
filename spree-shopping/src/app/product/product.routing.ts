import { ProductComponent } from './product.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'products', component: ProductComponent },
];

export const ProductRoutes = RouterModule.forChild(routes);
