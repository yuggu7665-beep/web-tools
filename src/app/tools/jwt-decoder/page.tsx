"use client";

import { useState } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { jwtDecode } from "jwt-decode";

export default function JwtDecoderPage() {
  const [token, setToken] = useState("");
  const [decodedHeader, setDecodedHeader] = useState<unknown>(null);
  const [decodedPayload, setDecodedPayload] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  const decode = (jwt: string) => {
      setToken(jwt);
      setError(null);
      if (!jwt.trim()) {
          setDecodedHeader(null);
          setDecodedPayload(null);
          return;
      }

      try {
          const header = jwtDecode(jwt, { header: true });
          const payload = jwtDecode(jwt);
          setDecodedHeader(header);
          setDecodedPayload(payload);
      } catch {
          setError("Invalid JWT format");
          setDecodedHeader(null);
          setDecodedPayload(null);
      }
  };

  return (
    <ToolPageLayout
      title="JWT Decoder"
      description="Decode and inspect JSON Web Tokens (JWT) without sending them to a server."
      category="Developer Tools"
      howToUse={
          <div className="space-y-2">
            <p>Paste your JWT string in the input box. The tool will automatically decode and display the Header and Payload.</p>
            <p className="text-sm text-yellow-600 bg-yellow-50 p-2 rounded border border-yellow-200">
                <strong>Warning:</strong> JWTs are decoded client-side. We do not validate the signature or secret. Do not share sensitive tokens.
            </p>
          </div>
      }
    >
      <div className="space-y-6">
        <textarea
            value={token}
            onChange={(e) => decode(e.target.value)}
            placeholder="Paste your JWT here (e.g. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
            className={`w-full h-32 p-4 rounded-lg border font-mono text-xs sm:text-sm break-all resize-y outline-none focus:ring-2
            ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
        />
        
        {error && <p className="text-red-500 font-medium">{error}</p>}

        {decodedHeader && decodedPayload && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <h3 className="font-bold text-gray-700">Header</h3>
                    <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-auto text-sm font-mono text-gray-800">
                        {JSON.stringify(decodedHeader, null, 2)}
                    </pre>
                </div>
                <div className="space-y-2">
                    <h3 className="font-bold text-gray-700">Payload</h3>
                     <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-auto text-sm font-mono text-blue-800">
                        {JSON.stringify(decodedPayload, null, 2)}
                    </pre>
                </div>
            </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
