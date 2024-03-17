import { HttpResponse } from '@angular/common/http';
import { delay, dematerialize, materialize, of, throwError } from 'rxjs';

export default class HttpResponseHandler {
    static ok(body?: any) {
        return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
    }

    static error(message: string) {
        return throwError(() => ({ error: { message } })).pipe(
            materialize(),
            delay(500),
            dematerialize()
        );
    }
}
