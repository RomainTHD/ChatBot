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
            return {
                message: message || "OK",
                data: await originalMethod.apply(this, args),
            };
        };
    };
};
