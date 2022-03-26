import { Navigate, useParams } from "react-router-dom";

export function Info(props) {
  const params = useParams();
  /*if (!props.user) {
    return <Navigate to="/" replace={true} />;
  }*/
  return <div>Info Page {params.id}</div>;
}
