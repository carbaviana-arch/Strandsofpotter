
import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCongratulatoryMessage = async (taskName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Genera un mensaje corto, divertido y alentador para un niño que acaba de completar la tarea: '${taskName}'. Mantenlo por debajo de 20 palabras. Usa emojis. El mensaje debe ser en español.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error al obtener el mensaje de felicitación:", error);
    return "¡Increíble trabajo! ¡Sigue así! 🎉";
  }
};

export const getActivitySuggestions = async (): Promise<string[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Sugiere 3 actividades divertidas y sencillas para que un niño haga en casa. Las sugerencias deben ser en español.",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        suggestions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                                description: "Una sugerencia de actividad."
                            }
                        }
                    },
                    required: ["suggestions"]
                }
            }
        });
        
        // Fix: Add a type guard to ensure the response from the API is a valid array before returning.
        // This prevents potential runtime errors if the API returns an unexpected format.
        const jsonResponse = JSON.parse(response.text);
        if (jsonResponse && Array.isArray(jsonResponse.suggestions)) {
            return jsonResponse.suggestions;
        }
        return [];

    } catch (error) {
        console.error("Error al obtener sugerencias de actividades:", error);
        return [
            "Construir un fuerte de almohadas",
            "Hacer una búsqueda del tesoro en casa",
            "Dibujar tu superhéroe favorito"
        ];
    }
};