import { useContext } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../contexts/AuthContext";
import { useCan } from "../hooks/useCan";
import { setupAPIClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dasboard() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <>
      <h1>Dashboard {user?.email}</h1>
      <button onClick={signOut}>Sign out</button>
      <Can permissions={["metrics.list"]}>
        <div>Metrics</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const api = setupAPIClient(ctx);
  const response = api.get("/me");

  return {
    props: {},
  };
});
