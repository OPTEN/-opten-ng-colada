import { Injectable, Inject } from '@angular/core';

import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpHeaders
} from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { mergeMap, finalize, filter, take, switchMap } from 'rxjs/operators';

import { JwtConfig, JWT_CONFIG } from './token.config';
import { JwtTokenResponse } from './jwt-token-response';
import { TokenService } from './token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	private _isRefreshingToken = false;
	private _tokenSubject = new BehaviorSubject<JwtTokenResponse>(null);

	constructor(
		@Inject(JWT_CONFIG) private _config: JwtConfig,
		private tokenService: TokenService
	) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// todo: Is there a way to ignore some intereceptors like Angular 1 have it?
		// https://github.com/angular/angular/issues/18155#issuecomment-326136484
		// If this header is present the token will not be refreshed!
		// Use this for unprotected urls like token endpoint itself,
		// otherwise you will run into an infinite loop.
		const skipIssuingToken: boolean = request.headers.has('Skip-Token');

		// This headers only have "internal" purposes for Angular
		// so we actually don't need to send them to the server!
		const headers = request.headers.delete('Skip-Token');

		if (skipIssuingToken) {
			return next.handle(request.clone({ headers }));
		} else if (this._isRefreshingToken === false) {
			// Thanks to: https://github.com/IntertechInc/http-interceptor-refresh-token
			this._isRefreshingToken = true;

			// Reset here so that the following requests wait until the token
			// comes back from the refreshToken call (e.g. for polling).
			this._tokenSubject.next(null);

			return this.tokenService.get().pipe(
				mergeMap(token => {
					this._tokenSubject.next(token);

					return next.handle(this._addToken(request, headers, token));
				}),
				finalize(() => (this._isRefreshingToken = false))
			);
		}

		return this._tokenSubject.pipe(
			filter(token => token != null),
			take(1),
			switchMap(token =>
				next.handle(this._addToken(request, headers, token))
			)
		);
	}

	private _addToken(
		request: HttpRequest<any>,
		headers: HttpHeaders,
		token: JwtTokenResponse
	): HttpRequest<any> {
		if (
			token &&
			this._isWhitelistedHost(
				request.url,
				this._config.whitelistedDomains
			)
		) {
			return request.clone({
				headers: headers.set(
					this._config.headerName,
					`${this._config.authScheme}${token.access_token}`
				)
			});
		}

		return request;
	}

	// todo: @opten/gin-tonic?
	private _isWhitelistedHost(url: string, whitelist: Array<string>): boolean {
		const host: string = this._getHost(url);

		return (
			whitelist
				.map(o => this._getHost(o).toLowerCase())
				.indexOf(host.toLowerCase()) > -1
		);
	}

	// todo: @opten/gin-tonic?
	private _getHost(href: string) {
		if (window.URL) {
			return new URL(href).host;
		}

		// IE 11 and Edge throw 'Object doesn't support this action' for new URL(...).host.
		// The weird problem is, that IE 11 and Edge support window.URL but not if you init it by yourself.
		return href.match(
			/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
		)[2];
	}
}
