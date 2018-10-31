/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { BehaviorSubject, of as observableOf } from 'rxjs';
import { share } from 'rxjs/operators';
/**
 * @abstract
 * @template TData
 */
export class ObservableStorage {
    /**
     * @param {?} _key
     * @param {?} _storageProvider
     */
    constructor(_key, _storageProvider) {
        this._key = _key;
        this._storageProvider = _storageProvider;
        this._subject = new BehaviorSubject(this.parse());
    }
    /**
     * @return {?}
     */
    change() {
        return this._subject.asObservable().pipe(share());
    }
    /**
     * @return {?}
     */
    get() {
        return observableOf(this.parse());
    }
    /**
     * @param {?} data
     * @return {?}
     */
    set(data) {
        this._storageProvider.setItem(this._key, JSON.stringify(data));
        this._subject.next(this.parse());
    }
    /**
     * @return {?}
     */
    clear() {
        this._storageProvider.removeItem(this._key);
        this._subject.next(this.parse());
    }
    /**
     * @return {?}
     */
    parse() {
        /** @type {?} */
        const item = this._storageProvider.getItem(this._key);
        if (!item || item == null) {
            return null;
        }
        return JSON.parse(item);
    }
}
if (false) {
    /** @type {?} */
    ObservableStorage.prototype._subject;
    /** @type {?} */
    ObservableStorage.prototype._key;
    /** @type {?} */
    ObservableStorage.prototype._storageProvider;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZS1zdG9yYWdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG9wdGVuL3J4anMvIiwic291cmNlcyI6WyJsaWIvc3RvcmFnZS9vYnNlcnZhYmxlLXN0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBVyxlQUFlLEVBQWMsRUFBRSxJQUFJLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBSXZDLE1BQU0sT0FBZ0IsaUJBQWlCOzs7OztJQUd0QyxZQUFvQixJQUFZLEVBQVUsZ0JBQXlCO1FBQS9DLFNBQUksR0FBSixJQUFJLENBQVE7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVM7UUFGM0QsYUFBUSxHQUFtQixJQUFJLGVBQWUsQ0FBUSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUVOLENBQUM7Ozs7SUFFdkUsTUFBTTtRQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7O0lBRUQsR0FBRztRQUNGLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7O0lBRUQsR0FBRyxDQUFDLElBQVc7UUFDZCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCxLQUFLO1FBQ0osSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVTLEtBQUs7O2NBQ1IsSUFBSSxHQUFXLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUU3RCxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDMUIsT0FBTyxJQUFJLENBQUM7U0FDWjtRQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0NBQ0Q7OztJQS9CQSxxQ0FBNEU7O0lBRWhFLGlDQUFvQjs7SUFBRSw2Q0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0LCBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mIGFzIG9ic2VydmFibGVPZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBzaGFyZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IFN0b3JhZ2UgYXMgU3RvcmUgfSBmcm9tICcuL3N0b3JhZ2UnO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE9ic2VydmFibGVTdG9yYWdlPFREYXRhPiBpbXBsZW1lbnRzIFN0b3JlPFREYXRhPiB7XHJcblx0cHJpdmF0ZSBfc3ViamVjdDogU3ViamVjdDxURGF0YT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFREYXRhPih0aGlzLnBhcnNlKCkpO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIF9rZXk6IHN0cmluZywgcHJpdmF0ZSBfc3RvcmFnZVByb3ZpZGVyOiBTdG9yYWdlKSB7fVxyXG5cclxuXHRjaGFuZ2UoKTogT2JzZXJ2YWJsZTxURGF0YT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3N1YmplY3QuYXNPYnNlcnZhYmxlKCkucGlwZShzaGFyZSgpKTtcclxuXHR9XHJcblxyXG5cdGdldCgpOiBPYnNlcnZhYmxlPFREYXRhPiB7XHJcblx0XHRyZXR1cm4gb2JzZXJ2YWJsZU9mKHRoaXMucGFyc2UoKSk7XHJcblx0fVxyXG5cclxuXHRzZXQoZGF0YTogVERhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMuX3N0b3JhZ2VQcm92aWRlci5zZXRJdGVtKHRoaXMuX2tleSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG5cdFx0dGhpcy5fc3ViamVjdC5uZXh0KHRoaXMucGFyc2UoKSk7XHJcblx0fVxyXG5cclxuXHRjbGVhcigpIHtcclxuXHRcdHRoaXMuX3N0b3JhZ2VQcm92aWRlci5yZW1vdmVJdGVtKHRoaXMuX2tleSk7XHJcblx0XHR0aGlzLl9zdWJqZWN0Lm5leHQodGhpcy5wYXJzZSgpKTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBwYXJzZSgpOiBURGF0YSB7XHJcblx0XHRjb25zdCBpdGVtOiBzdHJpbmcgPSB0aGlzLl9zdG9yYWdlUHJvdmlkZXIuZ2V0SXRlbSh0aGlzLl9rZXkpO1xyXG5cclxuXHRcdGlmICghaXRlbSB8fCBpdGVtID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIEpTT04ucGFyc2UoaXRlbSk7XHJcblx0fVxyXG59XHJcbiJdfQ==