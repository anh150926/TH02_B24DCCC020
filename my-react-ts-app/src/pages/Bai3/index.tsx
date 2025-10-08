import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default function Bai3() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async (search: string) => {
    if (!search) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`https://www.omdbapi.com/?apikey=thewdb&s=${search}`);
      if (res.data.Response === "True") setMovies(res.data.Search);
      else setError("Không tìm thấy phim.");
    } catch {
      setError("Lỗi khi tải dữ liệu phim.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchMovies(query);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Tìm kiếm phim</h2>
      <input
        type="text"
        placeholder="Nhập tên phim..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} style={{ marginLeft: 10 }}>
        Tìm kiếm
      </button>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: 20 }}>
        {movies.map((m) => (
          <div key={m.imdbID} style={{ marginBottom: 10 }}>
            <img
              src={m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/100"}
              alt={m.Title}
              width={100}
            />
            <span style={{ marginLeft: 10 }}>
              {m.Title} ({m.Year})
            </span>{" "}
            <Link to={`/movie/${m.imdbID}`}>Xem chi tiết</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
