import { useState } from "react";
import { Input } from "../../ui/input";
import { StoreInfo } from "@/components/data/CurrentOrders";
import { DatePicker } from "@/components/ui/datepicker";

const StoreInfo = ({ storeInfo }: { storeInfo: StoreInfo; }) => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <div className="flex gap-12 flex-wrap justify-between lg:overflow-x-auto no-scrollbar p-4 block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div className="shrink-0 flex justify-between flex-col">
                <div>
                    <h4 className="text-lg">Store:</h4>
                    <p className="text-sm my-3">{storeInfo.store}</p>
                </div>
                <div>
                    <h4 className="text-lg">Supplier:</h4>
                    <p className="text-sm">{storeInfo.supplier}</p>
                </div>
            </div>
            <div className="shrink-0 flex justify-between flex-col">
                <div>
                    <h4 className="text-lg">Sales:</h4>
                    <p className="text-sm my-3">
                        <Input type="text" defaultValue={storeInfo.salse} placeholder="2500" className="rounded" />
                    </p>
                </div>
                <div>
                    <h4 className="text-lg">Budget:</h4>
                    <p className="text-sm">{`$${storeInfo.budget}`}</p>
                </div>
            </div>
            <div className="shrink-0 flex justify-between flex-col">
                <div>
                    <h4 className="text-lg">Ship Date:</h4>
                    <p className="text-sm my-3">
                        <DatePicker date={date} setDate={setDate} />
                    </p>
                </div>
                <div>
                    <h4 className="text-lg">Purchase Date:</h4>
                    <p className="text-sm">{storeInfo.purchaseDate}</p>
                </div>
            </div>
        </div>
    );
};

export default StoreInfo;
