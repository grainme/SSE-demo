# SSE Demo

Demo code for the article: [Real-Time apps with SSE](https://www.marouaneboufarouj.dev/blog)

A minimal SSE (Server-Sent Events) implementation with a **Go** server streaming tokens and a **React** (Next.js) client consuming them in real time - mimicking how LLMs like Claude/ChatGPT stream responses.

## Structure

- `demo/go/` — Go SSE server (`/event` endpoint)
- `demo/go/demo/` — Next.js frontend consuming the stream via `EventSource`

## Run

```bash
# server
cd demo/go && go run main.go

# client
cd demo/go/demo && bun dev
```

Then open `http://localhost:3000`.
