import { ToastOptions as IonicToastOptions } from '@ionic/core';

export interface ToastOptions extends IonicToastOptions {
  message: string;
}
