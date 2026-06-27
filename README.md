# Martian

Cổng tải chính thức cho **VoxelXLauncher** — landing page Next.js (App Router) với nền
shader Three.js tông sao Hỏa và giao diện "liquid glass".

## Chạy local

```bash
npm install
npm run dev        # http://localhost:3000
```

## Tính năng

- Màn hình loading với logo Martian + ID IP đã băm (`/api/session`).
- Bộ đếm lượt tải theo IP, mỗi IP chỉ +1 (chống spam) — `/api/download`, `/api/stats`.
- Nút Tải → modal đếm ngược 5s → fetch GitHub Releases và liệt kê phiên bản theo hệ điều hành.
- Hỗ trợ Windows · macOS (Apple Silicon/Intel) · Linux (AppImage/.deb).

## Deploy lên Vercel

1. Import repo, đặt **Root Directory** = `app`.
2. (Khuyến nghị) Tạo một **KV store** (Vercel KV / Upstash Redis) và liên kết — Vercel sẽ tự thêm
   `KV_REST_API_URL` và `KV_REST_API_TOKEN`. Không có KV vẫn build & chạy, nhưng bộ đếm sẽ
   không bền giữa các lần cold-start.
3. (Tùy chọn) Thêm `GITHUB_TOKEN` để tránh giới hạn rate của GitHub API.

Bản phát hành lấy từ: https://github.com/foxstudio-201/VoxelXClient/releases
