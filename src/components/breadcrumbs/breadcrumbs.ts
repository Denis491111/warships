import { defineComponent } from "vue";

export interface IBreadcrumbsItem {
    name: string;
    to?: string;
}

export default defineComponent({
    name: "Breadcrumbs",
    props: ["items"],
    setup: () => {}
});
