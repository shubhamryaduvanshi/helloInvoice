export const formatMobileNumber = (number: string) => {
    if (!number) return;
    const cleaned = number.replace(/\D/g, '');
    return cleaned.replace(/^(\d{4})(\d{3})(\d{3})$/, '$1-$2-$3');
}