import { ToastOptions } from 'ng2-toastr';

export class CustomOption extends ToastOptions {
  newestOnTop = false;
  showCloseButton = true;
  toastLife = 2000;
  enableHTML = true;
}
