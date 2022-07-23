import { Link, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import React from "react";
import { db } from "~/utils/db.server";

function validateTitle(title) {
  if (typeof title !== String || title.length < 3) {
    return "Title should be at least 3 chars long";
  }
}

function validateBody(body) {
  if (typeof body !== String || body.length < 10) {
    return "Title should be at least 10 chars long";
  }
}

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const body = form.get("body");
  const fields = { title, body };

  const fieldErrors = {
    title: validateTitle(title),
    body: validateBody(),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return json({ fieldErrors, fields }, { status: 400 });
  }

  const post = await db.post.create({ data: fields });

  return redirect(`/posts/${post.id}`);
};

export default function NewPost() {
  const actionData = useActionData();

  return (
    <>
      <div className="page-header">
        <h1>New Post</h1>
        <Link to="/posts" className="btn btn-reverse">
          Back
        </Link>
      </div>

      <div className="page-content">
        <form method="POST">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={actionData?.fields?.title}
            />
            <div className="error">
              <p>
                {actionData?.fieldErrors?.title &&
                  actionData?.fieldErrors?.title}
              </p>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="body">Post Body</label>
            <textarea
              type="text"
              name="body"
              id="body"
              defaultValue={actionData?.fields.body}
            />
            <div className="error">
              <p>
                {actionData?.fieldErrors?.body && actionData?.fieldErrors?.body}
              </p>
            </div>
          </div>

          <button type="submit" className="btn btn-block">
            Add Post
          </button>
        </form>
      </div>
    </>
  );
}
