export const retry = async (fn: Function, maxRetry = 3) => {
  const errors = [];
  for (let i = 0; i < maxRetry; i++) {
    try {
      const res = await fn();
      return res;
    } catch (error) {
      errors.push(error);
      await new Promise((res) => setTimeout(res, 3000));
    }
  }
  throw errors;
};
