import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div style={{ padding: "15px" }} id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {error.status === 404
            ? error.status + " Page " + error.statusText
            : error.statusText || error.message}
        </i>
      </p>
    </div>
  );
}
