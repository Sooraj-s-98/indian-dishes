
import React from "react";
import { Button } from "@/components/ui/button"
import { ChevronUpIcon, ChevronDownIcon, ChevronsUpDownIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const SortPopover = ({ column, handleSort }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Sort {column}</span>
          <ChevronsUpDownIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 bg-white border border-gray-200 shadow-lg">
        <div className="grid gap-4">
          <Button
            variant="ghost"
            onClick={() => handleSort(column, 'asc')}
            className="justify-start"
          >
            <ChevronUpIcon className="mr-2 h-4 w-4" />
            Ascending
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleSort(column, 'desc')}
            className="justify-start"
          >
            <ChevronDownIcon className="mr-2 h-4 w-4" />
            Descending
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )


  export default SortPopover;