import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { Field, FieldGroup } from "@/components/ui/field";
import DetailSection from "./DetailSection";
import { Separator } from "@/components/ui/separator";
import MenuCategorySection from "./MenuCategorySection";
import ImageSection from "./ImageSection";
import type { MenuItem } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
    name: z.string({
        error: (issue) => {
            if (issue.input === undefined) {
            return "Dish name is required.";
            }
            return "Invalid dish name.";
        },
    }).min(1, "Dish name cannot be empty."),
    price: z.coerce.number<number>({
        error: (issue) => {
            if (issue.input === undefined) {
                return "Price is required.";
            }
            return "Invalid price.";
        }
        }).positive("Price must be a positive number."),
    category: z.array(z.string(), {
        error: (issue) => {
            if (issue.input === undefined) {
                return "A category is required.";
            }
            if (!Array.isArray(issue.input)) {
                return "Categories must be an array.";
            }
            return "Invalid categories.";
        }
    }).nonempty("At least one category is required."),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, {
        error: (issue) => {
            if (issue.input === undefined) {
                return "Image is required.";
            }
            if (!(issue.input instanceof File)) {
                return "Invalid image file.";
            }
            return "Invalid image.";
        }
    }).optional()
}).refine((data) => data.imageUrl || data.imageFile, {
    message: "Either an image URL or an image file must be provided.",
    path: ["imageFile"], // This will attach the error to the imageFile field
});

type menuFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (formData: FormData) => void;
    isLoading: boolean;
    menuItem: MenuItem;
}

const RestaurantMenuForm = ({onSave, isLoading, menuItem} : Props) => {
    const form = useForm<menuFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: menuItem ? menuItem : {
            name: "",
            price: 0.00,
            category: [],
            imageFile: undefined
        }
    });

    useEffect(() => {
        if(!menuItem){
            return
        }

        const deliveryPriceFormated = parseInt(menuItem.price.toString());
        const categoriesFormated = menuItem.category.map(cat => cat.toString());
        const updatedMenuItem = {...menuItem,
            price: deliveryPriceFormated,
            category: categoriesFormated
        }

        form.reset({...updatedMenuItem});
    }, [menuItem, form]);

    const onSubmit = (formDataJSON: menuFormData) => {
        //TODO: Convert formDataJSON to a new FormData object and call the onSave prop with it
        const formData = new FormData();
        formData.append('id', menuItem._id);
        formData.append("name", formDataJSON.name);
        formData.append("price", formDataJSON.price.toString());
        formDataJSON.category.forEach((cat, index) => {
            formData.append(`category[${index}]`, cat);
        });
        if (formDataJSON.imageFile) {
            formData.append("imageFile", formDataJSON.imageFile);
        }
        onSave(formData);
    }

    return (
        <FormProvider {...form}>
            <form id={`menu-form-item-${1}`} 
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-[700px] mx-auto space-y-4 bg-gray-50 rounded-lg p-5 md:p-10">
                <FieldGroup>
                    <DetailSection />
                    <Separator/>
                    <MenuCategorySection />
                    <Separator/>
                    <ImageSection />
                    <div>
                        <Field>
                            {isLoading ? (
                                    <LoadingButton />
                                ) : (
                                    <Button type="submit" className="bg-orange-500">
                                        Submit
                                    </Button>
                            )}
                        </Field>
                    </div>
                </FieldGroup>
            </form>
        </FormProvider>
        
    );
}

export default RestaurantMenuForm;