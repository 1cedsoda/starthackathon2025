"use client";

import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

const states = [
  "🔎 Durchsuche SharePoint ...",
  "🌐 Durchsuche das Web ...",
  "📊 Analysiere Best Practices ...",
];

export default function Innovate() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  // State-Wechsel für die Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex + 1 < states.length) {
          return prevIndex + 1;
        } else {
          // Ladeprozess beenden, wenn alle States durchlaufen sind
          setLoadingComplete(true);
          clearInterval(interval);
          return prevIndex;
        }
      });
    }, 2000); // Wechsel alle 2 Sekunden

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex w-full items-center justify-center"
      style={{ height: "calc(100vh - 8rem)" }} // 4rem entspricht z.B. der Navbar-Höhe
    >
      {!loadingComplete ? (
        // Lade-Animation
        <div className="flex flex-col items-center gap-4">
          <Spinner />
          <div className="text-2xl font-medium text-gray-700 dark:text-gray-200 animate-fade-in">
            {states[currentIndex]}
          </div>
        </div>
      ) : (
        // Card nach Abschluss des Ladeprozesses
        <div className="max-w-md rounded-lg border bg-white p-6 shadow-md dark:bg-gray-800">
          <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-100">
            🎉 Ladeprozess abgeschlossen!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Die Informationen wurden erfolgreich durchsucht und analysiert.
            Du kannst jetzt mit den Ergebnissen weiterarbeiten.
          </p>
        </div>
      )}
    </div>
  );
}
