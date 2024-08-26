"use client";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    Formik,
    Field,
    Form,
  
  } from "formik";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import axios from "axios";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import { addDays, format } from "date-fns";
import OrderReport from './OrderTable'
import FullBatchWeight from './FullBatchWeightTable'

//Table one

const reports = [
    {
      tray: "385.00",
      stack: "16.04",
      totalBatches: "15.17",
    },
   
  ]
function DashboardTable() {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
      });

  
    return (
        <div>
             <h2 className="text-lg font-medium text-black">Dough Prepare Report</h2>
             <div className="flex justify-center mt-1.5">  
        <Card className="rounded-lg w-full">
          <CardHeader className="text-sm text-black font-bold border-b border-gray-300">
            Filter By
          </CardHeader>
          <CardContent className="pt-5">
            <Formik
              onSubmit={(values) => {
                console.log(values);
                
              }}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="mb-4">
                      <label htmlFor="shipdate" className="text-sm text-black font-normal">
                        Choose Ship Date
                      </label>
                      <div className={cn("grid gap-2")}>
                        <Popover className="bg-white">
                          <PopoverTrigger asChild>
                            <Button
                              id="pickdate"
                              name="pickdate"
                              className={cn(
                                "justify-start text-left font-normal border h-12 rounded-none text-black font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 text-white font-normal" />
                              {date?.from ? (
                                date.to ? (
                                  <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                  </>
                                ) : (
                                  format(date.from, "LLL dd, y")
                                )
                              ) : (
                                <span className="text-black text-sm font-normal">Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              initialFocus
                              mode="range"
                              defaultMonth={date?.from}
                              selected={date}
                              onSelect={setDate}
                              numberOfMonths={2}
                              className="text-black font-normal"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="mb-4">
                    <label htmlFor="budget" className="text-sm text-black font-normal">
                      Machine Capacity
                    </label>
                    <br />
                    <Field
                      type="number"
                      id="budget"
                      name="budget"
                      className="border p-2  w-full text-sm h-12 text-black font-normal"
                      placeholder="Enter mechine capacity"
                    />
                  </div>
                  </div>

                  <div className="flex justify-end w-full mb-5">
                    <Button
                      type="submit"
                      className="bg-blue-600 ml-2 text-white hover:bg-blue-600 active:bg-blue-600 focus:bg-blue-600"
                    >
                      Apply
                    </Button>

                    {/* </Link> */}
                  </div>
                </Form>
              )}
            </Formik>
            <div>
            <Table>
      <TableHeader className="bg-slate-600 text-white">
        <TableRow>
          <TableHead className="text-white font-medium">Total Tray</TableHead>
          <TableHead className="text-white font-medium">24 Stack</TableHead>
          <TableHead className="text-white font-medium">Total Batches</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={reports.report}>
            <TableCell className="font-normal text-black">{report.tray}</TableCell>
            <TableCell className="font-normal text-black">{report.stack}</TableCell>
            <TableCell className="font-normal text-black">{report.totalBatches}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-10">
      <OrderReport />
      </div>
      <div className="mt-10">
        <FullBatchWeight />
      </div>
        </div>
    )
}
export default DashboardTable;