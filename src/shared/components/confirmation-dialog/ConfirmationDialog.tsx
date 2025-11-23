import { memo } from "react";
import { Dialog } from "../dialog/Dialog";
import styles from './ConfirmationDialog.module.scss'

interface ConfirmationDialogProps {
    open: boolean,
    onClose: () => void,
    onConfirm: () => void,
}

export const ConfirmationDialog = memo(({open, onClose, onConfirm}: ConfirmationDialogProps) => {

    return (
        <Dialog open={open} title="Confirm" onClose={onClose}>
            <div className={styles['container']}>

            </div>
                <div>
                    Are you sure?
                </div>
                <div className={styles['footer']}>
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onConfirm}>Confirm</button>
                </div>
        </Dialog>
    )
})