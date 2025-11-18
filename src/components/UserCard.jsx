export default function UserCard({ user }) {
  return (
    <div className="card">
      <div className="topRow">
        <strong>{user.name}</strong>
        <span className="muted">@{user.username}</span>
      </div>

      <p className="muted">{user.email}</p>
      <p className="muted">{user.phone}</p>

      
      <p className="muted small">
        {user.address?.city} · {user.company?.name}
      </p>
    </div>
  );
}
