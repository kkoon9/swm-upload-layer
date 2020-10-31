import upload from './getUrl';

async function getArray(filePath) {
  const result = await upload(filePath);
  return result;
}

export default getArray;
