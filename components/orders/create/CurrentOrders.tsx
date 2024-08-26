// "use client";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { Input } from "../../ui/input";
import { Orders } from "@/components/data/CurrentOrders";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Beer, ChevronDown, ChevronUp, LayoutGrid, StickyNote, Utensils } from "lucide-react";
import NotesModal from "./NotesModal";
import Pagination from "./Pagination";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const perPageData = 3;

const changeTextColor = (id: number, nodeType: string) => {
    const node = document.getElementById(`${nodeType}-${id}`);
    node?.classList.add('text-warning');
};


const CurrentOrders = ({ currentOrders, additionalItems }: { currentOrders: Orders[], additionalItems: Orders[]; }) => {
    const [currentOrderProducts, setCurrentOrderProducts] = useState<Orders[]>(currentOrders);
    const [additionalItemsProducts, setAdditionalItemsProducts] = useState<Orders[]>(additionalItems);
    const [searchedData, setSearchedData] = useState<Orders[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [modalId, setModalId] = useState<number>();

    const renderCategories = (elm: Orders) => {
        return (
            <div className="px-5 py-4 flex flex-col gap-6 category-container">
                {elm.products.slice((page - 1) * perPageData, page * perPageData).map((product, index) =>
                    <React.Fragment key={index}>
                        <div className="border rounded-lg justify-between flex-col category-mobile">
                            <div className="flex w-full px-6 flex-wrap gap-6 flex-col py-3 overflow-x-auto no-scrollbar">
                                <h5 className="text-lg shrink-0" title={product.name}>
                                    <span className="mr-4 underline underline-offset-8 mb-2 whitespace-nowrap">Product:</span>
                                    <span className="text-lg whitespace-nowrap">{product.name}</span>
                                </h5>
                                <span className="text-lg shrink-0">
                                    <span className="mr-4 underline underline-offset-8 mb-2 whitespace-nowrap">Price:</span>
                                    <span className="text-lg whitespace-nowrap">{`$${product.price}`}</span>
                                </span>
                                <span id={`mob-qty-${product.id}`} className="text-lg shrink-0">
                                    <span className="mr-4 underline underline-offset-8 mb-2 whitespace-nowrap">OnHand Qty.:</span>
                                    <span className="text-lg whitespace-nowrap">{`${product.count} Packs`}</span>
                                </span>
                                <div className="text-lg flex shrink-0 items-center">
                                    <span className="mr-4 underline underline-offset-8 mb-2 whitespace-nowrap">Quantity:</span>
                                    <Input type="number" value={product.count} className="text-center rounded-none" style={{ width: "80px", height: "auto", borderBottomColor: "inherit", borderColor: 'inherit', paddingLeft: '0.25rem', paddingRight: '0.25rem' }} onChange={(e) => updateCount(e, "currentOrders", product.id, elm.id, 'mob-qty')} />
                                    <div className="flex flex-col">
                                        <ChevronUp className="cursor-pointer" onClick={() => addProduct("currentOrders", product.id, elm.id, 'mob-qty')} />
                                        <ChevronDown className="cursor-pointer" onClick={() => removeProduct("currentOrders", product.id, elm.id, 'mob-qty')} />
                                    </div>
                                </div>
                                <span className="text-lg shrink-0" title={`$${product.count * parseFloat(product.price)}`}>
                                    <span className="mr-4 underline underline-offset-8 mb-2 whitespace-nowrap">Cost:</span>
                                    <span className="text-lg whitespace-nowrap">{`$${product.count * parseFloat(product.price)}`}</span>
                                </span>
                            </div>
                            <div className="flex border-0">
                                <Button className="bg-slate-900 text-white hover:bg-slate-900 active:bg-slate-900 focus:bg-slate-900 w-full" style={{
                                    height: "auto", borderTopLeftRadius: "0", borderTopRightRadius: "0"
                                }}
                                    data-te-toggle="modal"
                                    data-te-target={`#notes`}
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                    onClick={() => setModalId(product.id)}>
                                    <PencilSquareIcon className="h-5 text-white" />
                                </Button>
                            </div>
                        </div>
                        <div className="border rounded-lg justify-between category-lg">
                            <div className="flex justify-between items-center w-full px-6 flex-nowrap overflow-x-auto gap-6 no-scrollbar">
                                <h5 className="text-lg shrink-0 w-1/4 truncate" title={product.name}>{product.name}</h5>
                                <span className="text-lg shrink-0 w-24">{`$${product.price}`}</span>
                                <span id={`qty-${product.id}`} className="text-lg shrink-0 w-24">{`${product.count} Packs`}</span>
                                <div className="flex shrink-0 w-32">
                                    <Input type="number" value={product.count} className="text-center border-t-0 rounded-none boeder-b-0" style={{ width: "80px", height: "auto", borderBottom: "none", borderColor: 'inherit', paddingLeft: '0.25rem', paddingRight: '0.25rem' }} onChange={(e) => updateCount(e, "currentOrders", product.id, elm.id, 'qty')} />
                                    <div className="flex flex-col">
                                        <ChevronUp className="cursor-pointer" onClick={() => addProduct("currentOrders", product.id, elm.id, 'qty')} />
                                        <ChevronDown className="cursor-pointer" onClick={() => removeProduct("currentOrders", product.id, elm.id, 'qty')} />
                                    </div>
                                </div>
                                <span className="text-lg shrink-0 w-24 truncate" title={`$${product.count * parseFloat(product.price)}`}>{`$${product.count * parseFloat(product.price)}`}</span>
                            </div>
                            <div className="flex justify-end border border-0">
                                <Button className="bg-slate-900 text-white hover:bg-slate-900 active:bg-slate-900 focus:bg-slate-900" style={{
                                    height: "auto", borderTopLeftRadius: "0", borderBottomLeftRadius: "0"
                                }}
                                    data-te-toggle="modal"
                                    data-te-target={`#notes`}
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                    onClick={() => setModalId(product.id)}>
                                    <PencilSquareIcon className="h-5 text-white" />
                                </Button>
                            </div>
                        </div>
                    </React.Fragment>
                )}
                <Pagination page={page} setPage={setPage} dataLength={elm.products.length} perPageData={perPageData} />
            </div>
        );
    };

    useEffect(() => {
        const data = {
            currentOrders: currentOrderProducts, additionalItems: additionalItemsProducts
        };
        localStorage.setItem("products", JSON.stringify(data));
    }, [currentOrderProducts, additionalItemsProducts]);

    useEffect(() => {
        if (searchValue) {
            let data = additionalItemsProducts.map(elm => elm.products.filter(elm => elm.name.toLowerCase().includes(searchValue)).length > 0 ? { ...elm, products: elm.products.filter(elm => elm.name.toLowerCase().includes(searchValue)) } : false).filter(elm => elm).flat(1);
            setSearchedData(data as Orders[]);
        }
    }, [additionalItemsProducts]);

    const addProduct = (type: string, productId: number, categoryId: number, nodeType: string) => {
        let productList = [];
        setTimeout(() => {
            changeTextColor(productId, nodeType);
        }, 100);

        if (type === 'additionalItems') {
            productList.push(...additionalItemsProducts);
        } else if (type === "currentOrders") {
            productList.push(...currentOrderProducts);
        } else {
            return false;
        }
        let productToAdd = productList.map(elm => {
            if (elm.id === categoryId) {
                return {
                    ...elm,
                    products: elm.products.map(elmt => {
                        if (elmt.id === productId) {
                            return {
                                ...elmt,
                                count: elmt.count + 1
                            };
                        } else {
                            return elmt;
                        }
                    })
                };
            } else {
                return elm;
            }
        });
        if (type === 'additionalItems') {
            setAdditionalItemsProducts(productToAdd);
        } else if (type === "currentOrders") {
            setCurrentOrderProducts(productToAdd);
        }
    };

    const removeProduct = (type: string, productId: number, categoryId: number, nodeType: string) => {
        let productList = [];
        changeTextColor(productId, nodeType);

        if (type === 'additionalItems') {
            productList.push(...additionalItemsProducts);
        } else if (type === "currentOrders") {
            productList.push(...currentOrderProducts);
        } else {
            return false;
        }
        let productToAdd = productList.map(elm => {
            if (elm.id === categoryId) {
                return {
                    ...elm,
                    products: elm.products.map(elmt => {
                        if (elmt.id === productId && elmt.count > 0) {
                            return {
                                ...elmt,
                                count: elmt.count - 1
                            };
                        } else {
                            return elmt;
                        }
                    })
                };
            } else {
                return elm;
            }
        });
        if (type === 'additionalItems') {
            setAdditionalItemsProducts(productToAdd);
        } else if (type === "currentOrders") {
            setCurrentOrderProducts(productToAdd);
        }
    };

    const updateCount = (e: ChangeEvent, type: string, productId: number, categoryId: number, nodeType: string) => {
        let productList = [];
        setTimeout(() => {
            changeTextColor(productId, nodeType);
        }, 100);
        
        if (type === 'additionalItems') {
            productList.push(...additionalItemsProducts);
        } else if (type === "currentOrders") {
            productList.push(...currentOrderProducts);
        } else {
            return false;
        }

        let productToAdd = productList.map(elm => {
            if (elm.id === categoryId) {
                return {
                    ...elm,
                    products: elm.products.map(elmt => {
                        if (elmt.id === productId) {
                            return {
                                ...elmt,
                                count: Number((e.target as HTMLInputElement).value)
                            };
                        } else {
                            return elmt;
                        }
                    })
                };
            } else {
                return elm;
            }
        });
        if (type === 'additionalItems') {
            setAdditionalItemsProducts(productToAdd);
        } else if (type === "currentOrders") {
            setCurrentOrderProducts(productToAdd);
        }
    };

    const handleSearch = () => {
        let value = ((document.querySelector('#searchInput') as HTMLInputElement).value || '');
        value = value.toLowerCase().trim();
        if (!value && searchedData.length === 0) {
            return false;
        } else if ((!value && searchedData.length > 0) || (!value && searchValue && searchedData.length === 0)) {
            setSearchValue('');
            setSearchedData([]);
            return false;
        }
        setSearchValue(value);
        let data = additionalItemsProducts.map(elm => elm.products.filter(elm => elm.name.toLowerCase().includes(value)).length > 0 ? { ...elm, products: elm.products.filter(elm => elm.name.toLowerCase().includes(value)) } : false).filter(elm => elm).flat(1);
        setSearchedData(data as Orders[]);
    };

    return (
        <Card className="rounded-lg">
            <CardHeader className="underline underline-offset-8">Product Catalogs</CardHeader>
            <CardContent>
                <div id="currentOrders">
                    <div className="py-4 category-lg flex-col gap-6">
                        <div className="border rounded-lg px-5 bg-slate-900">
                            <div className="flex justify-between">
                                <div className="rounded-l flex justify-between items-center py-2 w-full px-6 flex-nowrap overflow-x-auto gap-6 no-scrollbar bg-slate-900">
                                    <h5 className="text-lg text-white shrink-0 w-1/4 truncate" title="Product Name">Product</h5>
                                    <span className="text-lg text-white shrink-0 w-24">Price</span>
                                    <span className="text-lg text-white shrink-0">OnHand Qty.</span>
                                    <div className="text-lg text-white flex shrink-0 w-32">
                                        Quantity
                                    </div>
                                    <span className="text-lg text-white shrink-0 w-24 truncate" title={"Cost"}>Qty. Cost</span>
                                </div>
                                <div className="flex justify-end border border-0">
                                    <Button className=" text-lg font-light pr-0 bg-slate-900 text-white hover:bg-slate-900 active:bg-slate-900 focus:bg-slate-900" style={{
                                        height: "auto", borderTopLeftRadius: "0", borderBottomLeftRadius: "0"
                                    }}>
                                        Notes
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {currentOrderProducts.map((elm, index) =>
                        <div
                            className="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800" key={index}>
                            <h2 className="mb-0" id={`flush-heading-${index}`}>
                                <button
                                    onClick={() => setPage(1)}
                                    className="group relative flex w-full items-center rounded-none border-0 bg-white px-5 py-4 text-left text-xl font-normal text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                                    type="button"
                                    data-te-collapse-init
                                    data-te-target={`#flush-collapse-${index}`}
                                    aria-expanded="false"
                                    aria-controls={`flush-collapse-${index}`}>
                                    {elm.category === "Food Category" ? <Utensils className="mr-4" /> : elm.category === "Beverage Categories" ? <Beer className="mr-4" /> : elm.category === "Tableware and Serving Supplies" ? <LayoutGrid className="mr-4" /> : null}{elm.category}
                                    <span
                                        className="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
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
                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </span>
                                </button>
                            </h2>
                            {index === 0 ?
                                <div
                                    id={`flush-collapse-${index}`}
                                    className={`!visible border-0`}
                                    data-te-collapse-item
                                    data-te-collapse-show
                                    aria-labelledby={`flush-heading-${index}`}
                                    data-te-parent="#currentOrders">
                                    {renderCategories(elm)}
                                </div>
                                :
                                <div
                                    id={`flush-collapse-${index}`}
                                    className={`!visible border-0 hidden`}
                                    data-te-collapse-item
                                    aria-labelledby={`flush-heading-${index}`}
                                    data-te-parent="#currentOrders">
                                    {renderCategories(elm)}
                                </div>
                            }
                        </div>
                    )}
                </div>
            </CardContent>
            <CardHeader className="my-3 flex gap-6 flex-col md:flex-row flex-1 items-center">
                <h3 className="shrink-0">Add More Items:</h3>
                <Input id="searchInput" type="search" style={{ maxWidth: '300px' }} />
                <Button className="bg-slate-900 text-white hover:bg-slate-900 active:bg-slate-900 focus:bg-slate-900 shrink-0" onClick={handleSearch}>Search</Button>
            </CardHeader>
            <CardContent>
                {(additionalItemsProducts.map(elm => elm.products.filter(item => item.count > 0).length > 0 ? { ...elm, products: elm.products.filter(item => item.count > 0) } : false).filter(elm => elm) as Orders[]).map((elm, index) =>
                    <React.Fragment key={index}>
                        <h2 className="my-4 text-xl font-normal">{elm.category === "Food Category" ? <Utensils className="mr-4 inline" /> : elm.category === "Beverage Categories" ? <Beer className="mr-4 inline" /> : elm.category === "Tableware and Serving Supplies" ? <LayoutGrid className="mr-4 inline" /> : null}{elm.category}</h2>
                        <div className="px-5 py-4 flex flex-col gap-6 border border-l-0 border-r-0">
                            {elm.products.map((product, index) =>
                                <React.Fragment key={index}>
                                    <div className="border rounded-lg category-lg justify-between">
                                        <div className="flex justify-between items-center w-full px-6 flex-nowrap overflow-x-auto gap-6 no-scrollbar">
                                            <h5 className="text-lg shrink-0 w-1/4 truncate" title={product.name}>{product.name}</h5>
                                            <span className="text-lg shrink-0 w-24">{`$${product.price}`}</span>
                                            <span id={`search-add-qty-${product.id}`} className="text-lg shrink-0 w-24">{`${product.count} Packs`}</span>
                                            <div className="flex shrink-0 w-32">
                                                <Input type="number" value={product.count} className="text-center border-t-0 rounded-none boeder-b-0" style={{ width: "80px", height: "auto", borderBottom: "none", borderColor: 'inherit', paddingLeft: '0.25rem', paddingRight: '0.25rem' }} onChange={(e) => updateCount(e, "additionalItems", product.id, elm.id, 'search-add-qty')} />
                                                <div className="flex flex-col">
                                                    <ChevronUp className="cursor-pointer" onClick={() => addProduct("additionalItems", product.id, elm.id, 'search-add-qty')} />
                                                    <ChevronDown className="cursor-pointer" onClick={() => removeProduct("additionalItems", product.id, elm.id, 'search-add-qty')} />
                                                </div>
                                            </div>
                                            <span className="text-lg shrink-0 w-24 truncate" title={`$${product.count * parseFloat(product.price)}`}>{`$${product.count * parseFloat(product.price)}`}</span>
                                        </div>
                                        <div className="flex justify-end border border-0">
                                            <Button className="bg-slate-900 text-white hover:bg-slate-900 active:bg-slate-900 focus:bg-slate-900" style={{
                                                height: "auto", borderTopLeftRadius: "0", borderBottomLeftRadius: "0"
                                            }}
                                                data-te-toggle="modal"
                                                data-te-target={`#notes`}
                                                data-te-ripple-init
                                                data-te-ripple-color="light">
                                                <PencilSquareIcon className="h-5 text-white" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="border rounded-lg justify-between flex-col category-mobile">
                                        <div className="flex w-full px-6 flex-wrap gap-6 flex-col py-3 overflow-x-auto no-scrollbar">
                                            <h5 className="text-lg shrink-0" title={product.name}>
                                                <span className="mr-4 underline underline-offset-8 mb-2 whitespace-nowrap">Product:</span>
                                                <span className="text-lg whitespace-nowrap">{product.name}</span>
                                            </h5>
                                            <span className="text-lg shrink-0">
                                                <span className="mr-4 underline underline-offset-8 mb-2 whitespace-nowrap">Price:</span>
                                                <span className="text-lg whitespace-nowrap">{`$${product.price}`}</span>
                                            </span>
                                            <span id={`search-add-mob-qty-${product.id}`} className="text-lg shrink-0">
                                                <span className="mr-4 underline underline-offset-8 mb-2 whitespace-nowrap">OnHand Qty.:</span>
                                                <span className="text-lg whitespace-nowrap">{`${product.count} Packs`}</span>
                                            </span>
                                            <div className="text-lg flex shrink-0 items-center">
                                                <span className="mr-4 underline underline-offset-8 mb-2 whitespace-nowrap">Quantity:</span>
                                                <Input type="number" value={product.count} className="text-center rounded-none" style={{ width: "80px", height: "auto", borderBottomColor: "inherit", borderColor: 'inherit', paddingLeft: '0.25rem', paddingRight: '0.25rem' }} onChange={(e) => updateCount(e, "currentOrders", product.id, elm.id, 'search-add-mob-qty')} />
                                                <div className="flex flex-col">
                                                    <ChevronUp className="cursor-pointer" onClick={() => addProduct("currentOrders", product.id, elm.id, 'search-add-mob-qty')} />
                                                    <ChevronDown className="cursor-pointer" onClick={() => removeProduct("currentOrders", product.id, elm.id, 'search-add-mob-qty')} />
                                                </div>
                                            </div>
                                            <span className="text-lg shrink-0" title={`$${product.count * parseFloat(product.price)}`}>
                                                <span className="mr-4 underline underline-offset-8 mb-2 whitespace-nowrap">Cost:</span>
                                                <span className="text-lg whitespace-nowrap">{`$${product.count * parseFloat(product.price)}`}</span>
                                            </span>
                                        </div>
                                        <div className="flex border-0">
                                            <Button className="bg-slate-900 text-white hover:bg-slate-900 active:bg-slate-900 focus:bg-slate-900 w-full" style={{
                                                height: "auto", borderTopLeftRadius: "0", borderTopRightRadius: "0"
                                            }}
                                                data-te-toggle="modal"
                                                data-te-target={`#notes`}
                                                data-te-ripple-init
                                                data-te-ripple-color="light"
                                                onClick={() => setModalId(product.id)}>
                                                <PencilSquareIcon className="h-5 text-white" />
                                            </Button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                    </React.Fragment>
                )}
                {searchedData.length > 0 ? (searchedData.map(elm => elm.products.filter(item => item.count === 0).length > 0 ? { ...elm, products: elm.products.filter(item => item.count === 0) } : false).filter(elm => elm) as Orders[]).map((elm, index) =>
                    <React.Fragment key={index}>
                        <h2 className="my-4 text-xl font-normal">{elm.category === "Food Category" ? <Utensils className="mr-4 inline" /> : elm.category === "Beverage Categories" ? <Beer className="mr-4 inline" /> : elm.category === "Tableware and Serving Supplies" ? <LayoutGrid className="mr-4 inline" /> : null}{elm.category}</h2>
                        <div className="px-5 py-4 flex flex-col gap-6 border border-l-0 border-r-0">
                            {elm.products.map((product, index) =>
                                <React.Fragment key={index}>
                                    <div className="border rounded-lg category-lg justify-between" >
                                        <div className="flex justify-between items-center w-full px-6 flex-nowrap overflow-x-auto gap-6 no-scrollbar">
                                            <h5 className="text-lg shrink-0 w-1/4 truncate" title={product.name}>{product.name}</h5>
                                            <span className="text-lg shrink-0 w-24">{`$${product.price}`}</span>
                                            <span id={`search-qty-${product.id}`} className="text-lg shrink-0 w-24">{`${product.count} Packs`}</span>
                                            <div className="flex shrink-0 w-32">
                                                <Input type="number" value={product.count} className="text-center border-t-0 rounded-none boeder-b-0" style={{ width: "80px", height: "auto", borderBottom: "none", borderColor: 'inherit', paddingLeft: '0.25rem', paddingRight: '0.25rem' }} onChange={(e) => updateCount(e, "additionalItems", product.id, elm.id, 'search-add-qty')} />
                                                <div className="flex flex-col">
                                                    <ChevronUp className="cursor-pointer" onClick={() => addProduct("additionalItems", product.id, elm.id, 'search-add-qty')} />
                                                    <ChevronDown className="cursor-pointer" onClick={() => removeProduct("additionalItems", product.id, elm.id, 'search-add-qty')} />
                                                </div>
                                            </div>
                                            <span className="text-lg shrink-0 w-24 truncate" title={`$${product.count * parseFloat(product.price)}`}>{`$${product.count * parseFloat(product.price)}`}</span>
                                        </div>
                                        <div className="flex justify-end border border-0">
                                            <Button className="bg-slate-900 text-white hover:bg-slate-900 active:bg-slate-900 focus:bg-slate-900" style={{
                                                height: "auto", borderTopLeftRadius: "0", borderBottomLeftRadius: "0"
                                            }}
                                                data-te-toggle="modal"
                                                data-te-target={`#notes`}
                                                data-te-ripple-init
                                                data-te-ripple-color="light">
                                                <PencilSquareIcon className="h-5 text-white" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="border rounded-lg justify-between flex-col category-mobile">
                                        <div className="flex w-full px-6 flex-wrap gap-6 flex-col py-3 overflow-x-auto no-scrollbar">
                                            <h5 className="text-lg shrink-0" title={product.name}>
                                                <span className="mr-4 underline underline-offset-8 mb-2 whitespace-nowrap">Product:</span>
                                                <span className="text-lg whitespace-nowrap">{product.name}</span>
                                            </h5>
                                            <span className="text-lg shrink-0">
                                                <span className="mr-4 underline underline-offset-8 mb-2 whitespace-nowrap">Price:</span>
                                                <span className="text-lg whitespace-nowrap">{`$${product.price}`}</span>
                                            </span>
                                            <span id={`search-mob-qty-${product.id}`} className="text-lg shrink-0">
                                                <span className="mr-4 underline underline-offset-8 mb-2 whitespace-nowrap">OnHand Qty.:</span>
                                                <span className="text-lg whitespace-nowrap">{`${product.count} Packs`}</span>
                                            </span>
                                            <div className="text-lg flex shrink-0 items-center">
                                                <span className="mr-4 underline underline-offset-8 mb-2 whitespace-nowrap">Quantity:</span>
                                                <Input type="number" value={product.count} className="text-center rounded-none" style={{ width: "80px", height: "auto", borderBottomColor: "inherit", borderColor: 'inherit', paddingLeft: '0.25rem', paddingRight: '0.25rem' }} onChange={(e) => updateCount(e, "currentOrders", product.id, elm.id, 'search-add-mob-qty')} />
                                                <div className="flex flex-col">
                                                    <ChevronUp className="cursor-pointer" onClick={() => addProduct("currentOrders", product.id, elm.id, 'search-add-mob-qty')} />
                                                    <ChevronDown className="cursor-pointer" onClick={() => removeProduct("currentOrders", product.id, elm.id, 'search-add-mob-qty')} />
                                                </div>
                                            </div>
                                            <span className="text-lg shrink-0" title={`$${product.count * parseFloat(product.price)}`}>
                                                <span className="mr-4 underline underline-offset-8 mb-2 whitespace-nowrap">Cost:</span>
                                                <span className="text-lg whitespace-nowrap">{`$${product.count * parseFloat(product.price)}`}</span>
                                            </span>
                                        </div>
                                        <div className="flex border-0">
                                            <Button className="bg-slate-900 text-white hover:bg-slate-900 active:bg-slate-900 focus:bg-slate-900 w-full" style={{
                                                height: "auto", borderTopLeftRadius: "0", borderTopRightRadius: "0"
                                            }}
                                                data-te-toggle="modal"
                                                data-te-target={`#notes`}
                                                data-te-ripple-init
                                                data-te-ripple-color="light"
                                                onClick={() => setModalId(product.id)}>
                                                <PencilSquareIcon className="h-5 text-white" />
                                            </Button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                    </React.Fragment>
                ) :
                    searchValue ?
                        <h3 className="flex justify-center items-center text-sm mt-4">{`No products available for "${searchValue}"`}</h3>
                        :
                        null
                }
            </CardContent>
            <CardFooter className="pt-6">
                <div className="flex justify-end w-full">
                    <Link href="preview">
                        <Button className="bg-slate-900 text-white hover:bg-slate-900 active:bg-slate-900 focus:bg-slate-900">
                            Preview Order
                        </Button>
                    </Link>
                </div>
            </CardFooter>
            <NotesModal id={modalId as number} setModalId={setModalId} />
        </Card>
    );
};

export default CurrentOrders;
