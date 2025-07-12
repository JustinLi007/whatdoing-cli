import { useState, type ChangeEvent, type MouseEvent } from "react";
import InputTableItem from "./InputTableItem";

type Parameters = {
  title: string;
  retrieve_fn: (input_values: string[]) => void;
}

type InputTableRowItem = {
  id: string;
  value: string;
}

export default function InputTable(params: Parameters) {
  const [rowItems, setRowItems] = useState<InputTableRowItem[]>([]);

  function handleAddBtnOnClick(event: MouseEvent) {
    const n = Array.from({ length: 8 }, () => {
      return Math.random().toString(36).charAt(Math.floor(Math.random() * 36));
    }).join("");

    const newRowItem: InputTableRowItem = {
      id: n,
      value: "",
    }
    const rowItemsCopy = rowItems.slice();
    const newRowItems = [...rowItemsCopy, newRowItem];
    const vals = newRowItems.map((item) => {
      return item.value;
    });
    setRowItems(newRowItems);
    params.retrieve_fn(vals);
  }

  function handleRemoveBtnOnClick(event: MouseEvent, index: number) {
    if (index < 0) {
      return;
    }

    const newRowItems = rowItems.slice();
    newRowItems.splice(index, 1);
    const vals = newRowItems.map((item) => {
      return item.value;
    });
    setRowItems(newRowItems);
    params.retrieve_fn(vals);
  }

  function handleInputOnChange(event: ChangeEvent, index: number) {
    const t = event.target;
    if (!(t instanceof HTMLInputElement)) {
      return;
    }
    if (index < 0) {
      return;
    }

    const val = t.value;
    const oldRowItem = rowItems[index];
    const newRowItem: InputTableRowItem = {
      id: oldRowItem.id,
      value: val,
    }
    const newRowItems = rowItems.slice();
    newRowItems.splice(index, 1, newRowItem);
    const vals = newRowItems.map((item) => {
      return item.value;
    });
    setRowItems(newRowItems);
    params.retrieve_fn(vals);
  }

  return (
    <div className={`border border-gray-500`}>
      <div className={`text-center font-bold py-4`}>
        {params.title}
      </div>
      <div className={`flex flex-col flex-nowrap gap-0.5`}>
        {rowItems.map((item, index) => {
          return (
            <InputTableItem
              key={item.id}
              value={item.value}
              index={index}
              onChange={handleInputOnChange}
              onClick={handleRemoveBtnOnClick}
            />
          );
        })}
      </div>
      <div>
        <button
          className={`border-1 border-gray-500 mt-4 p-3 w-full active:bg-gray-500`}
          type="button"
          onClick={handleAddBtnOnClick}
        >Add</button>
      </div>
    </div>
  );
}
