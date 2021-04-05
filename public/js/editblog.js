const blogid = document.querySelector('input[name="blog-id"]').value.trim();

//edit blog
const editFormHandler = async function (event) {
  event.preventDefault();
  let title = document.querySelector('textarea[name="post-title"]').value.trim();

  let content = document.querySelector('textarea[name="blog-content"]').value.trim();

  if (title) {
    const response = await fetch(`/dashboard/${blogid}`, {
    method: "PUT",
    body: JSON.stringify({
      title: title,
      content: content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}
}

//delete blog
const deleteClickHandler = async function () {
  await fetch(`/api/blog/${blogid}`, {
    method: "DELETE",
  });

  document.location.replace("/dashboard");
};


//add event listeners to sub,it and delete buttons
document
  .querySelector("#edit-blog-form")
  .addEventListener("submit", editFormHandler);
document
  .querySelector("#deletebtn")
  .addEventListener("click", deleteClickHandler);
