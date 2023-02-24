export type StartTransaction = () => void;
export type FinishTransaction = () => void;

interface TransactionController {
  onStartTransaction(start: StartTransaction): void;
  onFinishTransaction(finish: FinishTransaction): void;
}

export default TransactionController;
