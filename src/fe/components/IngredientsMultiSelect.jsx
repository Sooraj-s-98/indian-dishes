import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";



const IngredientsMultiSelect = ({ ingredients , onSelectionChange }) => {
  const inputRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

const handleUnselect = React.useCallback((ingredient) => {
    setSelected((prev) => {
      const newSelected = prev.filter((s) => s.ingredient !== ingredient.ingredient);
      onSelectionChange(newSelected); 
      return newSelected;
    });
  }, [onSelectionChange]);


  const handleKeyDown = React.useCallback((e) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected((prev) => {
            const newSelected = [...prev];
            newSelected.pop();
            onSelectionChange(newSelected); 
            return newSelected;
          });
        }
      }
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, [onSelectionChange]);

  const selectables =  ingredients.filter(
    (ingredient) => !selected.includes(ingredient)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((ingredient) => {
            return (
              <Badge key={ingredient.ingredient} variant="secondary">
                {ingredient.ingredient}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(ingredient);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(ingredient)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select  ingredients..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in bg-white">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((ingredient) => {
                  return (
                    <CommandItem
                      key={ingredient.ingredient}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        setSelected((prev) => {
                          const newSelected = [...prev, ingredient];
                          onSelectionChange(newSelected); 
                          return newSelected;
                        });
                      }}
                      className={"cursor-pointer"}
                    >
                      {ingredient.ingredient}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
};

export default IngredientsMultiSelect;
