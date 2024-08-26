import React, { Dispatch, SetStateAction } from "react";

const AlertNotification = ({ type, messages, show }: { type: string, messages: string[], show: Dispatch<SetStateAction<boolean>>; }) => {

    return (
        <div
            className={`mb-3 hidden w-full items-center rounded-lg bg-${type}-100 px-6 py-2 text-base justify-center text-${type}-800 data-[te-alert-show]:inline-flex`}
            role="alert"
            data-te-alert-init
            data-te-alert-show>
            <div
                id="carouselExampleCaptions"
                className="scroll-smooth relative w-full"
                data-te-carousel-init
                data-te-ride="carousel">
                <div
                    className="scroll-smooth relative text-center w-full overflow-hidden after:clear-both after:block after:content-['']">
                    {messages.map((message, index) =>
                        <React.Fragment key={index}>
                            {index === 0 ?
                                <div
                                    className={`relative float-left -mr-[100%] w-full transition-transform duration-[1000ms] ease-in-out motion-reduce:transition-none`}
                                    data-te-carousel-active
                                    data-te-carousel-item
                                    key={index}
                                    style={{ backfaceVisibility: "hidden" }}>
                                    <span className="text-center w-3/4" dangerouslySetInnerHTML={{ __html: message }} />
                                </div>
                                :
                                <div
                                    className={`relative float-left -mr-[100%] w-full transition-transform duration-[1000ms] ease-in-out motion-reduce:transition-none hidden`}
                                    data-te-carousel-item
                                    key={index}
                                    style={{ backfaceVisibility: "hidden" }}>
                                    <span className="text-center w-3/4" dangerouslySetInnerHTML={{ __html: message }} />
                                </div>
                            }
                        </React.Fragment>
                    )}
                </div>

                <button
                    className={`${messages.length <= 1 ? 'hidden' : ''} left-right-arrows absolute bottom-0 left-0 top-2 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none`}
                    type="button"
                    data-te-target="#carouselExampleCaptions"
                    data-te-slide="prev">
                    <span className="inline-block h-8 w-8">
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
                                d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </span>
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Previous</span
                    >
                </button>
                <button
                    className={`${messages.length <= 1 ? 'hidden' : ''} left-right-arrows absolute bottom-0 right-0 top-2 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none`}
                    type="button"
                    data-te-target="#carouselExampleCaptions"
                    data-te-slide="next">
                    <span className="inline-block h-8 w-8">
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
                                d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </span>
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Next</span
                    >
                </button>
            </div>
            <button
                type="button"
                className={`ml-auto box-content rounded-none border-none p-1 text-${type}-900 opacity-50 hover:text-${type}-900 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none`}
                onClick={() => show(false)}
                aria-label="Close">
                <span
                    className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6">
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd" />
                    </svg>
                </span>
            </button>
        </div>
    );
};

export default AlertNotification;
