import { type HTMLArkProps, ark } from '@ark-ui/react/factory'
import { styled } from 'styled-system/jsx'
import { code } from 'styled-system/recipes'
import type { Assign, JsxStyleProps } from 'styled-system/types'

export const Code = styled(ark.code, code)
export interface CodeProps extends Assign<JsxStyleProps, HTMLArkProps<'code'>> {}
