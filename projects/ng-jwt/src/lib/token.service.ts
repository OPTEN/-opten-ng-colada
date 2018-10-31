import { Injectable, Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, of as observableOf } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

import { isTokenExpired } from './is-token-expired';
import { JwtTokenRequest } from './jwt-token-request';
import { JWT_CONFIG, JwtConfig } from './token.config';
import { JwtTokenResponse } from './jwt-token-response';

@Injectable()
export class TokenService {
	constructor(
		@Inject(JWT_CONFIG) private config: JwtConfig,
		private http: HttpClient
	) {}

	token(request: JwtTokenRequest): Observable<JwtTokenResponse> {
		return this.http
			.post<JwtTokenResponse>(this.config.tokenEndpoint, request, {
				headers: { 'Skip-Token': 'true' }
			})
			.pipe(
				map(token => {
					if (token && token.access_token) {
						// store token
						this.config.setToken(token);
					}

					return token;
				})
			);
	}

	/**
	 * This method gets the token from the storage
	 * check if it is still valid if it is it will be returned
	 * otherwise the token endpoint will be called to create a new token
	 * with the refresh_token
	 */
	get(): Observable<JwtTokenResponse> {
		return this.config.getToken().pipe(
			mergeMap(token => {
				if (token && isTokenExpired(token)) {
					const request: JwtTokenRequest = {
						grant_type: 'refresh_token',
						refresh_token: token.refresh_token
					};

					// todo: should we call authenticate? so we also set the member?
					return this.token(request);
				}

				return observableOf(token);
			})
		);
	}
}
