const initialUsers = [
  { id: 1, name: 'Thomas', age: 25 },
  { id: 2, name: 'Anna', age: 22 },
  { id: 3, name: 'John', age: 35 },
  { id: 4, name: 'Monique', age: 23 },
  { id: 5, name: 'Xavier', age: 34 }
];

let users = [...initialUsers];
let nextId = 6;

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
}

function getUserId(path) {
  const segments = path.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  const userId = Number(lastSegment);

  return Number.isInteger(userId) ? userId : null;
}

exports.handler = async (event) => {
  const { httpMethod, path } = event;
  const userId = getUserId(path);

  if (httpMethod === 'GET' && userId === null) {
    return json(200, users);
  }

  if (httpMethod === 'POST' && userId === null) {
    const data = JSON.parse(event.body || '{}');
    const name = String(data.name || '').trim();
    const age = Number(data.age);

    if (!name || Number.isNaN(age)) {
      return json(400, { error: 'Name and age are required' });
    }

    const user = { id: nextId, name, age };
    users.push(user);
    nextId += 1;
    return json(201, user);
  }

  if (userId === null) {
    return json(404, { error: 'User not found' });
  }

  const existingUser = users.find((user) => user.id === userId);

  if (!existingUser) {
    return json(404, { error: 'User not found' });
  }

  if (httpMethod === 'PUT') {
    const data = JSON.parse(event.body || '{}');
    const name = String(data.name || '').trim();
    const age = Number(data.age);

    if (!name || Number.isNaN(age)) {
      return json(400, { error: 'Name and age are required' });
    }

    existingUser.name = name;
    existingUser.age = age;
    return json(200, existingUser);
  }

  if (httpMethod === 'DELETE') {
    users = users.filter((user) => user.id !== userId);
    return json(200, { message: 'User deleted' });
  }

  return json(405, { error: 'Method not allowed' });
};
