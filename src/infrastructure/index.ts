import {ExtShip, ExtShipsListResponse, IGetShipsListPayload} from "@/infrastructure/ships/get-ships-list";



export default class Infrastructure {
    ships = {
        getShipsList(payload: IGetShipsListPayload): Promise<ExtShipsListResponse> {
            return import("./ships/get-ships-list").then(module =>
                module.getShipsList(payload)
            );
        },
        getShip(id: string): Promise<ExtShip | null> {
            return import("./ships/get-ship").then(module =>
                module.getShip(id)
            );
        },
        toggleFavorite(id: string) {
            return import("./ships/toggle-favorite").then(module =>
                module.toggleFavorite(id)
            );
        },
    };
}
