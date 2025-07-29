export async function handler(event) {
  console.log("🔍 proxyGet 실행됨");
  console.log("📦 쿼리 파라미터:", event.queryStringParameters);
  console.log("🧾 헤더:", event.headers);

  const { pullAddress, ...restParams } = event.queryStringParameters || {};

  const searchParams = new URLSearchParams(restParams).toString();
  const apiUrl = `http://54.180.25.62:8080${pullAddress}`;
  console.log("📡 백엔드 호출 URL:", apiUrl);

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":
          event.headers.authorization || event.headers.Authorization || "",
      },
    });

    const text = await response.text();

    let data = null;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.warn("⚠️ JSON 파싱 실패:", parseError);
      console.log("📄 응답 원문:", text);

      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: "JSON 파싱 실패",
          statusCode: response.status,
          rawBody: text,
        }),
      };
    }

    console.log("✅ 백엔드 응답 데이터:", data);

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("❌ 프록시 에러:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API 호출 실패", details: error.message }),
    };
  }
}
