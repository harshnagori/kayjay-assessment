import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";


export default function Home() {
  const [users, setUsers] = useState([]);         
  const [filtered, setFiltered] = useState([]);  
  const [search, setSearch] = useState("");     
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        setUsers(data);
        setFiltered(data);
      } catch (err) {
        setError("Unable to load user data.");
        console.log("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    const q = search.trim().toLowerCase();

    if (q === "") {
      setFiltered(users);
    } else {
      setFiltered(
        users.filter((u) =>
          u.name.toLowerCase().includes(q)
        )
      );
    }
  }, [search, users]);

  return (
    <div className="container">
      <h1>User Directory</h1>
      <p className="sub">A React project built for the KayJay assessment</p>

      
      <SearchBar value={search} onChange={setSearch} />

      
      {loading && <p className="info">Loading users…</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className="info">No matching users.</p>
      )}

      <div className="list">
        {!loading &&
          !error &&
          filtered.map((user) => <UserCard key={user.id} user={user} />)}
      </div>
    </div>
  );
}
