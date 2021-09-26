import { Observable } from "rxjs";
import { HeaderData } from "../state/app-state.interface";

export interface IHeaderDataService {
    getHeaderData: (headerDataToDispatch: HeaderData) => Observable<HeaderData | undefined>;
}