import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "./ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { useState, useRef, useCallback } from "react";
import { Skeleton } from "./ui/skeleton";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const SearchDish = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOptions = useCallback(async (searchTerm) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/v1/search?q=${searchTerm}`);
      const formattedOptions = response.data.map((dish) => ({
        value: dish.id,
        label: dish.name,
        ingredients: JSON.parse(dish.ingredients),
        state: dish.state,
        region: dish.region,
      }));
      setOptions(formattedOptions);
      console.log("options", formattedOptions);
    } catch (err) {
      setError("Failed to load results");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      const input = inputRef.current;
      if (!input) return;

      if (!isOpen) setOpen(true);

      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find(
          (option) => option.label === input.value
        );
        if (optionToSelect) {
          setSelected(optionToSelect);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, options]
  );

  const handleInputChange = useCallback(
    (input) => {
      setInputValue(input);
      if (input.trim() !== "") {
        fetchOptions(input);
      } else {
        setOptions([]);
      }
    },
    [fetchOptions]
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    setInputValue(selected?.label);
  }, [selected]);

  const handleSelectOption = useCallback((selectedOption) => {
    setInputValue(selectedOption.label);
    setSelected(selectedOption);
    navigate(`/dish/${selectedOption.value}`);
    setTimeout(() => {
      inputRef?.current?.blur();
    }, 0);
  }, []);

  return (
    <CommandPrimitive onKeyDown={handleKeyDown} filter={() => 1}>
      <div>
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={ handleInputChange}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          placeholder="Search"
          className="text-base"
        />
      </div>
      <div className="relative mt-1">
        <div
          className={cn(
            "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-white outline-none",
            isOpen ? "block" : "hidden"
          )}
        >
          <CommandList className="rounded-lg ring-1 ring-slate-200">
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className="p-1">
                  <Skeleton className="h-8 w-full" />
                </div>
              </CommandPrimitive.Loading>
            ) : null}
            {!isLoading && options.length > 0 ? (
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected?.value === option.value;
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={cn(
                        "flex w-full items-center gap-2",
                        !isSelected ? "pl-8" : null
                      )}
                    >
                      {isSelected ? <Check className="w-4" /> : null}
                      <div>
                        <div>{option.label}</div>
                        <div className="text-xs text-gray-500">
                          {option.state}, {option.region}
                        </div>
                        <div className="text-xs text-gray-500">
                          Ingredients: {option.ingredients.join(", ")}
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
            {!isLoading && options.length === 0 && !error ? (
              <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                No results
              </CommandPrimitive.Empty>
            ) : null}
            {error && (
              <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                {error}
              </CommandPrimitive.Empty>
            )}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};

export default SearchDish;
