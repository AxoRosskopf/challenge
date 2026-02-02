import { 
    Combobox, 
    ComboboxChip, 
    ComboboxChips, 
    ComboboxChipsInput, 
    ComboboxContent,
    ComboboxEmpty, 
    ComboboxItem, 
    ComboboxList, 
    ComboboxValue, 
    useComboboxAnchor 
} from "../ui/combobox";
import React from "react";
import { FilterGroupProps } from "./utils/filters-props";

export const MultiSelectFilter = ({ 
    items, 
    placeholder, 
    label, 
    selectedItems, 
    setSelectedItems 
}: FilterGroupProps ) => {
  const anchor = useComboboxAnchor(); 
  const handleRemove = (e: React.MouseEvent, valueToRemove: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedItems((prev) => prev.filter((item) => item !== valueToRemove));
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium leading-none">{label}</h4>
      <Combobox 
        multiple 
        autoHighlight 
        items={items} 
        value={selectedItems} 
        onValueChange={setSelectedItems}
      >
        <ComboboxChips ref={anchor} className="w-full">
          <ComboboxValue>
            {(values) => (
              <>
                {values.map((value: string) => (
                  <ComboboxChip 
                    key={value} 
                    onClick={(e) => handleRemove(e, value)}
                  >
                    {value}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput placeholder={placeholder} />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        
        <ComboboxContent ref={anchor}>
          <ComboboxEmpty>No se encontraron resultados</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};