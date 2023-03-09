import {defineComponent, onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";
import i18n from "@/i18n";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs.vue";
import {
    ExtShipsListResponse,
    IGetShipsListPayload,
    IGetShipsListSortingEnum
} from "@/infrastructure/ships/get-ships-list";
import {adapterShipsList} from "@/views/homepage/adapters";
import Infrastructure from "@/infrastructure";
import {IShipShort} from "@/views/homepage/types";
import Loader from "@/components/loader/loader.vue";
import Error from "@/components/error/error.vue";
import ShipCard from "@/components/ship-card/ship-card.vue";
import Pagination from "@/views/homepage/components/pagination/pagination.vue";
const Infra = new Infrastructure();

export default defineComponent({
    name: "Tag",
    components: {
        Breadcrumbs,
        Loader,
        Error,
        ShipCard,
        Pagination
    },
    setup: () => {
        const route = useRoute();
        const ui = ref({
            isListLoading: false,
            isListError: false,
            isListEmpty: false,
            isListUpdating: false,
            breadcrumbs: [
                {
                    name: "Список кораблей",
                    to: "/"
                },
                {
                    name: `${(i18n.global as any).t("Записи по тегу")} ${route.params.id}`
                }
            ]
        });
        const ships = ref<Array<IShipShort>>([]);

        onBeforeMount(() => {
            ui.value.isListLoading = true;
            getShipsList().finally(() => {
                ui.value.isListLoading = false;
            })
        });

        const listRequestData = ref<IGetShipsListPayload>({
            query: "",
            limit: 12,
            offset: 0,
            tagname: route.params.id as string,
            sorting_field: IGetShipsListSortingEnum.POPULAR,
            sorting_desc: false
        });

        const getShipsList = () => {
            return Infra.ships.getShipsList(listRequestData.value).then((response: ExtShipsListResponse) => {
                ui.value.isListError = false;
                ui.value.isListEmpty = false;
                ships.value = adapterShipsList(response.items);
                if(!response.items.length) {
                    ui.value.isListEmpty = true;
                }
                paging.value.total = Math.ceil(response.count / listRequestData.value.limit);
            }).catch(() => {
                ui.value.isListError = true;
            });
        };

        const paging = ref({
            current: 1,
            total: 0
        });

        const setPaging = (pagingValue: any) => {
            paging.value = pagingValue;
            listRequestData.value.offset = (pagingValue.current - 1) * listRequestData.value.limit;
            ui.value.isListUpdating = true;
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            })
            getShipsList().finally(() => {
                ui.value.isListUpdating = false;
            })
        };

        return {ui, ships, paging, setPaging}
    }
});
