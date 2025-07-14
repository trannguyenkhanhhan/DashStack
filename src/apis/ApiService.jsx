const baseUrl = 'https://mindx-mockup-server.vercel.app/api/resources/';
const apiKey = '686ba790c92895417ae77089';

const ApiService = {
  callApiAsync: async (resources, method = "GET", data = null, id = "") => {

    const url = `${baseUrl}${resources}${id ? `/${id}` : ""}?apiKey=${apiKey}`;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    });

    return await res.json();
  },
};

export default ApiService;