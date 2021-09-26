export interface AppState{
    isLoading: boolean;
    expiringItems: { title: string; datePurchased: string; }[]
}