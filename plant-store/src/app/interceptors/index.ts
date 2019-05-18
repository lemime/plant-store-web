import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiEndpointInterceptor } from './api.interceptor';
export const interceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiEndpointInterceptor,
    multi: true
  }
];
