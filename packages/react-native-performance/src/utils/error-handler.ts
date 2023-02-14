import React, {useContext} from 'react';

import {PerformanceProfilerError} from '../exceptions';

export type ErrorHandler = (_: PerformanceProfilerError) => void;

const ErrorHandlerContext = React.createContext<ErrorHandler>(() => {});

export const ErrorHandlerContextProvider = ErrorHandlerContext.Provider;

export const useErrorHandler = (): ErrorHandler => {
  const errorHandler = useContext(ErrorHandlerContext);
  return errorHandler;
};
