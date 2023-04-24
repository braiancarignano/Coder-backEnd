import NavBar from "../components/NavBar/NavBar";
import { useAuthContext } from "../context/AuthContext";
const Home = () => {
  const { User } = useAuthContext();
  return (
    <div>
      <NavBar />
      <h1>Home</h1>
    </div>
  );
};
export default Home;
