"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [tokens, setTokens] = useState<string[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    // open the SSE stream (connecting)
    const sse = new EventSource("http://localhost:8080/event");

    // handle each incoming message (listening)
    sse.onmessage = (e) => {
      setTokens((prev) => [...prev, e.data]);
    };

    sse.onerror = () => {
      sse.close();
      setError(true);
    };
    // stop reconnecting when the server signals it's done
    sse.addEventListener("done", () => {
      sse.close();
    });

    // close the connection when the component unmounts (cleanup)
    return () => sse.close();
  }, []);

  if (error) {
    return <div>SOMETHING WENT WRONG...</div>;
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans text-black">
      {tokens.map((token, idx) => {
        return <div key={idx}>{token}</div>;
      })}
    </div>
  );
}
