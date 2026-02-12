import RestaurantMenuForm from "@/forms/manage-menu-form/RestaurantMenuForm"

const ManageRestaurantPage = () => {
    return <RestaurantMenuForm onSave={() => console.log("Form saved!")} isLoading={false} />
}

export default ManageRestaurantPage;