import useSWR, { mutate } from 'swr';
import axiosClient from './axios';

export function register(data) {
    return axiosClient
        .post('/api/users/register', { ...data })
        .then((response) => {
            return response;
        });
}

export function login(data) {
    return axiosClient
        .post('/api/users/login', { ...data })
        .then((response) => {
            return response;
        });
}

export function forgotPassword(data) {
    return axiosClient
        .post('/api/user/forgot-password', { ...data })
        .then((response) => {
            return response;
        });
}

export function resetPassword(data) {
    return axiosClient
        .post('/api/user/reset-password', { ...data })
        .then((response) => {
            return response;
        });
}

export function savePhoneNumber(data) {
    return axiosClient
        .post('/api/me/phoneNumber', { ...data })
        .then((response) => {
            return response;
        });
}

export function verifyPhoneNumber(data) {
    return axiosClient
        .post('/api/me/phoneNumber/verify', { ...data })
        .then((response) => {
            return response;
        });
}

export function getUserProfile(id) {
    if (id && typeof id !== 'object') {
        return axiosClient.get(`/api/users/profile/${id}`).then((response) => {
            return response?.data;
        });
    } else {
        // `id` is not an object with a `data` property
        // Handle the error or undefined case here
    }
}

export function updateUserProfile(data) {
    return axiosClient
        .put(`/api/users/profile`, { ...data })
        .then((response) => {
            return response;
        });
}

export function getCoursesByCategory() {
    return axiosClient.get(`/api/categories/1/courses`).then((response) => {
        return response?.data;
    });
}

export function useCoursesByCategory() {
    const { data, error } = useSWR(`categories/1/courses`, async () =>
        getCoursesByCategory()
    );

    return { data, error };
}

export function getCourseById(id) {
    return axiosClient.get(`/api/courses/${id}`).then((response) => {
        return response.data;
    });
}

export function getCourseByIdInDetail(id) {
    return axiosClient.get(`/api/courses/${id}`).then((response) => {
        return response;
    });
}

export function getProductById() {
    return axiosClient.get(`/api/products/3`).then((response) => {
        return response;
    });
}

export function getProducts() {
    return axiosClient
        .get(`/api/productCollections/1/product`)
        .then((response) => {
            return response;
        });
}

export function getProductPayment(id) {
    return axiosClient.get(`/api/products/payment/${id}`).then((response) => {
        return response;
    });
}

export function getUserPayment() {
    return axiosClient.get(`/api/users/purchase`).then((response) => {
        return response;
    });
}

export function checkPaymentIsDone(invoiceId) {
    return axiosClient
        .get(`/api/payments/checkQpayV2/${invoiceId}`)
        .then((response) => {
            return response;
        });
}

export function getGivebackToken(id) {
    return axiosClient
        .post(`/api/courses/${id}/givebackToken`)
        .then((response) => {
            return response;
        });
}

export function useCourseById(id) {
    const { data, error } = useSWR(`/api/courses/${id}`, async () =>
        getCourseById(id)
    );

    return { data, loading: !data && !error, error };
}

export function mutateCourseById(id) {
    mutate(`/api/courses/${id}`);
}

export function getSubCourseById(id) {
    return axiosClient.get(`/api/subCourses/${id}`).then((response) => {
        return response;
    });
}

export function getSubcoureActivity() {
    return axiosClient.get(`/api/subCourses/activity`).then((response) => {
        return response;
    });
}

export function useSubcourseActivity() {
    const { data, error } = useSWR(`/api/subCourses/activity`, async () =>
        getSubcoureActivity()
    );

    return { data, loading: !data && !error, error };
}

export function getSubCourseByIdAdmin(id) {
    return axiosClient.get(`/api/admin/subCourses/${id}`).then((response) => {
        return response?.data;
    });
}

export function mutateSubCourseById(id) {
    mutate(`/api/subCourses/${id}`);
}

export function useSubCourseById(id) {
    const { data, error } = useSWR(`/api/subCourses/${id}`, async () =>
        getSubCourseById(id)
    );

    return { data, loading: !data && !error, error };
}

export function useSubCourseByIdAdmin(id) {
    const { data, error } = useSWR(`/api/admin/subCourses/${id}`, async () =>
        getSubCourseByIdAdmin(id)
    );

    return { data, loading: !data && !error, error };
}

export function getSubcourseCompletionById(id) {
    return axiosClient.get(`/api/courses/${id}/complete`).then((response) => {
        return response?.data;
    });
}

export function createChapter(id, data) {
    return axiosClient
        .post(`/api/admin/courses/${id}/chapter`, { ...data })
        .then((response) => {
            return response;
        });
}

export function updateSubCourse(id) {
    return axiosClient
        .put(`/api/admin/subCourses/${id}`, { ...data })
        .then((response) => {
            return response;
        });
}

export function deleteChapter(id, data) {
    return axiosClient
        .post(`/api/admin/courses/${id}/chapter`)
        .then((response) => {
            return response;
        });
}

export function createSubCourse(data) {
    return axiosClient
        .post(`/api/admin/subCourses`, { ...data })
        .then((response) => {
            return response;
        });
}

export function enrollCourse(id) {
    return axiosClient.post(`/api/courses/${id}`).then((response) => {
        return response;
    });
}

export function enrollCourseByMonk(id, data) {
    return axiosClient
        .post(`/api/courses/${id}`, { ...data })
        .then((response) => {
            return response;
        });
}

export function getEnrolledCourses() {
    return axiosClient.get(`/api/courses/enrolledCourses`).then((response) => {
        return response;
    });
}

export function useCourseEnrolled() {
    const { data, error } = useSWR(`/api/courses/enrolledCourses`, async () =>
        getEnrolledCourses()
    );

    return { data, loading: !data && !error, error };
}

