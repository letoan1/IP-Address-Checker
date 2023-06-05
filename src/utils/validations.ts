export const isValidIpAddress = (value: string) => {
  const ipv4RegExp = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6RegExp = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv4RegExp.test(value) || ipv6RegExp.test(value);
};

export const isDomainName = (value: string) => {
  const domainRegExp =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  return domainRegExp.test(value);
};
