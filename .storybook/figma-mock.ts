const figma = {
  string: (_name: string) => "",
  boolean: (_name: string) => false,
  enum: <T extends Record<string, string | number>>(
    _name: string,
    options: T
  ): T[keyof T] => Object.values(options)[0],
  instance: (_name: string) => "",
  code: (strings: TemplateStringsArray, ..._values: unknown[]) =>
    strings.join(""),
};

export default figma;
