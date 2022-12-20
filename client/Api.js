class Api {
  url = '';

  constructor(url) {
    this.url = url;
  }

  /* Create = POST */
  create(data) {
    const JSONData = JSON.stringify(data);
    console.log(`Sending ${JSONData} to ${this.url}`);

    const request = new Request(this.url, {
      method: 'POST',
      body: JSONData,
      headers: {
        'content-type': 'application/json'
      }
    });

    return fetch(request)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  /* Read = GET */
  getAll() {
    return fetch(this.url)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  /* Delete = DELETE */
  remove(id) {
    console.log(`Removing task with id ${id}`);
    /*  Fixa i server/app.js --> res.header('Access-Control-Allow-Methods', '*');, starta om server */

    return fetch(`${this.url}/${id}`, {
      method: 'DELETE'
    })
      .then((result) => result)
      .catch((err) => console.log(err));
  }
  
  completed(id, completed) {
    const JSONData = JSON.stringify({ id, completed });
    
    return (result = fetch(url, {
      method: "PATCH",
      body: JSONData,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => data));
  }
}
