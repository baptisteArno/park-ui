import v from 'voca'

const pascalCase = (s: string) => v.chain(s).camelCase().capitalize().value()
const camelCase = (s: string) => v.chain(s).camelCase().value()

const main = async () => {
  const component = process.argv.slice(2)[0]

  const data = await fetch(`https://ark-ui.com/api/types/react/${component}`).then((res) =>
    res.json(),
  )

  Object.entries(data)
    .sort(([key]) => (key === 'Root' ? -1 : 1))
    .map(([name, value]) => {
      if (name === 'Root') {
        console.log(
          `export interface ${name}Props extends Assign<JsxStyleProps, ${pascalCase(
            component,
          )}.${name}Props>, ${pascalCase(component)}VariantProps {}`,
        )
        console.log(
          // @ts-expect-error
          `export const ${name} = withProvider<${value.element}, ${name}Props>(${pascalCase(
            component,
          )}.${name}, '${camelCase(name)}')\n`,
        )
      } else {
        console.log(
          `export interface ${name}Props extends Assign<JsxStyleProps, ${pascalCase(
            component,
          )}.${name}Props> {}`,
        )
        console.log(
          // @ts-expect-error
          `export const ${name} = withContext<${value.element}, ${name}Props>(${pascalCase(
            component,
          )}.${name}, '${camelCase(name)}')\n`,
        )
      }
    })
}

main()