export function getSingleCourseEnrolled(id) {
    return axiosClient.get(`/api/courses/${id}/enrollment`).then((response) => {
        return response;
    });
}
export function useSingleCourseEnrolled(id) {
    const { data, error } = useSWR(`/api/course/${id}/enrollment`, async () =>
        getSingleCourseEnrolled(id)
    );

    return { data, loading: !data && !error, error };
}

export function getCourseCompleted(id) {
    return axiosClient.get(`/api/courses/${id}/complete`).then((response) => {
        return response;
    });
}

export function useCourseCompleted(id) {
    const { data, error } = useSWR(`/api/courses/${id}/complete`, async () =>
        getCourseCompleted(id)
    );

    return { data, error };
}

export function submitSubcourse(id, formData) {
    return axiosClient
        .post(`/api/subCourses/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            return response;
        });
}

export function getProductCollateral(id) {
    return axiosClient
        .get(`/api/products/${id}/payment`, {})
        .then((response) => {
            return response?.data;
        });
}

export function saveEmail(data) {
    return axiosClient.post('/api/me/email', { ...data }).then((response) => {
        return response;
    });
}

export function verifyEmail(data) {
    return axiosClient
        .post('/api/me/email/verify', { ...data })
        .then((response) => {
            return response;
        });
}
export function getVerifyCode() {
    return axiosClient.get('/api/refreshVerifyToken').then((response) => {
        return response;
    });
}
export function updateWalletAddress(data) {
    return axiosClient
        .put(`/api/users/walletAddress`, { ...data })
        .then((response) => {
            return response;
        });
}

export function createCertificate(id, data) {
    return axiosClient
        .post(`/api/courses/${id}/certificate`, { ...data })
        .then((response) => {
            return response;
        });
}

export function getCourseGraduated(id) {
    return axiosClient
        .get(`/api/courses/graduatedCourses/${id}`)
        .then((response) => {
            return response.data;
        });
}

export function useCourseGraduated(id) {
    const { data, error } = useSWR(
        `/api/courses/graduatedCourses/${id}`,
        async () => getCourseGraduated(id)
    );

    return { data, error };
}

export function getRegisterAirdrop() {
    return axiosClient.get(`/api/users/registerAirdrop`).then((response) => {
        return response;
    });
}

export function getTransactionHistory() {
    return axiosClient.get(`/api/users/transactioHash`).then((response) => {
        return response;
    });
}

export function createProposal(data) {
    return axiosClient.post('/api/proposals', { ...data }).then((response) => {
        return response;
    });
}
export function createCourse(data) {
    return axiosClient
        .post('/api/admin/courses', { ...data })
        .then((response) => {
            return response;
        });
}

export function createJob(data) {
    return axiosClient.post('/api/jobAds', { ...data }).then((response) => {
        return response;
    });
}

export function getAllJobAds() {
    return axiosClient.get(`/api/jobAds`).then((response) => {
        return response.data;
    });
}

export function useAllJobAds() {
    const { data, error } = useSWR(`/api/jobAds`, async () => getAllJobAds());

    return { data, error };
}

export function getJobByOne(id) {
    return axiosClient.get(`/api/jobAds/${id}`).then((response) => {
        return response.data;
    });
}

export function useJobByOne(id) {
    const { data, error } = useSWR(`/api/jobAds/${id}`, async () =>
        getJobByOne(id)
    );

    return { data, error };
}

//new requests
export function getAllTeaching() {
    return axiosClient.get(`/api/teaching`).then((response) => {
        return response.data;
    });
}

export function useAllTeaching() {
    const { data, error } = useSWR(`/api/teaching`, async () =>
        getAllTeaching()
    );

    return { data, error };
}

export function getOneTeaching(id) {
    return axiosClient.get(`/api/teaching/${id}`).then((response) => {
        return response.data;
    });
}

export function useOneTeaching(id) {
    const { data, error } = useSWR(`/api/teaching/${id}`, async () =>
        getOneTeaching(id)
    );

    return { data, error };
}

export function getTeacherTeaching(id) {
    return axiosClient.get(`/api/users/${id}/teaching`).then((response) => {
        return response.data;
    });
}

export function useTeacherTeaching(id) {
    const { data, error } = useSWR(`/api/users/${id}/teaching`, async () =>
        getTeacherTeaching(id)
    );

    return { data, error };
}

export function createTeachingRequest(data) {
    return axiosClient.post(`/api/teaching`, { ...data }).then((response) => {
        return response;
    });
}

export function createLearnRequest(id) {
    return axiosClient
        .post(`/api/teaching/${id}/learnRequest`)
        .then((response) => {
            return response;
        });
}
export function approveLearnRequest(id) {
    return axiosClient
        .post(`/api/teaching/learnRequest/${id}`)
        .then((response) => {
            return response;
        });
}

export function getTeachingRequests(id) {
    return axiosClient
        .get(`/api/teaching/${id}/learnRequest`)
        .then((response) => {
            return response.data;
        });
}

export function getMyLearnRequests() {
    return axiosClient.get(`/api/teaching/learnRequest/me`).then((response) => {
        return response.data;
    });
}
export function useMyLearnRequests() {
    const { data, error } = useSWR(`/api/teaching/learnRequest/me`, async () =>
        getMyLearnRequests()
    );

    return { data, error };
}

export function getNotifications() {
    return axiosClient.get(`/api/notification`).then((response) => {
        return response.data;
    });
}
export function useNotifications() {
    const { data, error } = useSWR(`/api/notification`, async () =>
        getNotifications()
    );

    return { data, error };
}

export function getChat() {
    return axiosClient.get(`/api/notification`).then((response) => {
        return response.data;
    });
}
