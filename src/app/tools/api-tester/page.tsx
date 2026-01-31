"use client";

import { useState } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export default function ApiTesterPage() {
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/todos/1");
  const [method, setMethod] = useState<Method>("GET");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState<{ status: number; text: string; time: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
      setLoading(true);
      setResponse(null);
      const startTime = performance.now();
      
      try {
          const options: RequestInit = {
              method,
              headers: headers ? JSON.parse(headers) : {},
          };

          if (method !== "GET" && method !== "DELETE" && body) {
              options.body = body;
              // Auto-set content type if valid JSON
              if (!options.headers) options.headers = {};
              try {
                  JSON.parse(body);
                  (options.headers as Record<string, string>)["Content-Type"] = "application/json";
              } catch {
                  // Not JSON
              }
          }

          const res = await fetch(url, options);
          const endTime = performance.now();
          const text = await res.text();
          
          let formattedText = text;
          try {
              formattedText = JSON.stringify(JSON.parse(text), null, 2);
          } catch {
              // ignore
          }

          setResponse({
              status: res.status,
              text: formattedText,
              time: Math.round(endTime - startTime)
          });

      } catch (e) {
          setResponse({
              status: 0,
              text: "Error: " + (e as Error).message,
              time: 0
          });
      } finally {
          setLoading(false);
      }
  };

  return (
    <ToolPageLayout
      title="API Tester"
      description="Test REST APIs directly from your browser. Note: CORS restrictions apply."
      category="Developer Tools"
    >
      <div className="space-y-6">
        <div className="flex gap-2">
             <select 
                value={method} 
                onChange={(e) => setMethod(e.target.value as Method)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
             >
                 {["GET", "POST", "PUT", "DELETE", "PATCH"].map(m => (
                     <option key={m} value={m}>{m}</option>
                 ))}
             </select>
             <Input 
                value={url} 
                onChange={(e) => setUrl(e.target.value)} 
                placeholder="https://api.example.com/endpoint"
                className="flex-grow"
             />
             <Button onClick={sendRequest} disabled={loading}>
                 {loading ? "Sending..." : "Send"}
             </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Headers (JSON)</label>
                     <textarea 
                        value={headers}
                        onChange={(e) => setHeaders(e.target.value)}
                        placeholder='{"Authorization": "Bearer token"}'
                        className="w-full h-32 p-3 rounded-lg border border-gray-300 font-mono text-xs"
                     />
                </div>
                {(method !== "GET" && method !== "DELETE") && (
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Request Body</label>
                        <textarea 
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder='{"key": "value"}'
                            className="w-full h-48 p-3 rounded-lg border border-gray-300 font-mono text-xs"
                        />
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-medium text-gray-700 h-6">
                    <span>Response</span>
                    {response && (
                        <span className={`text-xs px-2 py-1 rounded ${response.status >= 200 && response.status < 300 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {response.status === 0 ? "Network Error" : `${response.status} ${response.status === 200 ? "OK" : ""}`} • {response.time}ms
                        </span>
                    )}
                </div>
                 <div className="w-full h-[340px] p-4 rounded-lg border border-gray-200 bg-gray-50 font-mono text-xs overflow-auto whitespace-pre-wrap text-gray-800">
                    {response ? response.text : "No response yet"}
                </div>
            </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
