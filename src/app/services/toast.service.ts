import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '../../interfaces/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  // doc: https://ionicframework.com/docs/api/toast
  constructor(public toastController: ToastController) {}

  async showInfoToast(toastOptions: ToastOptions) {
    this.showToast({ ...toastOptions, color: 'primary' });
  }

  async showSecondInfoToast(toastOptions: ToastOptions) {
    this.showToast({ ...toastOptions, color: 'secondary' });
  }

  async showThirdInfoToast(toastOptions: ToastOptions) {
    this.showToast({ ...toastOptions, color: 'tertiary' });
  }

  async showSuccessToast(toastOptions: ToastOptions) {
    this.showToast({ ...toastOptions, color: 'success' });
  }

  async showWarningToast(toastOptions: ToastOptions) {
    this.showToast({ ...toastOptions, color: 'warning' });
  }

  async showErrorToast(toastOptions: ToastOptions) {
    this.showToast({ ...toastOptions, color: 'danger' });
  }

  async showLightToast(toastOptions: ToastOptions) {
    this.showToast({ ...toastOptions, color: 'light' });
  }

  async showMediumToast(toastOptions: ToastOptions) {
    this.showToast({ ...toastOptions, color: 'medium' });
  }

  async showDarkToast(toastOptions: ToastOptions) {
    this.showToast({ ...toastOptions, color: 'dark' });
  }

  private async showToast(toastOptions: ToastOptions) {
    toastOptions.duration = toastOptions.duration || 2000;
    toastOptions.position = toastOptions.position || 'top';
    const toast = await this.toastController.create(toastOptions);
    toast.present();
  }
}
