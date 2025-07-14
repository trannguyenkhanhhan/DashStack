import React, { useState, useEffect } from 'react';
import { Wand2 } from 'lucide-react';

const ChartOverview = ({ salesDataForApi }) => {
  const [overview, setOverview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleGenerateOverview = async () => {
      if (!salesDataForApi || salesDataForApi.length === 0) {
        setOverview('');
        return;
      }

      setIsLoading(true);
      setError(null);
      setOverview('');

      const prompt = `You are a sales analyst. Based on the daily sales data for the following products, provide a concise, one-paragraph summary comparing their performance. The data is: ${JSON.stringify(salesDataForApi)}. Show it as plain text dont use any tag, * or any symbol and in Vietnamese. Highlight any notable trends, peaks, or troughs.`;

      try {
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
        const apiKey = 'AIzaSyBREnPqs4LV6ZTBhZhtChlkH_Tc7iwWSu8' 
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (text) {
          setOverview(text);
        } else {
          throw new Error("Failed to generate overview from API response.");
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    handleGenerateOverview();
  }, [salesDataForApi]);

  return (
    <div className="mt-6 p-4 bg-slate-700/50 rounded-lg min-h-[100px]">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center">
          Sales Overview
        </h3>
      </div>
      {isLoading && <p className="text-slate-400 mt-4 text-sm">Generating overview...</p>}
      {error && <p className="text-red-400 mt-4">{error}</p>}
      {overview && <p className="text-slate-300 mt-4 text-sm leading-relaxed">{overview}</p>}
    </div>
  );
};

export default ChartOverview;