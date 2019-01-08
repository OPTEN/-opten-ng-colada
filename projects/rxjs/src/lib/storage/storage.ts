import { Observable } from 'rxjs';

export interface Storage<T> {
	get: () => T | Observable<T> | Promise<T>;
	set: (data: T) => void;
	clear: () => void;
}
