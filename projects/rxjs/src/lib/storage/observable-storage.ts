import { Subject, BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { share } from 'rxjs/operators';

import { Storage as Store } from './storage';

export abstract class ObservableStorage<TData> implements Store<TData> {
	private subject: Subject<TData> = new BehaviorSubject<TData>(this.parse());

	constructor(private key: string, private storageProvider: Storage) {}

	change(): Observable<TData> {
		return this.subject.asObservable().pipe(share());
	}

	get(): Observable<TData> {
		return observableOf(this.parse());
	}

	set(data: TData): void {
		this.storageProvider.setItem(this.key, JSON.stringify(data));
		this.subject.next(this.parse());
	}

	clear() {
		this.storageProvider.removeItem(this.key);
		this.subject.next(this.parse());
	}

	protected parse(): TData {
		const item: string = this.storageProvider.getItem(this.key);

		if (!item || item == null) {
			return null;
		}

		return JSON.parse(item);
	}
}
