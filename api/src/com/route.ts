/**
 * Route decorator
 * @param message Route message if successful
 * @returns Method decorator
 */
export const Route = (
    message?: string,
): MethodDecorator => {
    return (
        target: unknown,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ): void => {
        const originalMethod = descriptor.value;
        descriptor.value     = async function (...args: unknown[]): Promise<unknown> {
            let result = await originalMethod.apply(this, args);

            if (Object.prototype.hasOwnProperty.call(result, "toJSON")) {
                result = result.toJSON();
            }

            return {
                message: message || "OK",
                data: result,
            };
        };
    };
};
