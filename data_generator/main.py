import json
import os
import random
from defines import NEIGHBORHOODS, PROPERTY_TYPES, CALLES, ZONAS

PARAMS_ESPECIFICOS = {
    "Puerto Madero": {"mu": 4800, "sigma": 900},
    "Palermo":       {"mu": 3200, "sigma": 650},
    "Recoleta":      {"mu": 3000, "sigma": 500},
    "Belgrano":      {"mu": 2900, "sigma": 450},
    "Villa Lugano":  {"mu": 1000, "sigma": 100},
    "Constitucion":  {"mu": 1300, "sigma": 150},
}

PARAMS_ZONAS = {
    "high":    {"mu": 2800, "sigma": 400},
    "midHigh": {"mu": 2300, "sigma": 320},
    "mid":     {"mu": 1900, "sigma": 252},
    "low":     {"mu": 1200, "sigma": 150}
}

def get_distribution_params(barrio):
    if barrio in PARAMS_ESPECIFICOS:
        return PARAMS_ESPECIFICOS[barrio]
    for zona, barrios in ZONAS.items():
        if barrio in barrios:
            return PARAMS_ZONAS[zona]
    return {"mu": 1800, "sigma": 423} 

def generate_price_m2(barrio):
    params = get_distribution_params(barrio)
    price_m2 = random.gauss(params["mu"], params["sigma"])
    return max(600, min(price_m2, 12000))

def data_generator(num_entries):
    data = []
    weighted_neighborhoods = []
    for barrio in NEIGHBORHOODS:
        weight = 1
        if barrio in ZONAS.get("high", []): weight = 10
        elif barrio in ZONAS.get("midHigh", []): weight = 7
        elif barrio in ZONAS.get("mid", []): weight = 6
        
        if barrio == "Palermo": weight = 30
        if barrio == "Belgrano": weight = 18
        
        weighted_neighborhoods.extend([barrio] * weight)
    for _ in range(num_entries):
        barrio = random.choice(weighted_neighborhoods)
        tipo = random.choice(PROPERTY_TYPES)
        calle = random.choice(CALLES)

        if tipo == "departamento":
            ambientes = random.randint(1, 5)
            sup_total = ambientes * random.randint(25, 45)
        elif tipo == "PH":
            ambientes = random.randint(2, 5)
            sup_total = ambientes * random.randint(30, 50)
        else: # casa
            ambientes = random.randint(3, 7)
            sup_total = ambientes * random.randint(40, 80)
        
        ratio = 0.7 if tipo == "casa" else (0.8 if tipo == "PH" else 0.95)
        sup_cubierta = int(sup_total * ratio)
        price_m2 = generate_price_m2(barrio)
        precio = int(price_m2 * sup_total)

        entry = {
            "address": f"{calle} {random.randint(100, 6000)}",
            "neighborhood": barrio,
            "type": tipo,
            "rooms": ambientes,
            "totalSurface": sup_total,
            "coveredSurface": sup_cubierta,
            "price": round(precio, -2),
            "constructionYear": random.randint(1950, 2024),
        }
        data.append(entry)

    return data

import sys

if __name__ == "__main__":
    if len(sys.argv) > 1:
        try:
            CANTIDAD = int(sys.argv[1])
        except ValueError:
            print("Error: El argumento debe ser un número entero mayor a 1")
            sys.exit(1)
    else:
        CANTIDAD = 50
    generated_data = data_generator(CANTIDAD)
    print("Generated data entries:", len(generated_data))
    output_path = os.path.join(os.path.dirname(__file__), "data", "generated_properties.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(generated_data, f, ensure_ascii=False, indent=4)
    print(f"Data saved to {output_path}")