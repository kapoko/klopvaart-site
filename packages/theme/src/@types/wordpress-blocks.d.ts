export * from "@wordpress/blocks";

declare module "@wordpress/blocks" {
  interface BlockSupports {
    readonly interactivity?: boolean; // Still experimental so not supported out of the box
  }
}
