import { useAuthContext } from "../context/AuthContext";

const Profile = () => {
  const { userData } = useAuthContext();
  console.log(userData());
  return <div>Profile</div>;
};

export default Profile;
