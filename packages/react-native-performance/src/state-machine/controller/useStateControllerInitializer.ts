import {useEffect, useRef} from 'react';

import {ErrorHandler} from '../../utils';

import StateController, {OnStateChangedListener} from './StateController';
import EnabledStateController from './EnabledStateController';
import DisabledStateController from './DisabledStateController';
import ErrorHandlerStateController from './ErrorHandlerStateController';
import {FinishTransaction, StartTransaction, StateSpan} from './TransactionController';

export default function useStateControllerInitializer({
  enabled,
  onStartTransaction,
  onFinishTransaction,
  onStateSpan,
  errorHandler,
  reportEmitter,
  useRenderTimeouts,
  renderTimeoutMillis,
}: {
  enabled: boolean;
  onStartTransaction: StartTransaction;
  onFinishTransaction: FinishTransaction;
  onStateSpan: StateSpan;
  errorHandler: ErrorHandler;
  reportEmitter: OnStateChangedListener;
  useRenderTimeouts: boolean;
  renderTimeoutMillis: number;
}): StateController {
  const prevStateController = useRef<ErrorHandlerStateController | undefined>(undefined);

  const newStateController = (() => {
    if (prevStateController.current === undefined || enabled !== prevStateController.current.isEnabled) {
      const innerController = enabled
        ? new EnabledStateController(onStartTransaction, onFinishTransaction, onStateSpan)
        : new DisabledStateController();
      return new ErrorHandlerStateController(innerController, errorHandler);
    }

    if (errorHandler !== prevStateController.current.errorHandler) {
      const innerController = prevStateController.current.innerStateController;
      return new ErrorHandlerStateController(innerController, errorHandler);
    }

    return prevStateController.current;
  })();

  if (prevStateController.current === undefined) {
    newStateController.onAppStarted();
  }

  useEffect(() => {
    newStateController.addStateChangedListener(reportEmitter);
    newStateController.configureRenderTimeout(
      useRenderTimeouts
        ? {
            enabled: true,
            onRenderTimeout: errorHandler,
            renderTimeoutMillis,
          }
        : {
            enabled: false,
          },
    );

    return () => {
      newStateController.removeStateChangedListener(reportEmitter);
      newStateController.configureRenderTimeout({enabled: false});
    };
  });

  prevStateController.current = newStateController;
  return newStateController;
}
