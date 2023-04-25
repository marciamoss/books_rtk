import React, { Fragment, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { setBookSliceData } from "../../../store";
import SavedBooksList from "./SavedBooksList";

const SidePanel = ({ hidePanel, userLoggedIn }) => {
  const dispatch = useDispatch();
  let closeButtonRef = useRef(null);
  const { sliderOpen } = useSelector((state) => state.book);
  return (
    <div
      className={`${hidePanel} flex w-30 mr-5 flex-col space-y-2 border-gray-200 p-2`}
    >
      <Transition.Root show={sliderOpen} as={Fragment}>
        <Dialog
          initialFocus={closeButtonRef}
          as="div"
          className="relative z-10"
          onClose={setBookSliceData}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          ref={closeButtonRef}
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() =>
                            dispatch(setBookSliceData({ sliderOpen: false }))
                          }
                        >
                          <span className="sr-only">Close panel</span>
                          <AiOutlineClose
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-yellow-50 py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title
                          className={`${
                            !userLoggedIn
                              ? "text-red-600"
                              : "text-gray-900 underline"
                          } max-[640px]:text-sm text-lg text-center font-bold`}
                        >
                          {userLoggedIn ? "Your Books" : "no valid session"}
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="absolute inset-0 px-4 sm:px-6">
                          <div className="h-fit" aria-hidden="true">
                            {userLoggedIn ? <SavedBooksList /> : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default SidePanel;
