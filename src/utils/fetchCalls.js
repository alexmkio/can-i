export const fetchData = async (url) => {
  let response = await fetch(url, {
    'User-Agent': `(https://github.com/alexmkio/can-i,
      alexandermartelkio@gmail.com)`
  });
  return checkForError(response);
};

const checkForError = async (response) => {
  if (!response.ok) {
    throw new Error(response.status);
  } else {
    let data = await response.json()
    return data
  }
}