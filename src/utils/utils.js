//TODO: Find a way or reusing the code

export function manageRequestResponse(options, url) {

    
    return new Promise((resolve, reject) => {
        fetch(url, options).then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
        })
        .catch(error => {
            reject(error);
        });;
  });
}

