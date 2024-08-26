"use client";

import { Orders } from "@/components/types/Orders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";

interface OrderList {
    id: number;
    name: string;
    price: string;
    category: string;
    count: number;
}

const PreviewPage = () => {
    const [orders, setOrders] = useState<OrderList[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('products') || "{}");
        if (Object.keys(data).length > 0) {
            const products: Orders[] = [...data.currentOrders, ...data.additionalItems];
            const orderedProducts = products.map(elm => elm.products.filter(elmt => elmt.count > 0).length > 0 ? elm.products.map(el => el.count > 0 ? ({ ...el, category: elm.category }) : false).filter(order => order) : false).filter(elm => elm).flat(1);
            
            setOrders(orderedProducts as OrderList[]);

            setTotal((orderedProducts as OrderList[]).reduce((total, item) => total + (item.count*parseFloat(item.price)),0))
        }
    }, []);

    return (
        <Card>
            <CardHeader className="underline underline-offset-8 mb-6">Order Details</CardHeader>
            <CardContent>
                <div className="flex flex-col overflow-x-auto no-scrollbar">
                    <div className="sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-x-auto">
                                <table className="border rounded min-w-full text-left text-sm font-light">
                                    <thead className="rounded bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">#</th>
                                            <th scope="col" className="px-6 py-4">Product</th>
                                            <th scope="col" className="px-6 py-4">Category</th>
                                            <th scope="col" className="px-6 py-4">Price</th>
                                            <th scope="col" className="px-6 py-4">Quantity</th>
                                            <th scope="col" className="px-6 py-4">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.length > 0 ? orders.map((order, index) =>
                                            <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={index}>
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{order.name}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{order.category}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{`${order.price}`}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{order.count}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{`$${parseFloat(order.price) * order.count}`}</td>
                                            </tr>
                                        ): 
                                        <tr>
                                            <td className="py-6 text-center" colSpan={6}>No Products Available</td>
                                        </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-6 flex flex-col gap-4 md:gap-0 md:flex-row">
                <CardTitle className="w-full font-normal">{`Total: $${total}`}</CardTitle>
                <div className="flex justify-center md:justify-end w-full gap-5">
                    <Link href="create">
                        <Button className="bg-slate-900 text-white hover:bg-slate-900 active:bg-slate-900 focus:bg-slate-900">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil me-2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                            Edit Order
                        </Button>
                    </Link>
                    <Link href={{pathname: "list", query: {success: 1}}}>
                        <Button className="bg-slate-900 text-white hover:bg-slate-900 active:bg-slate-900 focus:bg-slate-900">
                            Place Order
                        </Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};

export default PreviewPage;
