import "@wordpress/blocks";

declare module "@wordpress/blocks" {
    interface BlockSupports {
        readonly interactivity?: Bool;
    }
}
