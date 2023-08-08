export const postApi = async (url: string, data: any) => {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    const jsonRes = await res.json();
    if (!res.ok) throw new Error(getErrorMessage(jsonRes));
    return jsonRes;
}

export const putApi = async (url: string, data: any, token: any) => {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    if (token) headers.append("Authorization", "Bearer " + token);


    const res = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
    });
    const jsonRes = await res.json();
    if (!res.ok) throw new Error(getErrorMessage(jsonRes));
    return jsonRes;
}

export const getApi = async (url: string, token?: any) => {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    if (token) headers.append("Authorization", "Bearer " + token);

    const res = await fetch(url, {
        method: "GET",
        headers: headers,
    });
    const jsonRes = await res.json();
    if (!res.ok) throw new Error(jsonRes.message);
    return jsonRes;
}

const getErrorMessage = (error: any) => {
    if (error.msg) {
        return error.msg;
    }
    return error.message;
}



