import { useEffect, useState } from "react";
import axios from "axios";

interface RatesResponse {
  base_code: string;
  rates: Record<string, number>;
}

export default function Bai2() {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [base, setBase] = useState("USD");
  const [target, setTarget] = useState("VND");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get<RatesResponse>(`https://open.er-api.com/v6/latest/${base}`)
      .then((res) => setRates(res.data.rates))
      .catch(() => setError("Không thể tải tỷ giá."))
      .finally(() => setLoading(false));
  }, [base]);

  const handleConvert = () => {
    if (!rates[target]) {
      setError("Không có tỷ giá cho đơn vị này.");
      return;
    }
    setResult(amount * rates[target]);
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Quy đổi Tỷ giá tiền tệ</h2>

      <div style={{ marginBottom: 10 }}>
        <label>Tiền gốc: </label>
        <select value={base} onChange={(e) => setBase(e.target.value)}>
          <option>USD</option>
          <option>EUR</option>
          <option>VND</option>
          <option>JPY</option>
          <option>GBP</option>
          <option>AUD</option>
        </select>

        <label style={{ marginLeft: 10 }}>→ Tiền đích: </label>
        <select value={target} onChange={(e) => setTarget(e.target.value)}>
          <option>USD</option>
          <option>EUR</option>
          <option>VND</option>
          <option>JPY</option>
          <option>GBP</option>
          <option>AUD</option>
        </select>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Số tiền: </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button onClick={handleConvert} style={{ marginLeft: 10 }}>
          Quy đổi
        </button>
      </div>

      {result !== null && (
        <p>
          {amount} {base} ={" "}
          <b>
            {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
            {target}
          </b>
        </p>
      )}
    </div>
  );
}
