import Exception from './http.exception';

class Thrower {
  constructor(param: string) {
    throw new Exception(400, `${param} is required`);
  }
}

export default Thrower;
