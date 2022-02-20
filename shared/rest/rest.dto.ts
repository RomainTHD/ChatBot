/**
 * REST data sent
 */
export interface RestData<T> {
    /**
     * REST message
     */
    message: string;

    /**
     * Data
     */
    data: T;
}
