import { Dispatch, SetStateAction } from "react";

export interface FilterGroupProps {
  items: readonly string[];
  placeholder: string;
  label: string;
  selectedItems: string[];
  setSelectedItems: Dispatch<SetStateAction<string[]>>
}

export interface FiltersProps {
  ambientes: number[];
  setAmbientes: Dispatch<SetStateAction<number[]>>;
  minimo: number | "";
  setMinimo: Dispatch<SetStateAction<number | "">>;
  maximo: number | "";
  setMaximo: Dispatch<SetStateAction<number | "">>;
  barrioSelected: string[];
  setBarrioSelected: Dispatch<SetStateAction<string[]>>;
  tipoSelected: string[];
  setTipoSelected: Dispatch<SetStateAction<string[]>>;
}