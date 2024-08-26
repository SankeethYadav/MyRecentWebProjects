import { Dispatch, SetStateAction } from "react";

const Pagination = ({ page, setPage, dataLength, perPageData }: { page: number, setPage: Dispatch<SetStateAction<number>>, dataLength: number, perPageData: number; }) => {
    return (
        <nav aria-label="Page navigation example">
            <ul className="list-style-none flex justify-end">
                <li>
                    <span
                        className={`${page === 1 ? "pointer-events-none text-neutral-500" : 'text-neutral-600 cursor-pointer'} relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`}
                        onClick={() => setPage(prev => prev > 1 ? prev - 1 : 1)}
                    >Previous</span
                    >
                </li>
                {Array.from({ length: Math.ceil(dataLength / perPageData) }, (_: number, i: number) => i + 1).map((elm, index) =>
                    <li key={index} aria-current={elm === page ? "page" : undefined}>
                        <span
                            className={elm !== page ?
                                "cursor-pointer relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                :
                                "cursor-pointer relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300"}
                                onClick={() => setPage(elm)}
                        >{elm}
                            {elm === page ?
                                <span
                                    className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
                                >(current)</span>
                                : null}
                        </span
                        >
                    </li>
                )}
                <li>
                    <span
                        className={`${page === Math.ceil(dataLength / perPageData) ? "pointer-events-none text-neutral-500" : 'text-neutral-600 cursor-pointer'} relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`}
                        onClick={() => setPage(prev => prev < Math.ceil(dataLength / perPageData) ? prev + 1 : dataLength)}
                    >Next</span
                    >
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
