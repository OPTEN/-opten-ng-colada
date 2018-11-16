import { JwtTokenResponse } from './jwt-token-response';

function getTokenExpirationDate(token: JwtTokenResponse): Date {
	if (!token || token == null || !token.expires_in) {
		return null;
	}

	const date: Date = new Date(0); // The 0 here is the key, which sets the date to the epoch
	date.setUTCSeconds(token.expires_in);

	return date;
}

export function isTokenExpired(
	token: JwtTokenResponse,
	offsetSeconds?: number
): boolean {
	offsetSeconds = offsetSeconds || 0;

	const date: Date = getTokenExpirationDate(token);

	if (!date || date == null) {
		return true;
	}

	return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
}
