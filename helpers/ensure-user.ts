import { APIRequestContext } from '@playwright/test';

const apiUrl = 'https://api.realworld.show/api';

export type TestUser = {
  email: string;
  password: string;
  username: string;
};

export const editorUser: TestUser = {
  email: 'automation.editor@test.com',
  password: 'AutoPassword123',
  username: 'automation.editor',
};

export const loginUser: TestUser = {
  email: 'automation.editor@test.com',
  password: 'AutoPassword123',
  username: 'automation.login',
};

export async function ensureUser(request: APIRequestContext, user: TestUser) {
  const loginResponse = await request.post(`${apiUrl}/users/login`, {
    data: {
      user: {
        email: user.email,
        password: user.password,
      },
    },
  });

  if (!loginResponse.ok()) {
    await request.post(`${apiUrl}/users`, {
      data: { user },
    });
  }
}
