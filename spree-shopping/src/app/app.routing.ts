import { ProductComponent } from './product/product.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProductComponent },
];

export const AppRoutes = RouterModule.forRoot(routes);
