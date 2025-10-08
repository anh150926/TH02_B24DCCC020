import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{  backgroundColor: "#eee" }}>
      <Link to="/bai1" style={{ marginRight: 10 }}>
        Bài 1: Tìm Quốc gia
      </Link>
      <Link to="/bai2" style={{ marginRight: 10 }}>
        Bài 2: Đổi Tỷ giá
      </Link>
      <Link to="/bai3">
        Bài 3: Tìm phim
      </Link>
    </nav>
  );
}
