export const chatKeys = {
  all: ['chat'],
  models: () => [...chatKeys.all, 'models'],
  lists: () => [...chatKeys.all, 'list'],
  details: () => [...chatKeys.all, 'detail'],
  detail: (id) => [...chatKeys.details(), id],
}
