async function blogFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('textarea[name="title"]').value.trim();
  const content = document.querySelector('textarea[name="content"]').value.trim();

  if (title) {
    const response = await fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector("#new-blog-form").addEventListener("submit", blogFormHandler);
