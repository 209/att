const LIST_COUNT = 5;
const users = [];
for (let i = 0; i < 1000000; i += 1) {
  users.push({
    id:     i,
    name:   `name_${i}`,
    avatar: '',
  });
}

export const getUsersMock = term => {
  return new Promise((resolve, reject) => {
    const result = users
      .filter(user => user.name.indexOf(term) === 0)
      .slice(0, LIST_COUNT);

    resolve({
      result,
      nextPageUrl:     LIST_COUNT,
      previousPageUrl: '',
    });
  });
};

export const getUsersURLMock = (term, offset) => {
  return new Promise((resolve, reject) => {
    const nextOffset = offset + LIST_COUNT;
    const beginIndex = offset;
    const endIndex = nextOffset - 1;

    const result = users
      .filter(user => user.name.indexOf(term) === 0)
      .slice(beginIndex, endIndex);

    resolve({
      result,
      nextPageUrl:     nextOffset,
      previousPageUrl: '',
    });
  });
};
