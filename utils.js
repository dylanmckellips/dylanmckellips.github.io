function includeHTML(elementId, file, callback) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error('File not found: ' + file);
      return response.text();
    })
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
      if (callback) callback();
    })
    .catch(error => {
      console.error('Error loading file:', error);
    });
}
