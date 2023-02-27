import State from '../states/State';

export type StartTransaction = () => void;
export type FinishTransaction = () => void;
export type StateSpan = (state: State) => void;

interface TransactionController {
  onStartTransaction(start: StartTransaction): void;
  onFinishTransaction(finish: FinishTransaction): void;
}

export default TransactionController;
