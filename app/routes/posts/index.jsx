import React from "react";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const data = {
    posts: await db.post.findMany({
      take: 20,
      select: { id: true, title: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    }),
  };

  return data;
};

export default function PostItems() {
  const { posts } = useLoaderData();
  return (
    <div>
      <div className="page-header">
        <h1>Posts</h1>
        <Link to="/posts/new" className="btn">
          New Post
        </Link>
      </div>
      <ul className="post-list">
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Link to={post.id}>
                <h3>{post.title}</h3>
                {new Date(post.createdAt).toLocaleString()}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
