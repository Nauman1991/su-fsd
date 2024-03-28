'use server';

import { promises as fs } from 'fs';
import type { GetServerSideProps } from 'next';

export async function parseDocument() {
  //Read document
  let response = {
    data: '',
    status: '500',
    success: false,
  };
  try {
    // const file = await fs.readFile(process.cwd() + '/api/data.csv', 'utf8');
    // const file = await fs.readFile('api/data.csv', 'utf8');
    const file = await fs.readFile('public/data.csv', 'utf8');
    let stringData = file.split(',');
    let data = stringData[0].split('\n');

    response.data = JSON.stringify(data);
    response.status = '200';
    response.success = true;
    return response;
  } catch (error) {
    console.log(error);
    response.data = JSON.stringify(`2023-06-25 11:00;1abc.txt
    2023-06-25 12:00;abc.txt
    2023-06-25 13:00;01abc.txt
    2023-06-25 14:00;0010abc.txt
    2023-06-25 15:00;011abc.txt
    2023-06-25 16:00;20-abc.txt
    2023-06-25 17:00;021-abc.txt
    2023-06-25 18:00;002-abc.txt
    2023-06-25 19:00;cba.txt
    2023-06-25 20:00;abc010.txt
    2023-06-25 21:00;abc1.txt`);
    response.status = '200';
    response.success = true;
    return response;
  }
}
