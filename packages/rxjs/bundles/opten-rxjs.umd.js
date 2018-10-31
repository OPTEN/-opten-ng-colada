(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@opten/rxjs', ['exports', 'rxjs', 'rxjs/operators'], factory) :
    (factory((global.opten = global.opten || {}, global.opten.rxjs = {}),global.rxjs,global.rxjs.operators));
}(this, (function (exports,rxjs,operators) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /**
     * @abstract
     * @template TData
     */
    var /**
     * @abstract
     * @template TData
     */ ObservableStorage = /** @class */ (function () {
        function ObservableStorage(_key, _storageProvider) {
            this._key = _key;
            this._storageProvider = _storageProvider;
            this._subject = new rxjs.BehaviorSubject(this.parse());
        }
        /**
         * @return {?}
         */
        ObservableStorage.prototype.change = /**
         * @return {?}
         */
            function () {
                return this._subject.asObservable().pipe(operators.share());
            };
        /**
         * @return {?}
         */
        ObservableStorage.prototype.get = /**
         * @return {?}
         */
            function () {
                return rxjs.of(this.parse());
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

    exports.ObservableStorage = ObservableStorage;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0ZW4tcnhqcy51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BvcHRlbi9yeGpzL2xpYi9zdG9yYWdlL29ic2VydmFibGUtc3RvcmFnZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0LCBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mIGFzIG9ic2VydmFibGVPZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBzaGFyZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IFN0b3JhZ2UgYXMgU3RvcmUgfSBmcm9tICcuL3N0b3JhZ2UnO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE9ic2VydmFibGVTdG9yYWdlPFREYXRhPiBpbXBsZW1lbnRzIFN0b3JlPFREYXRhPiB7XHJcblx0cHJpdmF0ZSBfc3ViamVjdDogU3ViamVjdDxURGF0YT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFREYXRhPih0aGlzLnBhcnNlKCkpO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIF9rZXk6IHN0cmluZywgcHJpdmF0ZSBfc3RvcmFnZVByb3ZpZGVyOiBTdG9yYWdlKSB7fVxyXG5cclxuXHRjaGFuZ2UoKTogT2JzZXJ2YWJsZTxURGF0YT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3N1YmplY3QuYXNPYnNlcnZhYmxlKCkucGlwZShzaGFyZSgpKTtcclxuXHR9XHJcblxyXG5cdGdldCgpOiBPYnNlcnZhYmxlPFREYXRhPiB7XHJcblx0XHRyZXR1cm4gb2JzZXJ2YWJsZU9mKHRoaXMucGFyc2UoKSk7XHJcblx0fVxyXG5cclxuXHRzZXQoZGF0YTogVERhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMuX3N0b3JhZ2VQcm92aWRlci5zZXRJdGVtKHRoaXMuX2tleSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG5cdFx0dGhpcy5fc3ViamVjdC5uZXh0KHRoaXMucGFyc2UoKSk7XHJcblx0fVxyXG5cclxuXHRjbGVhcigpIHtcclxuXHRcdHRoaXMuX3N0b3JhZ2VQcm92aWRlci5yZW1vdmVJdGVtKHRoaXMuX2tleSk7XHJcblx0XHR0aGlzLl9zdWJqZWN0Lm5leHQodGhpcy5wYXJzZSgpKTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBwYXJzZSgpOiBURGF0YSB7XHJcblx0XHRjb25zdCBpdGVtOiBzdHJpbmcgPSB0aGlzLl9zdG9yYWdlUHJvdmlkZXIuZ2V0SXRlbSh0aGlzLl9rZXkpO1xyXG5cclxuXHRcdGlmICghaXRlbSB8fCBpdGVtID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIEpTT04ucGFyc2UoaXRlbSk7XHJcblx0fVxyXG59XHJcbiJdLCJuYW1lcyI6WyJCZWhhdmlvclN1YmplY3QiLCJzaGFyZSIsIm9ic2VydmFibGVPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBS0E7Ozs7UUFHQywyQkFBb0IsSUFBWSxFQUFVLGdCQUF5QjtZQUEvQyxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFTO1lBRjNELGFBQVEsR0FBbUIsSUFBSUEsb0JBQWUsQ0FBUSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUVMOzs7O1FBRXZFLGtDQUFNOzs7WUFBTjtnQkFDQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDQyxlQUFLLEVBQUUsQ0FBQyxDQUFDO2FBQ2xEOzs7O1FBRUQsK0JBQUc7OztZQUFIO2dCQUNDLE9BQU9DLE9BQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzthQUNsQzs7Ozs7UUFFRCwrQkFBRzs7OztZQUFILFVBQUksSUFBVztnQkFDZCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMvRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzthQUNqQzs7OztRQUVELGlDQUFLOzs7WUFBTDtnQkFDQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7YUFDakM7Ozs7UUFFUyxpQ0FBSzs7O1lBQWY7O29CQUNPLElBQUksR0FBVyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBRTdELElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtvQkFDMUIsT0FBTyxJQUFJLENBQUM7aUJBQ1o7Z0JBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3hCO1FBQ0Ysd0JBQUM7SUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9