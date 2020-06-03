import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req, next) {
    const token = localStorage.getItem("auth_token");
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `token ${token}`,
      },
    });
    return next.handle(tokenizedReq);
  }
}
