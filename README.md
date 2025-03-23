---

# 🌐 URL Shortener

A **URL Shortener** application built with **React**, **Node.js**, **MongoDB**, **Tailwind CSS**, and containerized using **Docker**. **Nginx** acts as a reverse proxy and load balancer to handle API requests.

---

## 🛠 Tech Stack
- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js (Express)
- **Database**: MongoDB
- **Reverse Proxy / Load Balancing**: NGINX
- **Containerization**: Docker & Docker Compose

---

## 📂 Project Structure
```
├── Client/           # React + Tailwind frontend
├── Server/           # Node.js Express backend
├── nginx/nginx.conf  # Nginx configuration for load balancing
├── docker-compose.yml
└── README.md
```

---

## ⚙️ How the Design Works (Architecture & Communication)
### 🔄 **Flow:**
1. **User interacts with React frontend** (served on `localhost:5173`).
2. **Frontend** sends API requests to **NGINX** (running on `localhost:8080`).
3. **NGINX**:
   - Proxies `/api/` requests to **one of the 3 Node.js backend containers** (Load Balancing using Round Robin).
   - Proxies other frontend routes directly to React (if needed).
4. **Backend (Node.js)** interacts with **MongoDB** to:
   - Store shortened URLs.
   - Retrieve original URLs for redirection.
5. **Response** travels back through NGINX to the **frontend**.

---

## 🚀 Running the Project
### ✅ **Step 1: Clone the repository**
```bash
git clone <your-repo-url>
cd <your-project-directory>
```

### ✅ **Step 2: Run the app with Docker Compose**
```bash
docker-compose up --build
```
This builds and runs:
- React frontend (`localhost:5173`)
- 3 backend Node.js containers
- MongoDB container
- NGINX load balancer (`localhost:8080`)

---

## 🔗 **Access Points**
| Service        | URL                      |
|----------------|--------------------------|
| **Frontend**   | http://localhost:5173/   |
| **API**        | http://localhost:8080/api |
| **Short URL**  | http://localhost:8080/<short-code> |

---

## 📈 Example Usage
- Shorten URL:
```javascript
axios.post('http://localhost:8080/api/shorten', { longUrl: 'https://example.com' })
```
- Access shortened URL:
```
http://localhost:8080/zGLg9tZ6
```
It redirects to the original long URL.

---

## 🧠 Load Balancing Logic
NGINX **upstream block**:
```nginx
upstream backend_cluster {
    server backend1:5000;
    server backend2:5000;
    server backend3:5000;
}
```
Every `/api/` call is distributed between the three backend servers, improving scalability and handling concurrent requests.

---

## 🎨 Styling
The frontend uses **Tailwind CSS** for clean, responsive UI.

---

## 🐳 Docker Commands Cheat Sheet
| Command                                   | Description                          |
|-------------------------------------------|--------------------------------------|
| `docker-compose up --build`               | Build and start all containers       |
| `docker-compose down`                     | Stop and remove containers           |
| `docker ps`                               | List running containers              |
| `docker logs <container_id>`              | View logs of a specific container    |

---

## 💻 Example API Request
```javascript
const { data } = await axios.post('http://localhost:8080/api/shorten', {
    longUrl: 'https://openai.com'
});
console.log(data.shortUrl); // http://localhost:8080/abc123
```

---

## ✅ Future Improvements
- Add rate limiting to prevent abuse
- Analytics for each short URL
- JWT authentication for users

---

## 📜 License
MIT License

---

Let me know if you want this in Markdown format or ready to paste! Would you like badges added too?
