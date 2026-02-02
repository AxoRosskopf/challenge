export const globalFilterFn = (row: any, columnId: string, filterValue: any) => {
    const { barrios, tipos, ambientes, precio_estimado, search } = filterValue;

    const rowBarrio = row.original.neighborhood.name.toLowerCase();
    const rowTipo = String(row.getValue("type")).toLowerCase();
    const rowAddress = row.original.address?.toLowerCase() || "";

    const matchesSearch = !search ||
        rowBarrio.includes(search.toLowerCase()) ||
        rowTipo.includes(search.toLowerCase()) ||
        rowAddress.includes(search.toLowerCase());

    const selectedBarrios = barrios.map((b: string) => b.toLowerCase());
    const selectedTipos = tipos.map((t: string) => t.toLowerCase());

    const matchesBarrio = barrios.length === 0 || selectedBarrios.includes(rowBarrio);
    const matchesTipo = tipos.length === 0 || selectedTipos.includes(rowTipo);

    const passBaseFilters = matchesBarrio && matchesTipo;

    const rowAmbientes = Number(row.getValue("rooms"));
    const matchesAmbientes = rowAmbientes >= ambientes[0] && rowAmbientes <= ambientes[1];

    const rowPrecio = Number(row.getValue("price"));
    const [min, max] = precio_estimado;
    const minVal = min === "" ? -Infinity : Number(min);
    const maxVal = max === "" ? Infinity : Number(max);
    const matchesPrecio = rowPrecio >= minVal && rowPrecio <= maxVal;

    return passBaseFilters && matchesAmbientes && matchesPrecio && matchesSearch;
};