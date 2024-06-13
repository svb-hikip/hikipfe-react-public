import { Dialog, Transition, TransitionChild, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

export default function ModalTransitionWrapper({ isOpen, onClose, children, actionButtons }) {
  return (
    <Transition show={isOpen}>
      <Dialog className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-gray-200 bg-opacity-75" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <TransitionChild
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="p-4">
                      <button onClick={onClose} className="inline-block text-gray-500 hover:text-gray-700">
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>
                    {children}
                    <div className="flex justify-end space-x-3 p-4 border-t">
                      {actionButtons.map((button, index) => (
                        <button
                          key={index}
                          className={`px-4 py-2 text-sm font-medium ${button.className}`}
                          onClick={button.onClick}
                        >
                          {button.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

ModalTransitionWrapper.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    actionButtons: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      className: PropTypes.string
    }))
  };
