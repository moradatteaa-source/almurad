import fetch from "node-fetch";

console.log("🚀 إرسال طلب تجريبي إلى الوسيط...");

const token = "@@958ecbc1dc5f1eab205849253585ebdb2099267e7509fe800d"; // ✅ توكنك الحقيقي من testLogin.js

const url = `https://api.alwaseet-iq.net/v1/merchant/create-order?token=${token}`;

// ✅ بيانات الطلب التجريبية
const payload = {
  client_name: "احمد محمد",
  client_mobile: "+9647800000000", // لازم يكون بهذا التنسيق بالضبط
  client_mobile2: "+9647711111111",
  city_id: 1, // أي ID من waseetCities.js
  region_id: 10, // أي ID من waseetRegions.js ضمن نفس المدينة
  location: "بغداد - الكرادة داخل",
  type_name: "ملابس رجالية",
  items_number: 2,
  price: 25000,
  package_size: 1,
  merchant_notes: "يرجى الاتصال قبل التوصيل",
  replacement: 0, // 🔥 ضروري جداً
};

try {
  const response = await fetch(url, {
    method: "POST",
    body: new URLSearchParams(payload),
  });

  const data = await response.json();
  console.log("📦 استجابة الوسيط:\n", data);
} catch (err) {
  console.error("❌ خطأ أثناء إنشاء الطلب:", err);
}
