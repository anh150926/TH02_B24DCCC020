import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Country {
  name: { common: string };
  flags: { png: string };
  population: number;
  region: string;
  cca3: string;
}

export default function Bai1() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get<Country[]>(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,region,cca3"
      )
      .then((res) => {
        setCountries(res.data);
        setFiltered(res.data);
      })
      .catch(() => setError("Không thể tải dữ liệu quốc gia."))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = () => {
    const result = countries.filter((c) =>
      c.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  };

  if (loading) return <p>Đang tải danh sách quốc gia...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Tra cứu Quốc gia</h2>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Nhập tên quốc gia..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>

      <div>
        {filtered.map((c) => (
          <div
            key={c.cca3}
            style={{
              border: "1px solid #ccc",
              marginBottom: 10,
              padding: 8,
              borderRadius: 6,
            }}
          >
            <img
              src={c.flags.png}
              alt={c.name.common}
              width={50}
              style={{ marginRight: 10, verticalAlign: "middle" }}
            />
            <span>
              {c.name.common} — {c.region} — Dân số:{" "}
              {c.population.toLocaleString()}
            </span>{" "}
            <Link to={`/bai1/${c.cca3}`}>Xem chi tiết</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
