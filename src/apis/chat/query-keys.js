export const chatKeys = {
  all: ['chat'],
  models: () => [...chatKeys.all, 'models'],
  lists: () => [...chatKeys.all, 'list'],
  list: (q = '') => [...chatKeys.lists(), q],
  details: () => [...chatKeys.all, 'detail'],
  detail: (id) => [...chatKeys.details(), id],
}
