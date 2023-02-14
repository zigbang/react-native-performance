/**
 * `bug` errors are tied to internal issues and are handled by the library itself.
 *
 * `fatal` errors are thrown when we detect incorrect usage of the library and are passed to `errorHandler` in `PerformanceProfiler`.
 */
export type PerformanceProfilerErrorType = 'fatal' | 'bug';

export default abstract class PerformanceProfilerError {
  readonly message: string;
  readonly type: PerformanceProfilerErrorType;
  abstract readonly name: string;
  abstract readonly destinationScreen: string | undefined;

  constructor(message: string, type: PerformanceProfilerErrorType) {
    this.message = message;
    this.type = type;
    Object.setPrototypeOf(this, PerformanceProfilerError.prototype);
  }
}
