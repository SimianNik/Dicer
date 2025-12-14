function secureRandomInt(max: number): number {
  const range = max;
  const maxValid = 256 - (256 % range);

  let array = new Uint8Array(1);

  do {
    crypto.getRandomValues(array);
  } while (array[0] >= maxValid);

  return (array[0] % range) + 1;
}

export {secureRandomInt}