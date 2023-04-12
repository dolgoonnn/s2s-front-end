import useSWR, { mutate } from "swr";
import { isUserLoggedIn } from "./auth";
import { getProductById, getUserProfile, getProducts } from "./service";

// return user profile if user logged in
export function useUserProfile(userId) {
    //useSWR cache user information once and use it anywhere
    //when it comes to change mutate function used

    const { data, error } = useSWR(`/api/users/profile/${userId}`, async () =>
        getUserProfile(userId)
    );

    if (!isUserLoggedIn())
        return { data: undefined, loading: false, error: undefined };

    return { data, loading: !data && !error, error };
}

export function useProfileById(userId) {
    const { data, error } = useSWR(`/api/users/profile/${userId}`, async () =>
        getUserProfile(userId)
    );
    return { data, loading: !data && !error, error };
}

export function mutateUserProfile(id) {
    mutate(`/api/users/profile/${id}`);
}

export function mutateCourseCompleted(id) {
    mutate(`/api/courses/${id}/complete`);
}

export async function mutateProfile() {
    mutate("/api/users/profile");
}

export async function mutateProfilePayment() {
    mutate("/api/users/purchase");
}

export function useProductById(id) {
    const { data, error } = useSWR(`/api/products/${id}`, async () =>
        getProductById(id)
    );

    return { data, loading: !data && !error, error };
}

export function useProducts() {
    const { data, error } = useSWR(
        `/api/productCollections/1/product`,
        async () => getProducts()
    );

    return { data, loading: !data && !error, error };
}

export function mutateProductById(productId) {
    mutate(`/api/products/${productId}`);
}
