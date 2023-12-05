import { email, min2, phone, required } from '@/utils/handlestring'

export const checkValueMethod = {
    name: [required, min2],
    email: [required, email],
    phone: [phone]
}
