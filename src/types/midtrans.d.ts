interface SnapResult {
  order_id: string;
  payment_type?: string;
  transaction_status?: string;
}

interface SnapCallbacks {
  onSuccess: (result: SnapResult) => void;
  onPending: (result: SnapResult) => void;
  onError: (result: SnapResult) => void;
  onClose: () => void;
}

interface SnapInstance {
  pay: (token: string, callbacks: SnapCallbacks) => void;
}

interface Window {
  snap?: SnapInstance;
}
