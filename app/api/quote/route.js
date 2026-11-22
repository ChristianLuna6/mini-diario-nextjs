import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      "https://zenquotes.io/api/quotes",
      { timeout: 15000 }
    );

    const quotes = response.data;

    if (!Array.isArray(quotes) || quotes.length === 0) {
      return NextResponse.json(
        { error: "La API no devolvió frases válidas." },
        { status: 502 }
      );
    }

    if (quotes[0].q?.toLowerCase().includes("too many requests")) {
      return NextResponse.json(
        { error: "La API alcanzó su límite gratuito. Intenta más tarde." },
        { status: 429 }
      );
    }

    return NextResponse.json(quotes);

  } catch (error) {
    console.error("Error al consultar ZenQuotes:", error);

    return NextResponse.json(
      { error: "No fue posible conectar con ZenQuotes." },
      { status: 502 }
    );
  }
}
