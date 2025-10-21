import fetch from "node-fetch";

const LOGIN_URL = "https://api.alwaseet-iq.net/v1/merchant/login";

const formData = new URLSearchParams({
  username: "ramadan@almurad",
  password: "ramadan1998@"
});

async function testLogin() {
  try {
    console.log("⏳ تسجيل الدخول إلى الوسيط...");
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    console.log("✅ النتيجة الكاملة من الوسيط:");
    console.log(data);

    if (data.status) {
      console.log("\n🔑 التوكن:");
      console.log(data.data.token);
    } else {
      console.log("\n❌ فشل تسجيل الدخول:", data.msg);
    }
  } catch (err) {
    console.error("⚠️ خطأ أثناء تسجيل الدخول:", err);
  }
}

testLogin();
