import { HttpInterceptorFn } from '@angular/common/http';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // Add loading state or headers if needed
  const loadedReq = req.clone({
    setHeaders: {
      'X-Request-Time': Date.now().toString()
    }
  });
  return next(loadedReq);
};