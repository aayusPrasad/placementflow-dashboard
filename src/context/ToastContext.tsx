import { createContext, useContext, useState, type ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info';

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextValue = {
  toast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue>({ toast: () => undefined });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);

  const toast = (message: string, type: ToastType = 'info') => {
    const id = Date.now();

    setItems((current) => [...current, { id, message, type }]);
    window.setTimeout(() => {
      setItems((current) => current.filter((item) => item.id !== id));
    }, 3600);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed right-4 top-4 z-50 space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={`glass rounded-xl px-4 py-3 text-sm shadow-glow ${
              item.type === 'error'
                ? 'border-red-500/40'
                : item.type === 'success'
                  ? 'border-emerald-500/40'
                  : 'border-indigo-500/40'
            }`}
          >
            {item.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}