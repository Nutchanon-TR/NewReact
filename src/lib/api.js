async function getAllData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) {
        return { error: "not_found" };
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(`Fetch failed: ${error.message}`);
  }
}

async function getDataById(url, id) {
  try {
    const data = await fetch(`${url}/${id}`);
    if (data.status === 404) return undefined;
    const finalData = await data.json();
    return finalData;
  } catch (error) {
    throw new Error(error);
  }
}

async function addData(url, newData) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...newData,
      }),
    });
    const addedData = await res.json();
    return addedData;
  } catch (error) {
    throw new Error("can not add your Data");
  }
}

async function updateData(url, id, updatedData) {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!res.ok) {
      throw new Error("Failed to update data");
    }
    const updatedResponse = await res.json();
    return updatedResponse;
  } catch (error) {
    throw new Error("Cannot update your data");
  }
}

const deleteUserById = async (url, id) => {
  const res = await fetch(`${url}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = new Error("Request failed");
    error.status = res.status;
    error.json = () => res.json();
    throw error;
  }

  return res.status === 204;
};

export { getAllData, getDataById, addData, updateData, deleteUserById };
