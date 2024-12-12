import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEventHandler } from 'react'
import Styles from './modal-form.module.css'
import Portal, { createContainer } from './portal/portal'

interface ModalFormProps {
    isVisible: boolean
    modalContainerId: string
    onClose: () => void
    children: React.ReactNode
}

export const ModalForm: React.FC<ModalFormProps> = ({
    isVisible,
    modalContainerId,
    onClose,
    children,
}) => {
    const [isShowModal, setShowModal] = useState(false)
    useEffect(() => {
        createContainer({ id: modalContainerId })
        setShowModal(true)
    }, [])

    const handleClose: MouseEventHandler<HTMLButtonElement> =
        useCallback(() => {
            onClose?.()
        }, [onClose])

    return isShowModal ? (
        <Portal id={modalContainerId}>
            <div className={Styles.wrap}>
                <div className={Styles.content}>
                    <div className={Styles.header}>
                        <button
                            type="button"
                            className={Styles.closeButton}
                            onClick={handleClose}
                        >
                            Х
                        </button>
                    </div>
                    <div className={Styles.middle}>{children}</div>
                </div>
            </div>
        </Portal>
    ) : null
}
