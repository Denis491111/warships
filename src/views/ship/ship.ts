import {defineComponent, onBeforeMount, ref, watch} from "vue";
import Infrastructure from "@/infrastructure";
import {useRoute} from "vue-router";
import {ExtShip} from "@/infrastructure/ships/get-ships-list";
import Loader from "@/components/loader/loader.vue";
import {shipAdapter} from "@/views/ship/adapter";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs.vue";
import {IBreadcrumbsItem} from "@/components/breadcrumbs/breadcrumbs";
import {IShipDetail} from "@/views/ship/types";
import i18n from "@/i18n";
import {keyFavorite} from "@/common/const";
const Infra = new Infrastructure();

export default defineComponent({
    name: "Ship",
    components: {
        Loader,
        Breadcrumbs
    },
    setup: () => {
        const ui = ref({
            isLoading: false,
            isServerError: false,
            isShipNotFound: false,
            breadcrumbs: [
                {
                    name: (i18n.global as any).t("Список кораблей"),
                    to: "/"
                }
            ] as Array<IBreadcrumbsItem>,
            isOpenedPopup: false
        });
        const route = useRoute();
        const isItemFavorite = ref<boolean>(!!localStorage.getItem(keyFavorite) && !!JSON.parse(localStorage.getItem(keyFavorite) as string).includes(route.params.id));

        onBeforeMount(() => {
            ui.value.isLoading = true;
            getShip().finally(() => {
                ui.value.isLoading = false;
            })
        });

        const ship = ref<IShipDetail | null>(null);

        const getShip = () => {
            return Infra.ships.getShip(route.params.id as string).then((response: ExtShip | null) => {
                if(!!response) {
                    ship.value = shipAdapter(response);
                    ui.value.breadcrumbs.push({
                        name: ship.value.name
                    })
                } else {
                    ui.value.isShipNotFound = true;
                }
            }).catch(() => {
                ui.value.isServerError = true;
            })
        };

        watch(
            ui,
            () => {
                if(ui.value.isOpenedPopup) {
                    (document.querySelector("body") as HTMLElement).classList.add("popup-opened");
                    document.addEventListener("keydown", handleKeyPressEscOnDocument);
                } else {
                    (document.querySelector("body") as HTMLElement).classList.remove("popup-opened");
                    document.removeEventListener("keydown", handleKeyPressEscOnDocument);
                }
            },
            { deep: true }
        );

        const handleKeyPressEscOnDocument = (event: KeyboardEvent) => {
            if (event.key === "Escape" || event.key === "Esc" || event.key === "27") {
                ui.value.isOpenedPopup = false;
            }
        }

        const toggleItemFavorite = () => {
            Infra.ships.toggleFavorite(route.params.id as string);
            isItemFavorite.value = !isItemFavorite.value;
        }

        return {ui, ship, isItemFavorite, toggleItemFavorite}
    }
});
