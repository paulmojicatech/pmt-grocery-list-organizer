import { Observable } from "rxjs";
import { HeaderData } from "../state/app-state.interface";

export interface IHeaderDataService {
    getHeaderData: (headerData?: HeaderData) => Observable<HeaderData | undefined>;
    dispatchEvent: (headerData: HeaderData) => void;
}