"use client";

import { createContext, useContext, useState } from "react";
import { AboutModal } from "./AboutModal";

type ModalContextType = {
  openAboutModal: () => void;
  closeAboutModal: () => void;
};

const ModalContext = createContext<ModalContextType>({
  openAboutModal: () => {},
  closeAboutModal: () => {},
});

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const openAboutModal = () => setIsAboutOpen(true);
  const closeAboutModal = () => setIsAboutOpen(false);

  return (
    <ModalContext.Provider value={{ openAboutModal, closeAboutModal }}>
      {children}
      <AboutModal isOpen={isAboutOpen} onClose={closeAboutModal} />
    </ModalContext.Provider>
  );
}