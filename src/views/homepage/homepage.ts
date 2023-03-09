import {defineComponent, onBeforeMount, ref, watch} from "vue";
import Loader from "@/components/loader/loader.vue";
import Infrastructure from "@/infrastructure";
import {
    ExtShipsListResponse,
    IGetShipsListPayload, IGetShipsListSortingEnum
} from "@/infrastructure/ships/get-ships-list";
import {IShipShort} from "@/views/homepage/types";
import {adapterShipsList} from "@/views/homepage/adapters";
import Pagination from "@/views/homepage/components/pagination/pagination.vue";
import Error from "@/components/error/error.vue";
import debounce from "@/common/debounce";
import i18n from "@/i18n";
import ShipCard from "@/components/ship-card/ship-card.vue";
const Infra = new Infrastructure();

export default defineComponent({
    name: "HomePage",
    components: {
        Loader,
        Pagination,
        Error,
        ShipCard
    },
    setup: () => {
        const listRequestData = ref<IGetShipsListPayload>({
            query: "",
            limit: 12,
            offset: 0,
            tagname: "",
            sorting_field: IGetShipsListSortingEnum.POPULAR,
            sorting_desc: false
        });
        const listShips = ref<Array<IShipShort>>([]);
        const ui = ref({
            isListLoading: false,
            isListError: false,
            isListEmpty: false,
            isListUpdating: false,
            sortingVariants: [
                {
                    name: (i18n.global as any).t("по популярности"),
                    id: IGetShipsListSortingEnum.POPULAR
                },
                {
                    name: (i18n.global as any).t("по названию"),
                    id: IGetShipsListSortingEnum.NAME
                },
                {
                    name: (i18n.global as any).t("по уровню"),
                    id: IGetShipsListSortingEnum.LEVEL
                }
            ]
        });
        const paging = ref({
            current: 1,
            total: 0
        });

        const getShipsList = () => {
            return Infra.ships.getShipsList(listRequestData.value).then((response: ExtShipsListResponse) => {
                ui.value.isListError = false;
                ui.value.isListEmpty = false;
                listShips.value = adapterShipsList(response.items);
                if(!response.items.length) {
                    ui.value.isListEmpty = true;
                }
                paging.value.total = Math.ceil(response.count / listRequestData.value.limit);
            }).catch(() => {
                ui.value.isListError = true;
            });
        };

        onBeforeMount(() => {
            ui.value.isListLoading = true;
            getShipsList().finally(() => {
                ui.value.isListLoading = false;
            })
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

        const debouncedSearch = (value: string) => {
            listRequestData.value.query = value;
            searchItemsByQuery();
        };

        const searchItemsByQuery = debounce(() => {
            listRequestData.value.limit = 12;
            listRequestData.value.offset = 0;
            ui.value.isListUpdating = true;
            getShipsList().finally(() => {
                ui.value.isListUpdating = false;
            })
        });

        const setSorting = (id: IGetShipsListSortingEnum) => {
            if(id === listRequestData.value.sorting_field) {
                listRequestData.value.sorting_desc = !listRequestData.value.sorting_desc;
            } else {
                listRequestData.value.sorting_field = id;
                listRequestData.value.sorting_desc = false;
            }
            ui.value.isListUpdating = true;
            getShipsList().finally(() => {
                ui.value.isListUpdating = false;
            })
        }

        return {ui, listShips, paging, setPaging, listRequestData, debouncedSearch, setSorting};
    }
});
