export default function hasErrors(field, formState) {
    return !!formState.errors[field];
}
