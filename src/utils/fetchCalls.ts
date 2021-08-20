export const fetchData = async (url: string) => {
  let projectURL = `https://github.com/alexmkio/can-i`
  let email = `alexandermartelkio@gmail.com`
  const headers = {
    'User-Agent': `(${projectURL}, ${email})`
  }
  const opts = {
    method: 'GET',
    headers
  }

  let response = await fetch(url, opts);
  return checkForError(response);
};

const checkForError = async (response: Response) => {
  if (!response.ok) {
    throw new Error(response.status.toString());
  } else {
    let data = await response.json()
    return data
  }
}