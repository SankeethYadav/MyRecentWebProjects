
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useId, useState } from "react";

const NotesModal = ({ id, setModalId }: { id: number; setModalId: Dispatch<SetStateAction<number | undefined>>; }) => {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if (id) {
            const data = localStorage.getItem(`notes-${id}`);
            if (data) {
                setMessage(data);
            }
        }
    }, [id]);

    const addNote = (e: React.MouseEvent<HTMLButtonElement>) => {
        localStorage.setItem(`notes-${id}`, message);
        setMessage('');
        setModalId(0);
    };

    const handleNoteUpdate = (e: ChangeEvent) => {
        let note = (e.target as HTMLInputElement).value;
        setMessage(note);
    };

    return (
        <div
            data-te-modal-init
            className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
            id={`notes`}
            tabIndex={-1}
            data-te-backdrop="static"
            data-te-keyboard="false"
            aria-labelledby="notesModalCenterTitle"
            aria-modal="true"
            role="dialog">
            <div
                data-te-modal-dialog-ref
                className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
                <div
                    className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600 mx-6 md:mx-0">
                    <div
                        className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                        <h5
                            className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                            id="exampleModalCenterTitle">
                            Notes
                        </h5>
                        <button
                            type="button"
                            className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                            data-te-modal-dismiss
                            aria-label="Close"
                            onClick={() => { setMessage(''); setModalId(0); }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="relative p-4">
                        <h3 className="text-lg mb-3">Add Note</h3>
                        <Textarea value={message} onChange={(e) => handleNoteUpdate(e)} placeholder="Type your message here." />
                    </div>

                    <div
                        className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                        <button
                            type="button"
                            className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                            data-te-modal-dismiss
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            onClick={() => { setMessage(''); setModalId(0); }}>
                            Close
                        </button>
                        <button
                            type="button"
                            className="ml-1 inline-block rounded bg-primary-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
                            data-te-modal-dismiss
                            data-te-ripple-init
                            data-te-ripple-color="light" onClick={(e) => addNote(e)}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotesModal;
