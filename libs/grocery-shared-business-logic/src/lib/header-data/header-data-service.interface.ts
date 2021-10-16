import { Observable } from "rxjs";
import { HeaderData } from "../state/app-state.interface";

export interface IHeaderDataService {
    getHeaderData: () => Observable<HeaderData>;
    dispatchEvent: (headerData: HeaderData) => void;
}