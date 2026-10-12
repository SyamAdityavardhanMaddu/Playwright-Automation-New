import { test, expect } from '@playwright/test';

test('Verify GET API response', async ({ request }) => {

    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.id).toBe(1);

    expect(responseBody.title).toBeTruthy();

    console.log(responseBody);

});