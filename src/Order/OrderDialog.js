import React from 'react';
import {
  DialogShadow,
  Dialog,
  DialogContent,
  DialogFooter,
  ConfirmButton
} from '../FoodDialog/FoodDialog';

export function OrderDialog({
  openOrderDialog,
  setOpenOrderDialog,
  setOrders,
  toggleOpen
}) {
  return openOrderDialog ? (
    <>
      <DialogShadow />
      <Dialog>
        <DialogContent>
          <h2>Your Order is on the way!</h2>
          <p>You have been emailed confirmation on your order.</p>
        </DialogContent>
        <DialogFooter>
          <ConfirmButton
            onClick={() => {
              setOrders([]);
              setOpenOrderDialog();
              toggleOpen(false);
            }}
          >
            I'm still hungry
          </ConfirmButton>
        </DialogFooter>
      </Dialog>
    </>
  ) : (
    <div />
  );
}
