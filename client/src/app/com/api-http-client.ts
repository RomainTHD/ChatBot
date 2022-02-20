import {
    HttpClient,
    HttpHandler,
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "environments/environment";
import {Observable} from "rxjs";

/**
 * API HTTP service
 */
@Injectable()
export class ApiHttpClient extends HttpClient {
    /**
     * Base URL of the API
     * @see environment
     * @private
     */
    private readonly _baseUrl: string;

    /**
     * Constructor
     * @param handler HTTP handler
     */
    public constructor(handler: HttpHandler) {
        super(handler);

        this._baseUrl = environment.apiUrl.endsWith("/")
            ? environment.apiUrl
            : environment.apiUrl + "/";
    }

    /**
     * GET request
     * @param url URL endpoint
     * @param options Additional options
     * @returns API response
     */
    public override get<T>(
        url: string,
        options?: Record<string, unknown>,
    ): Observable<T> {
        return super.get<T>(this._parseURL(url), options);
    }

    /**
     * Post request
     * @param url URL endpoint
     * @param body Request body
     * @param options Additional options
     * @returns API response
     */
    public override post<T>(
        url: string,
        body: unknown,
        options?: Record<string, unknown>,
    ): Observable<T> {
        return super.post<T>(this._parseURL(url), body, options);
    }

    /**
     * Parse the URL to generate the complete URL
     * @param url URL endpoint
     * @returns Complete URL
     * @private
     */
    private _parseURL(url: string): string {
        return this._baseUrl + (url.startsWith("/") ? url.substring(1) : url);
    }
}
