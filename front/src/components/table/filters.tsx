import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription
} from "../ui/popover"
import { Button } from "../ui/button"
import { FilterIcon } from "lucide-react"
import { Separator } from "../ui/separator";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { NEIGHBORHOODS, PROPERTY_TYPES } from "./utils/text-samples";
import { FiltersProps } from "./utils/filters-props";
import { MultiSelectFilter } from "./multiselect-filter";

const Filters = ({
  ambientes,
  setAmbientes,
  minimo,
  setMinimo,
  maximo,
  setMaximo,
  barrioSelected,
  setBarrioSelected,
  tipoSelected,
  setTipoSelected
}: FiltersProps) => {

  const handlerClearFilters = () => {
    setBarrioSelected([]);
    setTipoSelected([]);
    setAmbientes([1, 7]);
    setMinimo("");
    setMaximo("");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <FilterIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80">
        <PopoverHeader className="mb-4">
          <PopoverTitle>Filtros</PopoverTitle>
          <PopoverDescription>Ajusta los criterios de búsqueda</PopoverDescription>
        </PopoverHeader>

        <div className="grid gap-4">
          <MultiSelectFilter
            label="Barrios"
            items={NEIGHBORHOODS}
            placeholder="Buscar barrio..."
            selectedItems={barrioSelected}
            setSelectedItems={setBarrioSelected}
          />
          <Separator />
          <MultiSelectFilter
            label="Tipo de propiedad"
            items={PROPERTY_TYPES}
            placeholder="Seleccionar tipo..."
            selectedItems={tipoSelected}
            setSelectedItems={setTipoSelected}
          />
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Ambientes</h4>
              <span className="text-xs text-muted-foreground font-mono">
                {ambientes[0]} - {ambientes[1]}
              </span>
            </div>
            <Slider
              value={ambientes}
              onValueChange={setAmbientes}
              min={1}
              max={7}
              step={1}
              className="py-2"
            />
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Precio</h4>
            </div>
            <div className="flex flex-row space-x-2">
              <Input
                placeholder="Minimo"
                type="number"
                step={1000}
                value={minimo}
                onChange={(e) => {
                  const val = e.target.value;
                  setMinimo(val === "" ? "" : Number(val));
                }}
              />
              <Input
                placeholder="Maximo"
                type="number"
                step={1000}
                value={maximo}
                onChange={(e) => {
                  const val = e.target.value;
                  setMaximo(val === "" ? "" : Number(val));
                }}
              />
            </div>
          </div>
          <Button onClick={handlerClearFilters} className="w-full">
            Limpiar filtros
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Filters;