import faker from '@faker-js/faker'

export const buildUser = () => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
})
