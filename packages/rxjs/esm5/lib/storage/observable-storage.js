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
var /**
 * @abstract
 * @template TData
 */
ObservableStorage = /** @class */ (function () {
    function ObservableStorage(_key, _storageProvider) {
        this._key = _key;
        this._storageProvider = _storageProvider;
        this._subject = new BehaviorSubject(this.parse());
    }
    /**
     * @return {?}
     */
    ObservableStorage.prototype.change = /**
     * @return {?}
     */
    function () {
        return this._subject.asObservable().pipe(share());
    };
    /**
     * @return {?}
     */
    ObservableStorage.prototype.get = /**
     * @return {?}
     */
    function () {
        return observableOf(this.parse());
    };
    /**
     * @param {?} data
     * @return {?}
     */
    ObservableStorage.prototype.set = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this._storageProvider.setItem(this._key, JSON.stringify(data));
        this._subject.next(this.parse());
    };
    /**
     * @return {?}
     */
    ObservableStorage.prototype.clear = /**
     * @return {?}
     */
    function () {
        this._storageProvider.removeItem(this._key);
        this._subject.next(this.parse());
    };
    /**
     * @return {?}
     */
    ObservableStorage.prototype.parse = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var item = this._storageProvider.getItem(this._key);
        if (!item || item == null) {
            return null;
        }
        return JSON.parse(item);
    };
    return ObservableStorage;
}());
/**
 * @abstract
 * @template TData
 */
export { ObservableStorage };
if (false) {
    /** @type {?} */
    ObservableStorage.prototype._subject;
    /** @type {?} */
    ObservableStorage.prototype._key;
    /** @type {?} */
    ObservableStorage.prototype._storageProvider;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZS1zdG9yYWdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG9wdGVuL3J4anMvIiwic291cmNlcyI6WyJsaWIvc3RvcmFnZS9vYnNlcnZhYmxlLXN0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBVyxlQUFlLEVBQWMsRUFBRSxJQUFJLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBSXZDOzs7OztJQUdDLDJCQUFvQixJQUFZLEVBQVUsZ0JBQXlCO1FBQS9DLFNBQUksR0FBSixJQUFJLENBQVE7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVM7UUFGM0QsYUFBUSxHQUFtQixJQUFJLGVBQWUsQ0FBUSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUVOLENBQUM7Ozs7SUFFdkUsa0NBQU07OztJQUFOO1FBQ0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7SUFFRCwrQkFBRzs7O0lBQUg7UUFDQyxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7OztJQUVELCtCQUFHOzs7O0lBQUgsVUFBSSxJQUFXO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7O0lBRUQsaUNBQUs7OztJQUFMO1FBQ0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVTLGlDQUFLOzs7SUFBZjs7WUFDTyxJQUFJLEdBQVcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRTdELElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUMxQixPQUFPLElBQUksQ0FBQztTQUNaO1FBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDRix3QkFBQztBQUFELENBQUMsQUFoQ0QsSUFnQ0M7Ozs7Ozs7O0lBL0JBLHFDQUE0RTs7SUFFaEUsaUNBQW9COztJQUFFLDZDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QsIEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHNoYXJlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgU3RvcmFnZSBhcyBTdG9yZSB9IGZyb20gJy4vc3RvcmFnZSc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgT2JzZXJ2YWJsZVN0b3JhZ2U8VERhdGE+IGltcGxlbWVudHMgU3RvcmU8VERhdGE+IHtcclxuXHRwcml2YXRlIF9zdWJqZWN0OiBTdWJqZWN0PFREYXRhPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VERhdGE+KHRoaXMucGFyc2UoKSk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgX2tleTogc3RyaW5nLCBwcml2YXRlIF9zdG9yYWdlUHJvdmlkZXI6IFN0b3JhZ2UpIHt9XHJcblxyXG5cdGNoYW5nZSgpOiBPYnNlcnZhYmxlPFREYXRhPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc3ViamVjdC5hc09ic2VydmFibGUoKS5waXBlKHNoYXJlKCkpO1xyXG5cdH1cclxuXHJcblx0Z2V0KCk6IE9ic2VydmFibGU8VERhdGE+IHtcclxuXHRcdHJldHVybiBvYnNlcnZhYmxlT2YodGhpcy5wYXJzZSgpKTtcclxuXHR9XHJcblxyXG5cdHNldChkYXRhOiBURGF0YSk6IHZvaWQge1xyXG5cdFx0dGhpcy5fc3RvcmFnZVByb3ZpZGVyLnNldEl0ZW0odGhpcy5fa2V5LCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcblx0XHR0aGlzLl9zdWJqZWN0Lm5leHQodGhpcy5wYXJzZSgpKTtcclxuXHR9XHJcblxyXG5cdGNsZWFyKCkge1xyXG5cdFx0dGhpcy5fc3RvcmFnZVByb3ZpZGVyLnJlbW92ZUl0ZW0odGhpcy5fa2V5KTtcclxuXHRcdHRoaXMuX3N1YmplY3QubmV4dCh0aGlzLnBhcnNlKCkpO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIHBhcnNlKCk6IFREYXRhIHtcclxuXHRcdGNvbnN0IGl0ZW06IHN0cmluZyA9IHRoaXMuX3N0b3JhZ2VQcm92aWRlci5nZXRJdGVtKHRoaXMuX2tleSk7XHJcblxyXG5cdFx0aWYgKCFpdGVtIHx8IGl0ZW0gPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gSlNPTi5wYXJzZShpdGVtKTtcclxuXHR9XHJcbn1cclxuIl19