export default class UrlHelper {
    static extractUserIdFromUrl(url: string): string {
        const urlItems = url.split('/');
        return urlItems[urlItems.length - 1];
    }
}
