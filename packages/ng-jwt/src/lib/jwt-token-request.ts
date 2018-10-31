export interface JwtTokenRequest {
	grant_type: 'refresh_token' | 'password';
	username?: string;
	password?: string;
	refresh_token?: string;
}
