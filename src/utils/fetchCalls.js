export const fetchData = async (url) => {
  let response = await fetch(url);
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