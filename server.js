import express from "express";
import fetch from "node-fetch";
import FormData from "form-data";
import cors from "cors";

const app = express();
// ✅ الصفحة الرئيسية للسيرفر
app.get("/", (req, res) => {
  res.send("✅ AlMurad Server is running successfully!");
});


// ✅ السماح بطلبات من أي موقع (مهم جداً لحل مشكلة CORS)
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ تسجيل الدخول (يرجع التوكن)
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("📩 Login request received:", { username, password });

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch("https://api.alwaseet-iq.net/v1/merchant/login", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("📩 Login response:", data);
    res.json(data);
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ status: false, msg: "Server Login Error" });
  }
});

// ✅ رفع الطلب
app.post("/api/create-order", async (req, res) => {
  try {
    const { token, ...payload } = req.body;
    console.log("📦 Create order request received:", payload);

    const formData = new FormData();
    for (const key in payload) {
      formData.append(key, payload[key] ?? "");
    }

    const url = `https://api.alwaseet-iq.net/v1/merchant/create-order?token=${token}`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("📦 Order response:", data);
    res.json(data);
  } catch (err) {
    console.error("❌ Error creating order:", err);
    res.status(500).json({ status: false, msg: "Server Error" });
  }
});

app.listen(process.env.PORT || 3000, () => 
  console.log(`✅ Server running on port ${process.env.PORT || 3000}`)
);

