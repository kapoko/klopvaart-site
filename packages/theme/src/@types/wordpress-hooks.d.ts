import type { BlockEditProps } from "@wordpress/blocks";

declare module "@wordpress/hooks" {
  interface BlockEditPropsWithName<
    T extends Record<never, never> = Record<never, never>,
  > extends BlockEditProps<T> {
    name: string;
  }
}
