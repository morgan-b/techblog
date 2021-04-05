async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment = document.querySelector('textarea[name="comment"]').value.trim();
    const blogId = document.querySelector('input[name="blog-id"]').value;

  
    if (comment) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
           blog_id:blogId,
           comment:comment

          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
  }
  
  document.querySelector('#new-comment-form').addEventListener('submit', commentFormHandler);