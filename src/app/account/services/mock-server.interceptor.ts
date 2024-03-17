import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MockServerService } from './mock-server.service';
import UrlHelper from './url.helper';
import { HTTP_METHOD } from '@app/shared/constants/http-method.constant';

@Injectable()
export class MockServerInterceptor implements HttpInterceptor {
    constructor(private mockService: MockServerService) {}

    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const { url, method, body } = request;

        switch (true) {
            case url.endsWith('/users/register') && method === HTTP_METHOD.POST:
                return this.mockService.register(body);
            case url.endsWith('/users/login') && method === HTTP_METHOD.POST:
                return this.mockService.login(body);
            case url.includes('/users/') && method === HTTP_METHOD.PUT:
                const userId = UrlHelper.extractUserIdFromUrl(url);
                return this.mockService.updateUser(body, userId);

            default:
                return next.handle(request);
        }
    }
}
