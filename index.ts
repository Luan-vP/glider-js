const html = Bun.file('./index.html');

const text = await html.text();



const serer = Bun.serve({
    fetch(req) {
        return new Response(text, {
            headers: {
              "Content-Type": "text/html",
            },
          });
    }
})

export {}