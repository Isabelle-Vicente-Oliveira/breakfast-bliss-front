import { inject, Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ToastComponent } from '../../shared/components/toast/toast';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private overlayRef: OverlayRef | null = null;
    private readonly _overlay = inject(Overlay);

    show(message: string, type: 'success' | 'error' = 'success', duration: number = 3000) {

        if (this.overlayRef) {
            this.close();
        }

        const positionStrategy = this._overlay.position()
            .global()
            .bottom('2rem')
            .right('2rem');

        this.overlayRef = this._overlay.create({
            positionStrategy,
            scrollStrategy: this._overlay.scrollStrategies.noop()
        });

        const toastPortal = new ComponentPortal(ToastComponent);
        const componentRef = this.overlayRef.attach(toastPortal);

        componentRef.instance.data = { message, type };

        setTimeout(() => this.close(), duration);
    }

    private close() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }
}