'use server';

import { promises as fs } from 'fs';

export async function parseDocument() {
  //Read document
  let response = {
    data: '',
    status: '500',
    success: false,
  };
  try {
    const file = await fs.readFile(process.cwd() + '/api/data.csv', 'utf8');
    let stringData = file.split(',');
    let data = stringData[0].split('\n');

    response.data = JSON.stringify(data);
    response.status = '200';
    response.success = true;
    return response;
  } catch (error) {
    console.log(error);
    response.data = 'Internal Server Error';
    response.status = '500';
    response.success = false;
    return response;
  }
}
