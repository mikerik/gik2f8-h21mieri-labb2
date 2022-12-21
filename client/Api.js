class Api {
  url = "";
  constructor(url) {
    this.url = url;
  }

  create = async (data) => {
    const JSONData = JSON.stringify(data);
    console.log(`Sending ${JSONData} to ${this.url}`);
    const request = new Request(this.url, {
      method: "POST",
      body: JSONData,
      headers: {
        "content-type": "application/json",
      },
    });
    try {
      const result = await fetch(request);
      const data = await result.json();
      return data;
    } catch (err) {
      return err;
    }
  };

  getAll = async () => {
    try {
      const result = await fetch(this.url);
      const data = await result.json();
      return data;
    } catch (err) {
      return err;
    }
  };

  remove = async (id) => {
    console.log(`Removing task with id ${id}`);
    try {
      const result = await fetch(`${this.url}/${id}`, {
        method: "DELETE",
      });
      return result;
    } catch (err) {
      return err;
    }
  };

  update = async (id, data) => {
    const JSONData = JSON.stringify(data);

    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: "PATCH",
        body: JSONData,
        headers: {
          "content-type": "application/json",
        },
      });
      const result = await response.json();
      return result;
    } catch (err) {
      return err;
    }
  };
}
