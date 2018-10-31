/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @param {?} token
 * @return {?}
 */
function getTokenExpirationDate(token) {
    if (!token || token == null || !token.expiration) {
        return null;
    }
    /** @type {?} */
    const date = new Date(0);
    date.setUTCSeconds(token.expiration);
    return date;
}
/**
 * @param {?} token
 * @param {?=} offsetSeconds
 * @return {?}
 */
export function isTokenExpired(token, offsetSeconds) {
    offsetSeconds = offsetSeconds || 0;
    /** @type {?} */
    const date = getTokenExpirationDate(token);
    if (!date || date == null) {
        return true;
    }
    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtdG9rZW4tZXhwaXJlZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BvcHRlbi9uZy1qd3QvIiwic291cmNlcyI6WyJsaWIvaXMtdG9rZW4tZXhwaXJlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBLFNBQVMsc0JBQXNCLENBQUMsS0FBdUI7SUFDdEQsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtRQUNqRCxPQUFPLElBQUksQ0FBQztLQUNaOztVQUVLLElBQUksR0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDOUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFckMsT0FBTyxJQUFJLENBQUM7QUFDYixDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUM3QixLQUF1QixFQUN2QixhQUFzQjtJQUV0QixhQUFhLEdBQUcsYUFBYSxJQUFJLENBQUMsQ0FBQzs7VUFFN0IsSUFBSSxHQUFTLHNCQUFzQixDQUFDLEtBQUssQ0FBQztJQUVoRCxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7UUFDMUIsT0FBTyxJQUFJLENBQUM7S0FDWjtJQUVELE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLGFBQWEsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUN4RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnd0VG9rZW5SZXNwb25zZSB9IGZyb20gJy4vand0LXRva2VuLXJlc3BvbnNlJztcclxuXHJcbmZ1bmN0aW9uIGdldFRva2VuRXhwaXJhdGlvbkRhdGUodG9rZW46IEp3dFRva2VuUmVzcG9uc2UpOiBEYXRlIHtcclxuXHRpZiAoIXRva2VuIHx8IHRva2VuID09IG51bGwgfHwgIXRva2VuLmV4cGlyYXRpb24pIHtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0Y29uc3QgZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKDApOyAvLyBUaGUgMCBoZXJlIGlzIHRoZSBrZXksIHdoaWNoIHNldHMgdGhlIGRhdGUgdG8gdGhlIGVwb2NoXHJcblx0ZGF0ZS5zZXRVVENTZWNvbmRzKHRva2VuLmV4cGlyYXRpb24pO1xyXG5cclxuXHRyZXR1cm4gZGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVG9rZW5FeHBpcmVkKFxyXG5cdHRva2VuOiBKd3RUb2tlblJlc3BvbnNlLFxyXG5cdG9mZnNldFNlY29uZHM/OiBudW1iZXJcclxuKTogYm9vbGVhbiB7XHJcblx0b2Zmc2V0U2Vjb25kcyA9IG9mZnNldFNlY29uZHMgfHwgMDtcclxuXHJcblx0Y29uc3QgZGF0ZTogRGF0ZSA9IGdldFRva2VuRXhwaXJhdGlvbkRhdGUodG9rZW4pO1xyXG5cclxuXHRpZiAoIWRhdGUgfHwgZGF0ZSA9PSBudWxsKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiAhKGRhdGUudmFsdWVPZigpID4gbmV3IERhdGUoKS52YWx1ZU9mKCkgKyBvZmZzZXRTZWNvbmRzICogMTAwMCk7XHJcbn1cclxuIl19