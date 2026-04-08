# 🧩 Dự Án ReactJS Microfrontend với Webpack Module Federation

Chào mừng đến với dự án mẫu về kiến trúc **Microfrontend**. 
Nếu bạn là một Junior Developer và đang tiếp cận khái niệm này lần đầu, đừng lo lắng! File README này được viết để giúp bạn hiểu rõ bản chất của Microfrontend một cách đơn giản và dễ hiểu nhất.

## 🚀 1. Microfrontend Là Gì? (Giải thích cho Junior)

Hãy tưởng tượng bạn đang xây dựng một **trang web thương mại điện tử lớn** (giống như Shopee hay Tiki). 
Theo cách làm truyền thống (Monolith), tất cả mọi thứ: Giỏ hàng, Thanh toán, Hồ sơ người dùng, Quản lý sản phẩm... đều được viết chung vào **một kho mã nguồn (codebase) duy nhất**.

**Vấn đề của cách cũ:**
- Khi dự án phình to, mỗi lần sửa một lỗi nhỏ cũng khiến việc build cả dự án mất hàng chục phút.
- Rất khó để chia việc cho 4-5 nhóm khác nhau làm cùng lúc vì họ hay bị "viết đè" code lên nhau (Git conflict liên tục).

**Microfrontend đem lại giải pháp gì?**
Thay vì xây một tòa nhà nguyên khối, chúng ta sẽ lắp ráp trang web bằng những **khối Lego độc lập**. 
- Nhóm A chuyên lo cục Lego "Marketing".
- Nhóm B chuyên lo cục Lego "Auth" (Đăng nhập).
- Nhóm C chuyên lo cục Lego "Dashboard".

Mỗi nhóm có một mã nguồn riêng, tự do code, tự do build và deploy. Ở ngoài cùng, chúng ta có một **"Container" (Vỏ bọc)** - đóng vai trò như chiếc bàn, nơi bạn ghép các khối Lego đó lại thành một trang web hoàn chỉnh đưa cho khách hàng sử dụng. Khách hàng nhìn vào sẽ tưởng đây là một trang web duy nhất!

### 🌟 Ưu điểm tuyệt vời:
1. **Phát triển độc lập:** Nhóm nào lo việc nhóm nấy, không sợ giẫm đạp code của nhau.
2. **Triển khai độc lập:** Sửa lỗi ở phần `Auth` thì chỉ cần deploy lại `Auth`, không cần build lại cả trang web.
3. **Mở rộng dễ dàng:** Phù hợp với những dự án lớn, nhiều team quy mô hàng chục tới hàng trăm người.

---

## 🏗️ 2. Cấu Trúc Của Dự Án Này

Dự án này được chia thành 4 thư mục chính, tương ứng với 4 "khối Lego":

- 📦 **`container` (Port: 8080):** Đây là phần ứng dụng gốc (Host). Nó làm nhiệm vụ điều hướng (Router) và nhúng/hiển thị các Microfrontend khác vào bên trong nó.
- 🛍️ **`marketing` (Port: 8081):** Microfrontend hiển thị trang chủ và danh sách sản phẩm/dịch vụ giới thiệu.
- 🔐 **`auth` (Port: 8082):** Microfrontend xử lý luồng Đăng nhập (Login) / Đăng ký.
- 📊 **`dashboard` (Port: 8083):** Microfrontend hiển thị dữ liệu bảng điều khiển (chỉ vào được khi đã đăng nhập).

---

## 🛠️ 3. Công Nghệ Sử Dụng

- **ReactJS (@17.x):** Thư viện chính để xây dựng giao diện.
- **Webpack 5 (Module Federation Plugin):** Đây là **TRÁI TIM** của dự án. Plugin này cho phép một dự án Webpack (Container) có thể load code trực tiếp từ một dự án Webpack khác (Marketing, Auth...) đang chạy trên mạng ở thời gian thực (runtime).
- **React Router DOM:** Quản lý điều hướng URL linh hoạt giữa các khối.
- **Material-UI:** Áp dụng hệ thống UI cho các component thêm đẹp mắt.

---

## 💻 4. Cách Cài Đặt Và Chạy Dự Án (Local Development)

Vì đây là nhiều ứng dụng chạy song song, bạn cần mở nhiều cửa sổ Terminal (hoặc chia tab) để chạy từng App.

### Bước 1: Cài đặt thư viện (`node_modules`)
Bạn cần vào **từng thư mục một** (container, marketing, auth, dashboard) và chạy lệnh cài đặt:

```bash
# Terminal 1 - Container
cd container
npm install

# Terminal 2 - Marketing
cd marketing
npm install

# Terminal 3 - Auth
cd auth
npm install

# Terminal 4 - Dashboard
cd dashboard
npm install
```

### Bước 2: Chạy các dự án
Cũng ở 4 terminal đó, bạn chạy lệnh `npm start`:

```bash
# Trong mỗi terminal, chạy:
npm start
```

### Bước 3: Trải nghiệm
Mở trình duyệt lên và truy cập vào ứng dụng Container tại:
👉 **[http://localhost:8080](http://localhost:8080)**

Tại đây, bạn click vào thẻ "Login", ứng dụng sẽ ngầm tải file Javascript từ App `auth` (chạy cổng 8082) và hiển thị lên màn hình mà không hề phải tải lại hay chuyển trang (Chức năng này chính là sức mạnh của Module Federation).

---

## ☁️ 5. Hệ Thống CI/CD (Triển Khai Tự Động)

Một trong những ưu điểm lớn nhất của Microfrontend là **Triển khai độc lập (Independent Deployment)**. Dự án này tận dụng tính năng đó thông qua hệ thống **CI/CD bằng GitHub Actions** kết hợp với **Vercel** để hosting.

Bạn có thể tìm thấy các file cấu hình tại thư mục: `/.github/workflows/`
Các file bao gồm: `auth.yml`, `container.yml`, `dashboard.yml`, `marketing.yml`.

### Cách CI/CD Hoạt Động
Mỗi khi bạn đẩy code (Push) lên nhánh `main`, Github Actions sẽ kiểm tra xem bạn đã thay đổi code ở thư mục nào:

- ✂️ Nếu bạn **chỉ sửa** code trong thư mục `auth`, thì **chỉ duy nhất** workflow `auth.yml` được kích hoạt.
- 🚀 Nó sẽ tự động chuẩn bị môi trường, chạy `npm install`, `npm run build` và cuối cùng là tự động đẩy bản build mới nhất của cục `auth` lên server (Vercel).
- 🤫 Các khối khác (Marketing, Dashboard...) hoàn toàn không bị ảnh hưởng, không cần phải build hay deploy lại. Lỗi ở một khối sẽ không làm sập toàn bộ hệ thống!

### Yêu cầu cấu hình cho CI/CD:
Để các workflows này có thể tự động chạy thành công, Repository của bạn trên Github cần được cấu hình các **Secrets** cần thiết:
- `VERCEL_TOKEN`: Token dùng để xác thực và cho phép tự động deploy lên Vercel.
- Các Domain trỏ tới các apps con tương ứng như: `PRODUCTION_MARKETING_DOMAIN`, `PRODUCTION_AUTH_DOMAIN`, v.v (Được phục vụ cho việc build của Container).

---
*Hy vọng qua file README này, các bạn Junior có thể dễ dàng nắm bắt được cách dự án hoạt động cũng như thế mạnh thực sự của kiến trúc Microfrontend! Chúc bạn code thật vui!*
