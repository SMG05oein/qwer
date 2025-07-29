export async function handler(event) {
    const query = event.queryStringParameters.q;
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${query}`;

    const response = await fetch(url, {
        headers: {
            Authorization: `KakaoAK ${process.env.KAKAOMAP_KEY}`
        }
    });

    const data = await response.json();
    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
}
