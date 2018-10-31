import { Observable } from 'rxjs';
import { Storage as Store } from './storage';
export declare abstract class ObservableStorage<TData> implements Store<TData> {
    private _key;
    private _storageProvider;
    private _subject;
    constructor(_key: string, _storageProvider: Storage);
    change(): Observable<TData>;
    get(): Observable<TData>;
    set(data: TData): void;
    clear(): void;
    protected parse(): TData;
}
