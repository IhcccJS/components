function getError(url, option, xhr) {
  const msg = `cannot ${option.method} ${url} ${xhr.status}'`;
  const err = new Error(msg);
  err.status = xhr.status;
  err.method = option.method;
  err.url = url;
  return err;
}

function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

function upload(url, option) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    if (option.onProgress && xhr.upload) {
      xhr.upload.onprogress = function progress(e) {
        if (e.total > 0) {
          e.percent = (e.loaded / e.total) * 100;
        }
        option.onProgress(e);
      };
    }

    const formData = new FormData();

    if (option.data) {
      Object.keys(option.data).forEach((key) => {
        const value = option.data[key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }

        formData.append(key, value);
      });
    }

    if (option.file instanceof Blob) {
      formData.append(option.filename || 'file', option.file, option.file.name);
    } else {
      formData.append(option.filename || 'file', option.file);
    }

    xhr.onerror = function error(e) {
      reject(e);
    };

    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(getError(url, option, xhr), getBody(xhr));
        return;
      }

      resolve(getBody(xhr), xhr);
      return;
    };

    xhr.open(option.method, url, true);

    if (option.withCredentials && 'withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    const headers = option.headers || {};

    if (headers['X-Requested-With'] !== null) {
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }

    Object.keys(headers).forEach((h) => {
      if (headers[h] !== null) {
        xhr.setRequestHeader(h, headers[h]);
      }
    });

    xhr.send(formData);

    return {
      abort() {
        xhr.abort();
      },
    };
  });
}

export default upload;
