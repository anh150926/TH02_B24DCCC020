import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface CountryDetail {
  name: { common: string; official: string };
  flags: { png: string };
  population: number;
  region: string;
  capital: string[];
  subregion: string;
  area: number;
}

export default function CountryDetailPage() {
  const { code } = useParams<{ code: string }>();
  const [country, setCountry] = useState<CountryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!code) return;
    setLoading(true);
    setError("");

    axios
      .get(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setCountry(data);
      })
      .catch(() => setError("Không tìm thấy quốc gia."))
      .finally(() => setLoading(false));
  }, [code]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!country) return null;

  return (
    <div style={{ padding: 20 }}>
      <Link to="/bai1">Quay lại danh sách</Link>
      <h2>{country.name.common}</h2>
      <img src={country.flags.png} alt={country.name.common} width={200} />
      <p><b>Tên chính thức:</b> {country.name.official}</p>
      <p><b>Khu vực:</b> {country.region}</p>
      <p><b>Vùng con:</b> {country.subregion}</p>
      <p><b>Thủ đô:</b> {country.capital?.join(", ")}</p>
      <p><b>Dân số:</b> {country.population.toLocaleString()}</p>
      <p><b>Diện tích:</b> {country.area.toLocaleString()} km²</p>
    </div>
  );
}
