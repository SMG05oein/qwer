export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const { pullAddress } = event.queryStringParameters || {};

  if (!pullAddress) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "pullAddress 파라미터가 필요합니다." }),
    };
  }

  const apiUrl = `http://54.180.25.62:8080${pullAddress}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": event.headers.authorization || "",
      },
      body: event.body,
    });

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    let responseBody;
    if (isJson) {
      responseBody = await response.json();
    } else {
      responseBody = await response.text();
    }

    return {
      statusCode: response.status, // ✅ 상태코드 그대로 유지
      headers: { "Content-Type": "application/json" }, // ✅ 강제 명시
      body: JSON.stringify(responseBody),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "API 호출 실패", details: err.message }),
    };
  }
}
