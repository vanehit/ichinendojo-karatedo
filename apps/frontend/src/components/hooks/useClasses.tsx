import { useEffect, useState } from "react";
import { ClassAPI } from "../api/ClassApi.js";


export function useClasses() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await ClassAPI.getMyClasses();
        setClasses(data.data);
      } catch (err: any) {
        setError(err.message || "Error al cargar las clases");
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  return { classes, loading, error };
}
