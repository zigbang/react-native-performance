import {Rendered} from '../states';
import State from '../states/State';

export type StartTransaction = (type?: string) => void;
export type FinishTransaction = (type?: string, rendered?: Rendered) => void;
export type StateSpan = (state: State) => void;

interface TransactionController {
  onStartTransaction(start: StartTransaction): void;
  onFinishTransaction(finish: FinishTransaction): void;
}

export default TransactionController;
