import { Subject, BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { share } from 'rxjs/operators';

import { Storage as Store } from './storage';

export abstract class ObservableStorage<TData> implements Store<TData> {
	private _subject: Subject<TData> = new BehaviorSubject<TData>(this.parse());

	constructor(private _key: string, private _storageProvider: Storage) {}

	change(): Observable<TData> {
		return this._subject.asObservable().pipe(share());
	}

	get(): Observable<TData> {
		return observableOf(this.parse());
	}

	set(data: TData): void {
		this._storageProvider.setItem(this._key, JSON.stringify(data));
		this._subject.next(this.parse());
	}

	clear() {
		this._storageProvider.removeItem(this._key);
		this._subject.next(this.parse());
	}

	protected parse(): TData {
		const item: string = this._storageProvider.getItem(this._key);

		if (!item || item == null) {
			return null;
		}

		return JSON.parse(item);
	}
}
