// frontend/src/pages/Dashboard.jsx
function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.username || user?.name}!</p>
      <p>Email: {user?.email}</p>
      {user?.picture && <img src={user.picture} alt="Profile" width="100" />}
    </div>
  );
}

export default Dashboard;
