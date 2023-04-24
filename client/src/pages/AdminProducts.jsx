import { useAuthContext } from "../context/AuthContext";
const AdminProducts = () => {
  const { isLogged } = useAuthContext();
  return (
    <div>
      <h1>AdminProducts</h1>
      <button onClick={isLogged}>isLogged</button>
    </div>
  );
};
export default AdminProducts;
