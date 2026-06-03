import { useEffect } from "react";

/**
 * A custom hook to dynamically inject and update JSON-LD schema in the document head.
 * Ensures that pre-rendered script tags (from react-snap) are reused during client-side hydration,
 * preventing duplicate schema injections.
 *
 * @param schema The JSON-LD schema object or string.
 * @param id A unique ID for the script tag (e.g., 'schema-faq').
 */
export function useJsonLd(schema: Record<string, any> | null | string, id: string) {
  useEffect(() => {
    if (!schema) return;

    let script = document.getElementById(id) as HTMLScriptElement | null;
    const jsonString = typeof schema === "string" ? schema : JSON.stringify(schema);

    if (script) {
      script.text = jsonString;
    } else {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      script.text = jsonString;
      document.head.appendChild(script);
    }

    return () => {
      const el = document.getElementById(id);
      if (el) {
        el.remove();
      }
    };
  }, [schema, id]);
}
