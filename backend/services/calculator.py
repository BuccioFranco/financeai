def calcular_rendimiento_real(tna: float, inflacion_mensual: float, meses: int = 12) -> dict:
    tasa_mensual = tna / 12 / 100
    inf_mensual = inflacion_mensual / 100
    capital_nominal = (1 + tasa_mensual) ** meses
    inf_acumulada = (1 + inf_mensual) ** meses
    real = (capital_nominal / inf_acumulada - 1) * 100
    return {
        "rendimiento_nominal_anual": round((capital_nominal - 1) * 100, 2),
        "inflacion_proyectada_anual": round((inf_acumulada - 1) * 100, 2),
        "rendimiento_real_anual": round(real, 2),
    }


def comparar_inversiones(
    monto_ars: float,
    dolar_mep: float,
    tna_pf: float,
    inflacion_mensual: float,
) -> list[dict]:
    monto_usd = round(monto_ars / dolar_mep, 2) if dolar_mep else 0
    inf = inflacion_mensual or 5.0
    tna = tna_pf or 40.0

    rr_pf = calcular_rendimiento_real(tna, inf)["rendimiento_real_anual"]
    rr_mm = calcular_rendimiento_real(tna * 0.90, inf)["rendimiento_real_anual"]
    rr_uva = 1.0

    inversiones = [
        {
            "nombre": "FCI Money Market",
            "tipo": "pesos",
            "riesgo": 1,
            "riesgo_label": "Muy bajo",
            "liquidez": "Inmediata (24h)",
            "tna_nominal": round(tna * 0.90, 2),
            "rendimiento_real": rr_mm,
            "monto_final_ars": round(monto_ars * (1 + tna * 0.90 / 100), 2),
            "monto_final_usd": None,
            "descripcion": "Fondo de liquidez inmediata. Rinde similar al plazo fijo con rescate en el día.",
            "icono": "wallet",
        },
        {
            "nombre": "Plazo fijo tradicional",
            "tipo": "pesos",
            "riesgo": 1,
            "riesgo_label": "Muy bajo",
            "liquidez": "Baja (30 días mín.)",
            "tna_nominal": round(tna, 2),
            "rendimiento_real": rr_pf,
            "monto_final_ars": round(monto_ars * (1 + tna / 100), 2),
            "monto_final_usd": None,
            "descripcion": "Depósito bancario a plazo. Garantía SEDESA hasta $6M. Sin sorpresas.",
            "icono": "bank",
        },
        {
            "nombre": "Plazo fijo UVA",
            "tipo": "pesos",
            "riesgo": 2,
            "riesgo_label": "Bajo",
            "liquidez": "Baja (90 días mín.)",
            "tna_nominal": round(inf * 12 + 1.0, 2),
            "rendimiento_real": rr_uva,
            "monto_final_ars": round(monto_ars * (1 + inf / 100) ** 12 * 1.01, 2),
            "monto_final_usd": None,
            "descripcion": "Ajusta por CER (inflación). Preserva poder adquisitivo. Mínimo 90 días.",
            "icono": "shield",
        },
        {
            "nombre": "Dólar MEP",
            "tipo": "dolares",
            "riesgo": 2,
            "riesgo_label": "Bajo",
            "liquidez": "Media (48h operativa)",
            "tna_nominal": 0.0,
            "rendimiento_real": 0.0,
            "monto_final_ars": None,
            "monto_final_usd": monto_usd,
            "descripcion": "Dolarización vía bolsa (AL30/GD30). Sin límite de compra, dentro del sistema.",
            "icono": "dollar-sign",
        },
        {
            "nombre": "ON dolarizada (corp.)",
            "tipo": "dolares",
            "riesgo": 3,
            "riesgo_label": "Moderado",
            "liquidez": "Media (mercado secundario)",
            "tna_nominal": 7.5,
            "rendimiento_real": 7.5,
            "monto_final_ars": None,
            "monto_final_usd": round(monto_usd * 1.075, 2),
            "descripcion": "Obligaciones negociables de YPF, Pampa, Telecom. Cupón semestral en USD.",
            "icono": "file-text",
        },
        {
            "nombre": "Cedears (acciones USA)",
            "tipo": "dolares",
            "riesgo": 4,
            "riesgo_label": "Alto",
            "liquidez": "Alta (bursátil)",
            "tna_nominal": 15.0,
            "rendimiento_real": 15.0,
            "monto_final_usd": round(monto_usd * 1.15, 2),
            "monto_final_ars": None,
            "descripcion": "AAPL, MSFT, AMZN, NVDA en pesos pero con valor dolarizado. Alta volatilidad.",
            "icono": "trending-up",
        },
        {
            "nombre": "Acciones Merval",
            "tipo": "pesos",
            "riesgo": 5,
            "riesgo_label": "Muy alto",
            "liquidez": "Alta (bursátil)",
            "tna_nominal": 30.0,
            "rendimiento_real": calcular_rendimiento_real(30.0, inf)["rendimiento_real_anual"],
            "monto_final_ars": round(monto_ars * 1.30, 2),
            "monto_final_usd": None,
            "descripcion": "Acciones locales (YPF, Galicia, Loma Negra). Alta volatilidad, potencial mayor.",
            "icono": "bar-chart-2",
        },
        {
            "nombre": "Bitcoin",
            "tipo": "dolares",
            "riesgo": 5,
            "riesgo_label": "Muy alto",
            "liquidez": "Alta (24/7)",
            "tna_nominal": 0.0,
            "rendimiento_real": 0.0,
            "monto_final_usd": monto_usd,
            "monto_final_ars": None,
            "descripcion": "Reserva de valor descentralizada. Puede subir o bajar 50%+ en meses.",
            "icono": "zap",
        },
    ]

    return sorted(inversiones, key=lambda x: x["riesgo"])
