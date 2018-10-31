export interface JwtTokenResponse {
	access_token: string;
	token_type: string;
	expiration: number;
	refresh_token: string;
}
