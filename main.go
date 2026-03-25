package main

import (
	"fmt"
	"net/http"
	"time"
)

func main() {
	http.HandleFunc("/event", event)
	http.ListenAndServe(":8080", nil)
}

func event(w http.ResponseWriter, _ *http.Request) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")

	// imitating a model(gpt, claude...) response
	tokens := []string{
		"hey", "how", "is", "it", "going",
		"hope", "all", "is", "well",
	}

	for _, token := range tokens {
		content := fmt.Sprintf("data: %s\n\n", token)
		w.Write([]byte(content))
		// Flush sends any buffered data to the client.
		w.(http.Flusher).Flush()
		// intentional wait (again to mimick model thinking...)
		time.Sleep(time.Millisecond * 800)
	}

	// signal the client that the stream is complete
	fmt.Fprint(w, "event: done\ndata: \n\n")
	w.(http.Flusher).Flush()
}
