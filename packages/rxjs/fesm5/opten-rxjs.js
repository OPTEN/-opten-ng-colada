import { BehaviorSubject, of } from 'rxjs';
import { share } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template TData
 */
var  /**
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
        return of(this.parse());
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { ObservableStorage };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0ZW4tcnhqcy5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQG9wdGVuL3J4anMvbGliL3N0b3JhZ2Uvb2JzZXJ2YWJsZS1zdG9yYWdlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QsIEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHNoYXJlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgU3RvcmFnZSBhcyBTdG9yZSB9IGZyb20gJy4vc3RvcmFnZSc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgT2JzZXJ2YWJsZVN0b3JhZ2U8VERhdGE+IGltcGxlbWVudHMgU3RvcmU8VERhdGE+IHtcclxuXHRwcml2YXRlIF9zdWJqZWN0OiBTdWJqZWN0PFREYXRhPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VERhdGE+KHRoaXMucGFyc2UoKSk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgX2tleTogc3RyaW5nLCBwcml2YXRlIF9zdG9yYWdlUHJvdmlkZXI6IFN0b3JhZ2UpIHt9XHJcblxyXG5cdGNoYW5nZSgpOiBPYnNlcnZhYmxlPFREYXRhPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc3ViamVjdC5hc09ic2VydmFibGUoKS5waXBlKHNoYXJlKCkpO1xyXG5cdH1cclxuXHJcblx0Z2V0KCk6IE9ic2VydmFibGU8VERhdGE+IHtcclxuXHRcdHJldHVybiBvYnNlcnZhYmxlT2YodGhpcy5wYXJzZSgpKTtcclxuXHR9XHJcblxyXG5cdHNldChkYXRhOiBURGF0YSk6IHZvaWQge1xyXG5cdFx0dGhpcy5fc3RvcmFnZVByb3ZpZGVyLnNldEl0ZW0odGhpcy5fa2V5LCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcblx0XHR0aGlzLl9zdWJqZWN0Lm5leHQodGhpcy5wYXJzZSgpKTtcclxuXHR9XHJcblxyXG5cdGNsZWFyKCkge1xyXG5cdFx0dGhpcy5fc3RvcmFnZVByb3ZpZGVyLnJlbW92ZUl0ZW0odGhpcy5fa2V5KTtcclxuXHRcdHRoaXMuX3N1YmplY3QubmV4dCh0aGlzLnBhcnNlKCkpO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIHBhcnNlKCk6IFREYXRhIHtcclxuXHRcdGNvbnN0IGl0ZW06IHN0cmluZyA9IHRoaXMuX3N0b3JhZ2VQcm92aWRlci5nZXRJdGVtKHRoaXMuX2tleSk7XHJcblxyXG5cdFx0aWYgKCFpdGVtIHx8IGl0ZW0gPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gSlNPTi5wYXJzZShpdGVtKTtcclxuXHR9XHJcbn1cclxuIl0sIm5hbWVzIjpbIm9ic2VydmFibGVPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBS0E7Ozs7O0lBR0MsMkJBQW9CLElBQVksRUFBVSxnQkFBeUI7UUFBL0MsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUztRQUYzRCxhQUFRLEdBQW1CLElBQUksZUFBZSxDQUFRLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBRUw7Ozs7SUFFdkUsa0NBQU07OztJQUFOO1FBQ0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBQ2xEOzs7O0lBRUQsK0JBQUc7OztJQUFIO1FBQ0MsT0FBT0EsRUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBQ2xDOzs7OztJQUVELCtCQUFHOzs7O0lBQUgsVUFBSSxJQUFXO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztLQUNqQzs7OztJQUVELGlDQUFLOzs7SUFBTDtRQUNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBQ2pDOzs7O0lBRVMsaUNBQUs7OztJQUFmOztZQUNPLElBQUksR0FBVyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFN0QsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDeEI7SUFDRix3QkFBQztDQUFBOzs7Ozs7Ozs7Ozs7OzsifQ==