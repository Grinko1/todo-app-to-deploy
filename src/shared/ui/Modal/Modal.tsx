import { ReactNode } from "react";
import cls from "./Modal.module.scss";
import { Mods, classNames } from "shared/lib/classNames/classNames";
import { Portal } from "../Portal/Portal";
import { useModal } from "shared/lib/hooks/useModal";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
  const { className, children, isOpen, onClose, lazy } = props;

  const { isClosing, isMounted, close } = useModal({
    onClose,
    isOpen,
    animationDelay: ANIMATION_DELAY,
  });

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        className={classNames(cls.Modal, mods, [
          className,
          "modalNew",
          "app_modal",
        ])}
      >
        <div onClick={close} className={cls.overlay} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
