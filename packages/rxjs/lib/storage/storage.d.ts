import { Observable } from 'rxjs';
export interface Storage<TData> {
    get: () => TData | Observable<TData> | Promise<TData>;
    set: (data: TData) => void;
    clear: () => void;
}
