import { useParams } from "@remix-run/react";

export default function Post() {
  const params = useParams();
  return (
    <div>
      <h1>Post {params.postId}</h1>
    </div>
  );
}
